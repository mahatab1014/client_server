import Swal from "sweetalert2";
import PageTitle from "../../../components/PageTitle/PageTitle";
import ReportTable from "../../../components/ReportTable/ReportTable";
import useReportsData from "../../../hooks/useReportsData";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const DashReportList = () => {
  const [reportsData, reportsDataRefetch] = useReportsData();
  const axiosSecure = useAxiosSecure();
  const handleDeleteReport = (id) => {
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
        axiosSecure.delete(`/survey-report/${id}`).then(() => {
          Swal.fire({
            title: "Deleted!",
            text: "Report has been deleted.",
            icon: "success",
          }).then(() => {
            reportsDataRefetch();
          });
        });
      }
    });
  };
  return (
    <>
      <PageTitle title="Report List" />
      <section>
        <div className="title py-10">
          <h2 className="text-3xl text-center">Report List</h2>
          <div className="border-b-2 pt-3 w-2/4 m-auto"></div>
        </div>

        <div className="overflow-x-auto">
          <table className="table table-xs table-zebra">
            <thead className="bg-slate-500 text-white">
              <tr>
                <th></th>
                <th>Reason</th>
                <th>Title</th>
                <th>Posted_user</th>
                <th>Survey Category</th>
                <th>Survey Create Date</th>
                <th>Survey Status</th>
                <th>Delete Survey</th>
                <th>Delete Report</th>
              </tr>
            </thead>
            <tbody>
              {reportsData.map((report, index) => (
                <ReportTable
                  key={report._id}
                  index={index}
                  report={report}
                  handleDeleteReport={handleDeleteReport}
                />
              ))}
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
    </>
  );
};

export default DashReportList;
