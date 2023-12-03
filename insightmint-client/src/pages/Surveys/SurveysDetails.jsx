/* eslint-disable react/prop-types */
import { useEffect, useState, PureComponent } from "react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Container from "../../components/Container/Container";
import PrimaryHeading from "../../components/Heading/PrimaryHeading";
import { RadioGroup } from "@headlessui/react";
import { FaCheck, FaComment, FaThumbsDown, FaThumbsUp } from "react-icons/fa6";
import { MdReport } from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import PageTitle from "../../components/PageTitle/PageTitle";
import useSingleData from "../../hooks/useSingleData";
import { toast } from "react-hot-toast";
import useComments from "../../hooks/useComments";
import CommentCard from "../../components/Cards/CommentCard";
import useSingleUserData from "../../hooks/useSingleUserData";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css"; // Import the default styles

import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

const SurveysDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [singleSurveyData, refetch, isLoading] = useSingleData(id);
  const [commentsData, commentsRefetch] = useComments(id);
  const [singleUserData, singleUserDataRefetch] = useSingleUserData(
    user?.email
  );

  const { likes, dis_likes, options } = singleSurveyData;

  const [participate, setParticipate] = useState({});
  const [userSurveyLiked, setUserSurveyLiked] = useState({});
  const [userSurveyDisLiked, setUserSurveyDisLiked] = useState({});
  const [selected, setSelected] = useState();
  const [surveyReported, setSurveyReported] = useState();
  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation();
  const handlePostSurvey = () => {
    if (user) {
      const updatedOptions = singleSurveyData.options.map((option) => {
        if (option.name === "yes" && selected === "yes") {
          return { ...option, vote_count: parseInt(option.vote_count) + 1 };
        } else if (option.name === "no" && selected === "no") {
          return { ...option, vote_count: parseInt(option.vote_count) + 1 };
        } else {
          return option;
        }
      });
      const updatedUser = user?.email;

      const postData = {
        options: updatedOptions,
        participate_user: { user: updatedUser, vote: selected },
      };

      axiosSecure.post(`/survey/${id}`, postData).then((response) => {
        // console.log(response.data);
        if (response.data.message === "Survey updated successfully.") {
          const callFunction = refetch();
          toast.promise(callFunction, {
            loading: "Vote posting...",
            success: <b>Vote posted!</b>,
            error: <b>Something went wrong.</b>,
          });
        }
      });
    } else {
      document.getElementById("user_not_found").showModal();
    }
  };

  const handleLikes = async () => {
    if (user) {
      const numberLike = parseInt(likes);

      const incressOne = numberLike + 1;
      const postData = {
        likes: incressOne,
        user_liked: {
          users_name: user?.displayName,
          email: user?.email,
          uid: user?.uid,
        },
      };
      if (!userSurveyLiked.liked) {
        axiosSecure
          .post(`/survey-likes-comments/${singleSurveyData?._id}`, postData)
          .then((res) => {
            // console.log(res.data);
            if (res.data.message === "Survey updated successfully.") {
              const callFunction = refetch();
              toast.promise(callFunction, {
                loading: "Loading...",
                success: <b>❤️ Liked!</b>,
                error: <b>Something went wrong.</b>,
              });
            }
          });
      } else {
        toast.success("You already liked it");
      }
    } else {
      document.getElementById("user_not_found").showModal();
    }
  };
  const handleDislikes = async () => {
    if (user) {
      const numberDislikes = parseInt(dis_likes);
      const incressOne = numberDislikes + 1;
      const postData = {
        dis_likes: incressOne,
        user_dis_liked: {
          users_name: user?.displayName,
          email: user?.email,
          uid: user?.uid,
        },
      };

      if (!userSurveyDisLiked.dis_liked) {
        axiosSecure
          .post(`/survey-likes-comments/${singleSurveyData?._id}`, postData)
          .then((res) => {
            // console.log(res.data);
            if (res.data.message === "Survey updated successfully.") {
              const callFunction = refetch();
              toast.promise(callFunction, {
                loading: "Loading...",
                success: <b>👎 Disliked!</b>,
                error: <b>Something went wrong.</b>,
              });
            }
          });
      } else {
        toast.success("You already disliked it");
      }
    } else {
      document.getElementById("user_not_found").showModal();
    }
  };
  const handlePostComments = async (e) => {
    if (user) {
      e.preventDefault();
      const form = e.target;
      const comments = form.comment.value;
      const postData = {
        survey_id: id,
        comments: comments,
        user: {
          name: user?.displayName,
          user_avatar: user?.photoURL,
          user_email: user?.email,
          user_uid: user?.uid,
        },
      };

      axiosSecure.post("/survey-comments", postData).then((res) => {
        if (res.data.insertedId.length > 0) {
          const callFunction = commentsRefetch();

          toast.promise(callFunction, {
            loading: "Comment posting...",
            success: <b>Comment posted!</b>,
            error: <b>Could not posted.</b>,
          });
          form.reset();
        }
      });
    } else {
      document.getElementById("user_not_found").showModal();
    }
  };
  const handleReport = async (e) => {
    e.preventDefault();
    const form = e.target;
    const reason = e.target._reason.value;
    const postData = {
      reason: reason,
      user_reported: {
        email: user?.email,
        uid: user?.uid,
      },
      survey_id: singleSurveyData._id,
      survey_title: singleSurveyData.title,
      survey_posted_user: singleSurveyData.user,
    };
    axiosSecure.post("/report-survey", postData).then((res) => {
      toast.success("Reported");
      form.reset();
    });
  };
  useEffect(() => {
    if (user && singleSurveyData && id) {
      axiosSecure
        .get(`/survey-parti-user?email=${user?.email}&id=${id}`)
        .then((response) => {
          setParticipate(response.data);
        });
      axiosSecure
        .get(`/survey-liked-user?email=${user?.email}&id=${id}`)
        .then((response) => {
          setUserSurveyLiked(response.data);
        });
      axiosSecure
        .get(`/survey-dis-liked-user?email=${user?.email}&id=${id}`)
        .then((response) => {
          setUserSurveyDisLiked(response.data);
        });
      axiosSecure
        .get(`/single-report-survey?email=${user?.email}&id=${id}`)
        .then((response) => {
          setSurveyReported(response.data);
        });
    }
  }, [axiosSecure, id, user, singleSurveyData]);

  let userLikedData = [];
  let userVoteData = [];

  if (!isLoading) {
    userLikedData = [
      { name: "Liked User", value: likes },
      { name: "DisLiked User", value: dis_likes },
    ];
    userVoteData = [
      { name: "Vote : YES", value: options[0]?.vote_count },
      { name: "Vote : NO", value: options[1]?.vote_count },
    ];
  }

  const COLORS = ["#0088FE", "#FF8042"];

  const renderLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{`VOTE ${value}`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  return (
    <section className="bg-base-200 py-5">
      <PageTitle title={singleSurveyData?.title} />
      <Container>
        <Tabs>
          <TabList className="text-center pb-5 space-x-3">
            <Tab className="btn bg-white">Details</Tab>
            <Tab className="btn bg-white">Analytics</Tab>
          </TabList>

          <TabPanel>
            <section className="sm:py-5 md:py-10 px-5 md:px-10 bg-white rounded-box">
              <div className="card">
                <figure className="pt-5 sm:pt-0 sm:h-48 md:h-80">
                  <img
                    src={singleSurveyData?.cover}
                    className="rounded"
                    alt={singleSurveyData?.title}
                  />
                </figure>
                <div className="card-body p-0 my-10">
                  <PrimaryHeading heading_h1={singleSurveyData?.title} />
                  <p>{singleSurveyData?.description}</p>

                  <RadioGroup value={selected} onChange={setSelected}>
                    <RadioGroup.Label className="sr-only">
                      Server size
                    </RadioGroup.Label>
                    <div className="space-y-2">
                      {singleSurveyData?.options?.map((survey) => (
                        <RadioGroup.Option
                          key={survey?.name}
                          value={survey?.name}
                          className={({ active, checked }) =>
                            `${
                              active
                                ? "ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300"
                                : ""
                            }
                    ${checked ? "bg-sky-900/75 text-white" : "bg-white"}
                      relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                          }
                        >
                          {({ checked }) => (
                            <>
                              <div className="flex w-full items-center justify-between">
                                <div className="flex items-center">
                                  <div className="text-sm">
                                    <RadioGroup.Label
                                      as="p"
                                      className={`font-medium capitalize  ${
                                        checked ? "text-white" : "text-gray-900"
                                      }`}
                                    >
                                      {survey.name}
                                    </RadioGroup.Label>
                                    <RadioGroup.Description
                                      as="span"
                                      className={`inline ${
                                        checked
                                          ? "text-sky-100"
                                          : "text-gray-500"
                                      }`}
                                    >
                                      <span aria-hidden="true">
                                        Total Vote : {survey?.vote_count}
                                      </span>{" "}
                                    </RadioGroup.Description>
                                  </div>
                                </div>
                                {checked && (
                                  <div className="shrink-0 text-white">
                                    <FaCheck className="text-xl" />
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}

                      <div className="text-center pt-5">
                        {participate.participate === true && (
                          <>
                            <p className="">
                              You Already Participate in this survey
                            </p>
                            <p className="mb-3">
                              Your given vote : {participate?.vote_data?.vote}
                            </p>
                          </>
                        )}
                        <button
                          disabled={participate?.participate}
                          onClick={handlePostSurvey}
                          className="primary-button btn-wide"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div className="card-body p-0">
                  <div className="max-w-lg m-auto">
                    <div
                      className="flex flex-wrap items-end justify-between lg:[&>div>span]:flex-nowrap
            [&>div]:flex [&>div]:flex-col
            text-center mb-2 gap-3"
                    >
                      <div className="">
                        <span className="text-xs">{likes} Likes</span>
                        <button
                          disabled={userSurveyDisLiked?.dis_liked}
                          onClick={handleLikes}
                          className={`btn btn-sm  ${
                            userSurveyLiked?.liked && "btn-info"
                          }`}
                        >
                          <FaThumbsUp />
                          Like
                        </button>
                      </div>
                      <div className="">
                        <span className="text-xs">{dis_likes} Dislikes</span>
                        <button
                          disabled={userSurveyLiked?.liked}
                          onClick={handleDislikes}
                          className={`btn btn-sm  ${
                            userSurveyDisLiked?.dis_liked && "btn-info"
                          }`}
                        >
                          <FaThumbsDown />
                          Dislike
                        </button>
                      </div>

                      <div>
                        <span className="text-xs">
                          {commentsData.length} Comments
                        </span>
                        <Link to="#comments" className="btn btn-sm">
                          <FaComment />
                          Comments
                        </Link>
                      </div>
                      <div>
                        <span
                          onClick={() =>
                            document.getElementById("report_modal").showModal()
                          }
                          className="btn btn-sm"
                        >
                          <MdReport />
                          Report
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-body p-0 py-10" id="comments">
                  <div className="w-[100%] lg:w-[50%] m-auto">
                    <form onSubmit={handlePostComments}>
                      <div className="form-control ">
                        <label htmlFor="comment">Let's comment here :</label>
                        <textarea
                          className="shadow-lg p-4 outline-none mb-2"
                          name="comment"
                          id="comment"
                          required
                          placeholder={
                            singleUserData.role !== "pro_user" &&
                            "Only Pro user can comments here"
                          }
                          disabled={singleUserData.role !== "pro_user"}
                        ></textarea>
                        <button
                          className="primary-button"
                          disabled={singleUserData.role !== "pro_user"}
                        >
                          Comments
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="w-[100%] lg:w-[50%] mx-auto mt-20 space-y-3">
                    {commentsData?.map((data) => (
                      <CommentCard key={data._id} data={data} />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </TabPanel>
          <TabPanel>
            <section className="sm:py-5 md:py-10 px-5 md:px-10 bg-white rounded-box">
              <div className="card remove_cart_outline">
                <div className="card-body p-0 my-10">
                  <div>
                    <h2 className="text-2xl text-center py-5">
                      Sentiment Survey Overview
                    </h2>
                    <p className="text-center text-lg text-gray-500">
                      Enter the realm of perspectives with our 'User Judgment'
                      diagram, where each vote embodies a sway between
                      'Affirmative' and 'Negative.' This visual representation
                      encapsulates the core of user inclinations, simplifying
                      intricate emotions into a binary cadence. Delve into the
                      fluctuation of accord and discord, as users submit their
                      votes and mold the communal judgment. Engage in the
                      straightforwardness and impact of binary selections in
                      this lively overview of user feelings.
                    </p>
                    <div>
                      <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                          <Pie
                            activeIndex={activeIndex}
                            activeShape={renderActiveShape}
                            data={userVoteData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            onMouseEnter={onPieEnter}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
                <div className="card-body p-0 my-10">
                  <div>
                    <h2 className="text-2xl text-center py-5">
                      Perspective Expedition: Mapping Survey Waters
                    </h2>
                    <p className="text-center text-lg text-gray-500">
                      Embark on an adventure through the undulating tides of
                      viewpoints with our survey diagram. 'Perspective
                      Expedition' reveals a compelling journey through favored
                      and unfavored responses, leading you through the varied
                      streams of outlooks. Plot your path through this visual
                      storytelling and uncover the fascinating terrain of
                      preferences within our community.
                    </p>
                    <div>
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                          <Pie
                            data={userLikedData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {userLikedData.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                              />
                            ))}
                          </Pie>
                        </PieChart>
                        <div className="flex flex-col items-center">
                          <div className="flex items-center gap-3">
                            <span>User Liked</span>
                            <span className="inline-block w-20 h-2 bg-[#0088FE] rounded-full"></span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span>User disliked</span>
                            <span className="inline-block w-20 h-2 bg-[#FF8042] rounded-full"></span>
                          </div>
                        </div>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </TabPanel>
        </Tabs>
      </Container>

      <>
        <dialog
          id="report_modal"
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            {surveyReported?.survey_id === singleSurveyData?._id ? (
              <>
                <h3 className="font-bold text-lg">
                  You already reported this survey
                </h3>
                <p>Wait for admin approval</p>
              </>
            ) : (
              <>
                {user ? (
                  <>
                    <h3 className="font-bold text-lg">
                      Write in details why you report in this survey.
                    </h3>
                    <form className="mt-2" onSubmit={handleReport}>
                      <input
                        className="search-form-field w-full"
                        type="text"
                        name="_reason"
                        id=""
                        required
                      />
                      <div className="mt-4">
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        >
                          Report Now
                        </button>
                      </div>
                    </form>
                  </>
                ) : (
                  <>
                    <h3 className="font-bold text-lg">
                      Only valid or Logged in user can report survey
                    </h3>
                    <div className="mt-4">
                      <Link to="/auth" state={{ from: location }}>
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        >
                          Login now
                        </button>
                      </Link>
                    </div>
                  </>
                )}
              </>
            )}

            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>

        <dialog
          id="user_not_found"
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <h3 className="font-bold text-lg">Hello there!</h3>
            <p className="py-4">
              To perform this operation, you need to be logged in. Please{" "}
              <Link
                to="/auth"
                state={{ from: location }}
                className="text-blue-500 underline"
              >
                log in
              </Link>{" "}
              or{" "}
              <Link
                to="/auth"
                state={{ from: location }}
                className="text-blue-500 underline"
              >
                create an account
              </Link>{" "}
              to continue.
            </p>

            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </>
    </section>
  );
};

export default SurveysDetails;
