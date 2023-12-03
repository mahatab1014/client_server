import Swal from "sweetalert2";
import PageTitle from "../../../components/PageTitle/PageTitle";
import SurveyTable from "../../../components/SurveyTable/SurveyTable";
import useSurveysData from "../../../hooks/useSurveysData";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useSurveyDataByUser from "../../../hooks/useSurveyDataByUser";
import useAdmin from "../../../hooks/useAdmin";

const DashSurveyList = () => {
  const [surveysData, refetch] = useSurveysData();
  const [isAdmin] = useAdmin();
  const [userSurveyData, userSurveyDataLoading] = useSurveyDataByUser();
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
  const handleAddFeatured = (id) => {
    const postData = {
      featured: "true",
    };
    axiosSecure.post(`/survey-featured/${id}`, postData).then(() => {
      const dataRefetch = refetch();
      toast.promise(dataRefetch, {
        loading: "Adding...",
        success: <b>Featured added!</b>,
        error: <b>Could not added.</b>,
      });
    });
  };
  const handleRemoveFeatured = (id) => {
    const postData = {
      featured: "false",
    };
    axiosSecure.post(`/survey-featured/${id}`, postData).then(() => {
      const dataRefetch = refetch();
      toast.promise(dataRefetch, {
        loading: "Removing...",
        success: <b>Featured removed!</b>,
        error: <b>Could not remove.</b>,
      });
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
    <section>
      <PageTitle title="Survey List" />
      <div className="title py-8">
        <h2 className="text-3xl text-center">Survey List</h2>
        <div className="border-b-2 pt-3 w-2/4 m-auto"></div>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-xs table-zebra">
          <thead className="bg-slate-500 text-white">
            <tr>
              <th></th>
              {isAdmin === "admin" && <th>Featured</th>}
              <th>Name</th>
              <th className="tooltip tooltip-bottom" data-tip="Yes : No">
                Vote Data
              </th>
              <th>Category</th>
              <th>User</th>
              <th>Expire date</th>
              <th
                className="tooltip tooltip-bottom"
                data-tip="Click to change status"
              >
                Status
              </th>
              <th>Analytics</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {isAdmin === "admin" && (
              <>
                {surveysData?.map((survey, index) => (
                  <SurveyTable
                    key={survey?._id}
                    survey={survey}
                    index={index}
                    handleDeleteSurvey={handleDeleteSurvey}
                    handleAddFeatured={handleAddFeatured}
                    handleRemoveFeatured={handleRemoveFeatured}
                    handleSurveyStatus={handleSurveyStatus}
                    isAdmin={isAdmin}
                  />
                ))}
              </>
            )}
            {isAdmin !== "admin" && (
              <>
                {userSurveyData?.map((survey, index) => (
                  <SurveyTable
                    key={survey?._id}
                    survey={survey}
                    index={index}
                    handleDeleteSurvey={handleDeleteSurvey}
                    handleAddFeatured={handleAddFeatured}
                    handleRemoveFeatured={handleRemoveFeatured}
                    handleSurveyStatus={handleSurveyStatus}
                    isAdmin={isAdmin}
                  />
                ))}
              </>
            )}
          </tbody>
          {/* <tfoot>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>company</th>
              <th>location</th>
              <th>Last Login</th>
              <th>Favorite Color</th>
            </tr>
          </tfoot> */}
        </table>
      </div>
    </section>
  );
};

export default DashSurveyList;
