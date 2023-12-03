/* eslint-disable react/prop-types */

import { AiOutlineDelete } from "react-icons/ai";
import useSingleData from "../../hooks/useSingleData";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import toast from "react-hot-toast";

const ReportTable = ({ report, index, handleDeleteReport }) => {
  const [singleSurveyData, refetch] = useSingleData(report?.survey_id);
  let [isOpen, setIsOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const handleDeleteSurvey = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/survey/${id}`).then(() => {
          Swal.fire({
            title: "Deleted!",
            text: "Survey has been deleted.",
            icon: "success",
          }).then(() => {
            refetch();
          });
        });
      }
    });
  };

  const handleSurveyStatus = (e, id, status) => {
    e.preventDefault();
    const inactiveReason = e.target.inactive_reason.value;

    let postData = {};
    if (status === "active") {
      postData = { status: "inactive", inactive_reason: inactiveReason };
    } else {
      postData = { status: "active", inactive_reason: "" };
    }
    axiosSecure.put(`/survey-status/${id}`, postData).then((res) => {
      const dataRefetch = refetch();
      toast.promise(dataRefetch, {
        loading: "Loading...",
        success: <b>Status updated!</b>,
        error: <b>Could not update.</b>,
      });
      // console.log(res.data);
    });
  };
  return (
    <>
      <tr>
        <th>{index}</th>
        <td>{report?.reason}</td>
        <td>{report?.survey_title}</td>
        <td>{report?.survey_posted_user?.email}</td>
        <td>{singleSurveyData?.category}</td>
        <td>{singleSurveyData?.create_date}</td>
        <td>
          <span
            onClick={() => setIsOpen(!isOpen)}
            className={`${
              singleSurveyData?.status !== "active" && "hidden"
            } btn btn-xs`}
          >
            {singleSurveyData?.status === "active" && "Published"}
          </span>
          <span
            onClick={() => setIsOpen(!isOpen)}
            className={`${
              singleSurveyData?.status !== "inactive" && "hidden"
            } btn btn-xs`}
          >
            {singleSurveyData?.status === "inactive" && "unpublish"}
          </span>
        </td>
        <td>
          <button
            onClick={() => handleDeleteSurvey(singleSurveyData?._id)}
            className="btn btn-xs btn-circle btn-error text-white text-xl"
          >
            <AiOutlineDelete />
          </button>
        </td>
        <td>
          <button
            onClick={() => handleDeleteReport(report?._id)}
            className="btn btn-xs btn-circle btn-error text-white text-xl"
          >
            <AiOutlineDelete />
          </button>
        </td>
      </tr>

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
                    {singleSurveyData?.status === "active"
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
                        handleSurveyStatus(
                          e,
                          singleSurveyData?._id,
                          singleSurveyData?.status
                        )
                      }
                    >
                      <input
                        className="search-form-field w-full"
                        type="text"
                        name="inactive_reason"
                        placeholder={
                          singleSurveyData?.status !== "inactive"
                            ? "type your feedback"
                            : "just click on published button"
                        }
                        disabled={singleSurveyData?.status === "inactive"}
                        id=""
                      />
                      <div className="mt-4">
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={() => setIsOpen(!isOpen)}
                        >
                          {singleSurveyData?.status === "active"
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
    </>
  );
};

export default ReportTable;
