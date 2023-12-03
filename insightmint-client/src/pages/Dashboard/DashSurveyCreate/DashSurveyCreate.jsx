import { useState } from "react";
import PageTitle from "../../../components/PageTitle/PageTitle";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { UploadImageImgBB } from "../../../utility/utility";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const DashSurveyCreate = () => {
  const axiosSecure = useAxiosSecure();
  const [errorMessage, setErrorMessage] = useState("");
  const [postingLoader, setPostingLoader] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const categoryList = [
    "Technology",
    "Health and Wellness",
    "Entertainment",
    "Travel",
    "Workplace",
    "Sports",
    "Food and Dining",
    "Social Media",
    "Education",
    "Fashion",
    "Finance",
    "Environment",
    "Politics",
    "Hobbies",
    "Relationships",
    "Pets",
    "Art and Culture",
    "Science",
    "Automotive",
    "Fitness",
    "Music",
    "Movies",
    "Books",
    "Gaming",
    "Home and Garden",
  ];

  const handlePostSurvey = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const form = e.target;
    const title = form.title.value;
    const category = form.category.value;
    const cover = form.cover.files[0];
    const coverURL = form.cover_url.value;
    const description = form.description.value;
    const currentDate = new Date().toISOString().split("T")[0];
    const date = form.expire_date.value;

    if (date > currentDate) {
      setPostingLoader(true);
      // const img = await UploadImageImgBB(cover);
      const postData = {
        title: title,
        // cover: img?.data?.url,
        cover: coverURL,
        description: description,
        options: [
          {
            name: "yes",
            vote_count: "0",
          },
          {
            name: "no",
            vote_count: "0",
          },
        ],
        likes: 0,
        dis_likes: 0,
        user: {
          name: user?.displayName,
          email: user?.email,
          uid: user?.uid,
        },
        category: category,
        featured: "false",
        timestamp: date,
        create_date: currentDate,
        status: "active",
        user_dis_liked: [],
        user_liked: [],
      };

      axiosSecure.post("/surveys", postData).then((response) => {
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Survey Posted
                  </p>
                  <p className="mt-1 text-sm text-gray-500">{title}</p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-gray-200">
              <button
                onClick={() => {
                  toast.dismiss(t.id),
                    navigate(`/survey/${response?.data?.insertedId}`);
                }}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Open Survey
              </button>
            </div>
          </div>
        ));
        form.reset();
        setPostingLoader(false);
      });
    } else {
      return setErrorMessage("Please select a valid date");
    }

    // console.log(date, currentDate);
  };

  return (
    <section>
      <PageTitle title="Survey Create" />

      <div className="title py-10">
        <h2 className="text-3xl text-center">Create Survey</h2>
        <div className="border-b-2 pt-3 w-2/4 m-auto"></div>
      </div>

      <form className="px-10" onSubmit={handlePostSurvey}>
        {errorMessage && (
          <div>
            <p className="rounded mb-3 bg-error text-center py-2 fontme">
              {errorMessage}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 [&>div>*]:h-fit [&>div>*]:w-full">
          <div>
            <label htmlFor="title">Survey Title :</label>
            <input
              className="search-form-field mt-1"
              type="text"
              name="title"
              id="title"
              placeholder="Survey Title"
              required
            />
          </div>
          <div>
            <label htmlFor="cover">Survey Cover Image :</label>
            <input
              className="search-form-field mt-1"
              type="url"
              name="cover_url"
              id="cover_url"
              placeholder="https://"
            />
            <input
              className="search-form-field mt-1"
              type="file"
              name="cover"
              id="cover"
              accept="image/*"
              disabled
              title="ImgBB not working"
              // required
            />
          </div>
          <div>
            <label htmlFor="category">Category :</label>
            <select
              className="search-form-field mt-1"
              name="category"
              id="category"
              required
            >
              <option selected disabled value="">
                Category
              </option>
              {categoryList?.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="description">Description :</label>
            <textarea
              name="description"
              id="description"
              className="search-form-field mt-1"
              required
            ></textarea>
          </div>
          <div className="">
            <label htmlFor="expire_date">Expire Date :</label>
            <input
              type="date"
              name="expire_date"
              id="expire_date"
              className="search-form-field mt-1"
              required
            />
          </div>
        </div>

        <div>
          <button type="submit" className="primary-button my-5">
            <span>Post Survey</span>
            {postingLoader && <span className="loading loading-dots"></span>}
          </button>
        </div>
      </form>
    </section>
  );
};

export default DashSurveyCreate;
