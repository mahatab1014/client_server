const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const stripe = require("stripe")(process.env.Stripe_Secret_KEY);
const port = process.env.PORT || 8080;

const allowedOrigins = [
  // "http://localhost:5173",
  "https://insightmint.web.app",
  "https://insightmint.firebaseapp.com",
];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mquj3zk.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: false,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const database = client.db("InsightMint");
    const surveyCollection = database.collection("survey_collection");
    await surveyCollection.createIndex({ title: "text" });

    const usersCollection = database.collection("users_collection");
    const commentsCollection = database.collection("comments_collection");
    const reportCollection = database.collection("report_collection");
    const paymentCollection = database.collection("payment_collection");

    // ::::: Middleware
    const logger = (req, res, next) => {
      console.log("log: info", req.method, req.url);
      next();
    };
    const verifyToken = (req, res, next) => {
      const token = req?.cookies?.token;
      if (!token) {
        return res.status(401).send({ message: "unauthorized" });
      }
      jwt.verify(token, process.env.JWT_SECRET_ACCESS_TOKEN, (err, decoded) => {
        if (err) {
          return res.status(401).send({ message: "unauthorized" });
        }
        req.user = decoded;
        next();
      });
    };
    const verifyAdmin = async (req, res, next) => {
      const decoded = req.user; // Access the decoded object set by verifyToken
      const email = decoded.email;

      const query = { email: email };
      console.log("admin email :", email);

      try {
        const user = await usersCollection.findOne(query);
        const isAdmin = user?.role === "admin";
        console.log(isAdmin);
        if (!isAdmin) {
          return res.status(403).send({ message: "forbidden access" });
        }

        next();
      } catch (error) {
        console.error("Error verifying admin:", error);
        res.status(500).send({ error: "Internal Server Error" });
      }
    };

    // :::: Json Web Token :::::
    app.post("/jwt", logger, async (req, res) => {
      const user = req.body;
      console.log("user for token", user);
      const token = jwt.sign(user, process.env.JWT_SECRET_ACCESS_TOKEN, {
        expiresIn: "24h",
      });

      try {
        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production" ? true : false,
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        });
        res.send({ success: true });
      } catch (error) {
        console.error("Error setting token as a cookie:", error);
        res.status(500).send({ error: "Internal Server Error" });
      }
    });
    app.post("/logout", async (req, res) => {
      const user = req.body;
      console.log("logging out", user);
      res
        .clearCookie("token", {
          maxAge: 0,
          secure: process.env.NODE_ENV === "production" ? true : false,
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ success: true });
    });

    // survey collection
    app.post("/surveys", verifyToken, async (req, res) => {
      const data = req.body;
      const result = await surveyCollection.insertOne(data);
      res.status(200).send(result);
    });
    app.put("/survey-update/:id", verifyToken, async (req, res) => {
      const { id } = req.params;
      console.log("Survey ID:", id);
      const data = req.body;
      try {
        const updatedSurvey = await surveyCollection.findOneAndUpdate(
          { _id: new ObjectId(id) },
          { $set: data },
          { returnDocument: "after" }
        );
        if (!updatedSurvey.value) {
          return res.status(404).json({ message: "Survey not found" });
        }
        console.log("Updated survey:", updatedSurvey.value);
        res.status(200).json(updatedSurvey.value);
      } catch (error) {
        console.error("Error updating survey:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
      }
    });
    app.get("/surveys", async (req, res) => {
      const results = await surveyCollection.find().toArray();
      res.status(200).send(results);
    });
    app.get("/survey/:id", async (req, res) => {
      const { id } = req.params;
      const query = { _id: new ObjectId(id) };
      const data = await surveyCollection.findOne(query);
      res.status(200).send(data);
    });
    app.get("/survey-filter", async (req, res) => {
      const page = parseInt(req.query.page) || 0;
      const size = parseInt(req.query.size) || 10;
      const searchQuery = req.query.search || "";
      const category = req.query.category || "";

      try {
        const skip = page * size;
        const limit = size;

        let filterCriteria = {};

        if (category !== "") {
          filterCriteria = {
            $and: [{ $text: { $search: searchQuery } }, { category: category }],
          };
        } else {
          filterCriteria = {
            $text: { $search: searchQuery },
          };
        }

        // Use $text operator for text search along with category filter
        const surveys = await surveyCollection
          .find(filterCriteria, { score: { $meta: "textScore" } })
          .sort({ score: { $meta: "textScore" } })
          .skip(skip)
          .limit(limit)
          .toArray();

        res.status(200).send(surveys);
      } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
    app.get("/total-surveys", async (req, res) => {
      const total = await surveyCollection.estimatedDocumentCount();
      res.status(200).send({ total: total });
    });

    // ::: find survey by email address :::::
    app.get("/find-survey-by-email/:email", verifyToken, async (req, res) => {
      const { email } = req.params;
      const query = { "user.email": email };
      const data = await surveyCollection.find(query).toArray();
      res.status(200).send(data);
    });
    app.post("/survey/:id", verifyToken, async (req, res) => {
      const { id } = req.params;
      const query = { _id: new ObjectId(id) };
      const newData = req.body;

      try {
        // Update the document in the survey_collection
        const result = await surveyCollection.updateOne(query, {
          $push: { participate_user: newData.participate_user },
          $set: { options: newData.options },
        });

        if (result.modifiedCount === 1) {
          res.status(200).json({ message: "Survey updated successfully." });
        } else {
          res.status(404).json({ message: "Survey not found." });
        }
      } catch (error) {
        console.error("Error updating survey:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    });
    app.delete("/survey/:id", verifyToken, async (req, res) => {
      const { id } = req.params;
      const query = { _id: new ObjectId(id) };
      const result = await surveyCollection.deleteOne(query);
      if (result.deletedCount === 1) {
        res.status(200).json({ message: "Survey deleted successfully." });
      } else {
        res.status(404).json({ message: "Survey not found." });
      }
    });
    app.get("/survey-parti-user", async (req, res) => {
      const { email, id } = req.query;
      const query = { _id: new ObjectId(id), "participate_user.user": email };
      // const query = { participate_user: email };
      try {
        const result = await surveyCollection.findOne(query);

        if (result) {
          const userVoteData = result.participate_user.find(
            (user) => user.user === email
          );

          res.status(200).send({ vote_data: userVoteData, participate: true });
        } else {
          res.status(200).json({ participate: false });
        }
      } catch (error) {
        console.error("Error checking participation:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    });
    app.post("/survey-likes-comments/:id", verifyToken, async (req, res) => {
      const { id } = req.params;
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ObjectId format" });
      }

      const query = { _id: new ObjectId(id) };
      const data = req.body;

      try {
        let updateFields = {};

        if (data.user_liked || data.user_likes) {
          updateFields = {
            $push: { user_liked: data.user_liked },
            $set: { likes: data.likes },
          };
        } else {
          updateFields = {
            $push: { user_dis_liked: data.user_dis_liked },
            $set: { dis_likes: data.dis_likes },
          };
        }

        const result = await surveyCollection.updateOne(query, updateFields);

        if (result.modifiedCount === 1) {
          res.status(200).json({ message: "Survey updated successfully." });
        } else {
          res.status(404).json({ message: "Survey not found." });
        }
      } catch (error) {
        console.error("Error updating survey:", error);
        res.status(500).json({ message: "Internal server error" });
      }
      console.log(data);
    });
    app.get("/survey-liked-user", async (req, res) => {
      const { email, id } = req.query;
      const query = {
        _id: new ObjectId(id),
        "user_liked.email": email,
      };
      try {
        const result = await surveyCollection.findOne(query);

        if (result) {
          const user_liked = result?.user_liked?.find(
            (user) => user.email === email
          );

          res.status(200).send({
            user_liked: user_liked,
            liked: true,
          });
        } else {
          res.status(200).json({ liked: false });
        }
      } catch (error) {
        console.error("Error checking participation:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    });
    app.get("/survey-dis-liked-user", async (req, res) => {
      const { email, id } = req.query;
      const query = {
        _id: new ObjectId(id),
        "user_dis_liked.email": email,
      };
      try {
        const result = await surveyCollection.findOne(query);

        if (result) {
          const user_dis_liked = result?.user_dis_liked?.find(
            (user) => user.email === email
          );

          res.status(200).send({
            user_dis_liked: user_dis_liked,
            dis_liked: true,
          });
        } else {
          res.status(200).json({ dis_liked: false });
        }
      } catch (error) {
        console.error("Error checking participation:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    });
    app.post("/survey-comments", verifyToken, async (req, res) => {
      const data = req.body;
      const result = await commentsCollection.insertOne(data);
      res.status(200).send(result);
    });
    app.get("/survey-comments/:id", async (req, res) => {
      const { id } = req.params;

      const query = { survey_id: id };

      const results = await commentsCollection.find(query).toArray();
      res.status(200).send(results);
    });
    app.post(
      "/survey-featured/:id",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const { id } = req.params;
        const query = { _id: new ObjectId(id) };
        const data = req.body;
        try {
          let updateFeatured = {};

          if (data?.featured === "true") {
            updateFeatured = {
              $set: { featured: "true" },
            };
          } else {
            updateFeatured = {
              $set: { featured: "false" },
            };
          }

          const result = await surveyCollection.updateOne(
            query,
            updateFeatured
          );

          if (result.modifiedCount === 1) {
            res.status(200).json({ message: "Survey updated successfully." });
          } else {
            res.status(404).json({ message: "Survey not found." });
          }
        } catch (error) {
          console.error("Error updating survey:", error);
          res.status(500).json({ message: "Internal server error" });
        }
      }
    );
    app.put("/survey-status/:id", verifyToken, async (req, res) => {
      const { id } = req.params;
      const query = { _id: new ObjectId(id) };
      const data = req.body;
      try {
        let updateFeatured = { $set: data };

        const result = await surveyCollection.updateOne(query, updateFeatured);

        if (result.modifiedCount === 1) {
          res.status(200).json({ message: "Survey updated successfully." });
        } else {
          res.status(404).json({ message: "Survey not found." });
        }
      } catch (error) {
        console.error("Error updating survey:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    });

    // :::::::: Survey Report API ::::::::::
    app.post("/report-survey", verifyToken, async (req, res) => {
      const data = req.body;
      const result = await reportCollection.insertOne(data);
      res.send(result);
    });
    app.get("/report-survey", verifyToken, verifyAdmin, async (req, res) => {
      const result = await reportCollection.find().toArray();
      res.send(result);
    });
    app.get("/single-report-survey", verifyToken, async (req, res) => {
      const { email, id } = req.query;
      const query = {
        survey_id: id,
        "user_reported.email": email,
      };
      const result = await reportCollection.findOne(query);
      res.send(result);
    });
    app.delete(
      "/survey-report/:id",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const { id } = req.params;
        const query = { _id: new ObjectId(id) };
        const result = await reportCollection.deleteOne(query);
        if (result.deletedCount === 1) {
          res.status(200).json({ message: "Survey deleted successfully." });
        } else {
          res.status(404).json({ message: "Survey not found." });
        }
      }
    );

    // ::::::: USER API :::::::::
    app.put("/users/:email", verifyToken, async (req, res) => {
      const { email } = req.params;
      const data = req.body;

      const existingUser = await usersCollection.findOne({ email });
      try {
        if (existingUser) {
          // If user exists, update the IP address
          await usersCollection.updateOne(
            { email },
            { $set: { last_login_ip: data.last_login_ip } }
          );
          res.json({ message: "User updated successfully" });
        } else {
          // If user does not exist, insert the new user data
          await usersCollection.insertOne({
            name: data.name,
            email: data.email,
            email_verified: data.email_verified,
            role: data.role,
            profile_pic: data.profile_pic,
            last_login_ip: data.last_login_ip,
          });
          res.json({ message: "User inserted successfully" });
        }
      } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    });
    app.put("/user-role/:id", verifyToken, async (req, res) => {
      const { id } = req.params;
      const data = req.body;
      const query = { _id: new ObjectId(id) };

      try {
        const user = await usersCollection.findOneAndUpdate(query, {
          $set: { role: data.role },
        });
        res.json({ message: "User role updated successfully" });
      } catch (error) {
        console.error("Error updating user role:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    });
    app.get("/users/:role?", verifyToken, verifyAdmin, async (req, res) => {
      const { role } = req.params;
      const query = role ? { role: role } : {};

      try {
        const result = await usersCollection.find(query).toArray();
        res.send(result);
      } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
      }
    });
    app.get("/user/:email", verifyToken, async (req, res) => {
      const { email } = req.params;
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      res.send(user);
    });

    // :::::: Payment Method ::::::
    app.post("/create-payment-intent", verifyToken, async (req, res) => {
      const { price } = req.body;
      const amount = parseFloat(price * 100);
      try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: amount,
          currency: "usd",
          payment_method_types: ["card"],
        });
        res.send({
          clientSecret: paymentIntent.client_secret,
        });
      } catch (error) {
        console.error("Error creating payment intent:", error);
        res.status(500).send({ error: "Internal Server Error" });
      }
    });
    app.post("/payment-transactions", verifyToken, async (req, res) => {
      const data = req.body;
      const result = await paymentCollection.insertOne(data);
      res.status(200).send(result);
    });
    app.get(
      "/payment-transactions",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const result = await paymentCollection.find().toArray();
        res.status(200).send(result);
      }
    );
    app.get(
      "/payment-transactions-user/:email",
      verifyToken,
      async (req, res) => {
        const { email } = req.params;
        const query = { email: email };
        const result = await paymentCollection.find(query).toArray();
        res.status(200).send(result);
      }
    );

    // :::::::: Total Collection ::::::
    app.get(
      "/total-collection-count",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const pipeline = [
          {
            $group: {
              _id: null,
              total: { $sum: "$price" },
            },
          },
        ];
        const totalUser = await usersCollection.estimatedDocumentCount();
        const totalSurvey = await surveyCollection.estimatedDocumentCount();
        const totalComment = await commentsCollection.estimatedDocumentCount();
        const totalRevenue = await paymentCollection
          .aggregate(pipeline)
          .toArray();

        res.status(200).send({
          total_user: totalUser,
          total_survey: totalSurvey,
          total_comment: totalComment,
          total_revenue: totalRevenue,
        });
      }
    );

    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
