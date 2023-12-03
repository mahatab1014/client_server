/* eslint-disable react/prop-types */

const CommentCard = ({ data }) => {
  const { comments, user } = data;

  return (
    <div className="card shadow-md p-5" id="comments-data">
      <div className="flex items-center gap-2 mb-3">
        <div className="avatar cursor-pointer">
          <div className="w-12 rounded-full">
            <img src={user?.user_avatar} />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="font-medium cursor-pointer">{user?.name}</span>
          <span className="text-sm cursor-pointer">{user?.user_email}</span>
        </div>
      </div>
      <div className="border-t-2 pt-3">
        <p>{comments}</p>
      </div>
    </div>
  );
};

export default CommentCard;
