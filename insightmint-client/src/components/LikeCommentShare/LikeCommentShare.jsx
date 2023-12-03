/* eslint-disable react/prop-types */
import { FaComment, FaShare, FaThumbsDown, FaThumbsUp } from "react-icons/fa6";
import useAuth from "../../hooks/useAuth";
import useSingleData from "../../hooks/useSingleData";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const LikeCommentShare = ({ singleData }) => {
  const [singleSurveyData, refetch] = useSingleData(singleData?._id);
  const { likes, dis_likes, comments } = singleData;
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const handleLikes = async () => {
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
    axiosSecure
      .post(`/survey-likes-comments/${singleSurveyData?._id}`, postData)
      .then((res) => {});
    refetch();
  };
  const handleDislikes = async () => {
    const numberDislikes = parseInt(dis_likes);
    const incressOne = numberDislikes + 1;
    const postData = {
      dis_likes: incressOne,
      user_dis_likes: {
        users_name: user?.displayName,
        email: user?.email,
        uid: user?.uid,
      },
    };
    // console.log(postData);
    refetch();
  };

  return (
    <div
      className="flex items-end justify-between lg:[&>div>span]:flex-nowrap
          [&>div]:flex [&>div]:flex-col
          text-center mb-2"
    >
      <div className="">
        <span className="text-xs">{likes} Likes</span>
        <span onClick={handleLikes} className="btn btn-sm">
          <FaThumbsUp />
          Like
        </span>
      </div>
      <div className="!hidden sm:!flex md:!hidden xl:!flex">
        <span className="text-xs">{dis_likes} Dislikes</span>
        <span onClick={handleDislikes} className="btn btn-sm">
          <FaThumbsDown />
          Dislike
        </span>
      </div>

      <div>
        <span className="text-xs">{!comments ? 0 : comments} Comments</span>
        <span className="btn btn-sm">
          <FaComment />
          Comments
        </span>
      </div>
      <div>
        {/* <span>0 </span> */}
        <span className="btn btn-sm">
          <FaShare />
          Share
        </span>
      </div>
    </div>
  );
};

export default LikeCommentShare;
