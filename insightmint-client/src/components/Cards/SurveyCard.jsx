/* eslint-disable react/prop-types */

import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";

import { FaComment, FaShare, FaThumbsDown, FaThumbsUp } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Aos from "aos";

const SurveyCard = ({ card, surveyTotalVote, badge }) => {
  const { user } = useAuth();
  useEffect(() => {
    Aos.init({
      offset: 200,
      duration: 400,
      easing: "ease-in-sine",
    });
  }, []);
  return (
    <div
      className="card card-compact shadow-xl rounded-box"
      id="survey-card"
      data-aos="fade-up"
    >
      <figure className="relative overflow-hidden h-60 rounded-box">
        <img className="transition-all rounded-box" src={card.cover} alt="" />
        {badge && <span className="absolute top-3 right-3 badge">{badge}</span>}
      </figure>
      <div className="card-body">
        <h2 className="card-title">{card.title}</h2>
        <p>{card.description}</p>
      </div>
      <div className="card-body">
        {user && (
          <div className="flex justify-center gap-5">
            <div className="">
              <span className="">
                {card?.likes} <strong>Likes</strong>
              </span>
            </div>
            <div className="">
              <span className="">
                {card?.dis_likes} <strong>Dislikes</strong>
              </span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div>
            <strong>Total Votes : </strong>
            <span>{surveyTotalVote}</span>
          </div>
          <div>
            <Link to={`/survey/${card._id}`}>
              <button className="primary-button !btn-sm">View Details</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyCard;
