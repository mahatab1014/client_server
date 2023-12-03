/* eslint-disable react/prop-types */

import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { IoAnalyticsSharp } from "react-icons/io5";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

const SurveyTable = ({
  index,
  survey,
  handleDeleteSurvey,
  handleAddFeatured,
  handleRemoveFeatured,
  handleSurveyStatus,
  isAdmin,
}) => {
  const currentDate = new Date().toISOString().split("T")[0];
  let [isOpen, setIsOpen] = useState(false);

  // console.log(isAdmin, "not admin");

  return (
    <tr>
      <th>{index}</th>
      {isAdmin === "admin" && (
        <td>
          {survey?.featured !== "true" ? (
            <button
              onClick={() => handleAddFeatured(survey?._id)}
              className="btn btn-xs btn-circle btn-ghost text-orange-color text-xl"
            >
              <FaRegStar />
            </button>
          ) : (
            <button
              onClick={() => handleRemoveFeatured(survey?._id)}
              className="btn btn-xs btn-circle btn-ghost text-orange-color text-xl"
            >
              <FaStar />
            </button>
          )}
        </td>
      )}

      <td>
        <Link className="hover:underline" to={`/survey/${survey?._id}`}>
          {survey?.title}
        </Link>
      </td>
      <td>
        Yes: <strong>{survey?.options[0]?.vote_count}</strong> No:{" "}
        <strong>{survey?.options[1]?.vote_count}</strong>
      </td>
      <td>{survey?.category}</td>
      <td>{survey?.user?.email}</td>
      <td>{survey?.timestamp < currentDate ? "Expired" : survey?.timestamp}</td>
      <td>
        {isAdmin === "admin" ? (
          <>
            <span
              onClick={() => setIsOpen(!isOpen)}
              className={`${
                survey?.status !== "active" && "hidden"
              } btn btn-xs`}
            >
              {survey?.status === "active" && "Published"}
            </span>
            <span
              onClick={() => setIsOpen(!isOpen)}
              className={`${
                survey?.status !== "inactive" && "hidden"
              } btn btn-xs`}
            >
              {survey?.status === "inactive" && "unpublish"}
            </span>
          </>
        ) : (
          <>{survey?.status}</>
        )}
      </td>
      <td>
        <Link to={`/dashboard/survey-analytics/${survey?._id}`}>
          <button className="btn btn-xs btn-circle btn-info text-white text-xl">
            <IoAnalyticsSharp />
          </button>
        </Link>
      </td>
      <td>
        <Link to={`/dashboard/survey-update/${survey?._id}`}>
          <button className="btn btn-xs btn-circle btn-ghost text-xl">
            <AiOutlineEdit />
          </button>
        </Link>
      </td>

      <td>
        <button
          onClick={() => handleDeleteSurvey(survey?._id)}
          className="btn btn-xs btn-circle btn-error text-white text-xl"
        >
          <AiOutlineDelete />
        </button>
      </td>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(!isOpen)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {survey?.status === "active"
                      ? "Unpublish Survey"
                      : "Publish Survey"}
                  </Dialog.Title>
                  <div className="">
                    <p className="text-sm text-gray-500">
                      Write a short feedback to the survey posted user.
                    </p>
                    <form
                      className="mt-2"
                      onSubmit={(e) =>
                        handleSurveyStatus(e, survey?._id, survey?.status)
                      }
                    >
                      <input
                        className="search-form-field w-full"
                        type="text"
                        name="inactive_reason"
                        placeholder={
                          survey?.status !== "inactive"
                            ? "type your feedback"
                            : "just click on published button"
                        }
                        disabled={survey?.status === "inactive"}
                        id=""
                      />
                      <div className="mt-4">
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={() => setIsOpen(!isOpen)}
                        >
                          {survey?.status === "active"
                            ? "Give A Feedback"
                            : "Publish Survey"}
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </tr>
  );
};

export default SurveyTable;
