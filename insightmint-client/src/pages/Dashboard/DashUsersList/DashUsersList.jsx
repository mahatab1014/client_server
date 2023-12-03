import toast from "react-hot-toast";
import PageTitle from "../../../components/PageTitle/PageTitle";
import UsersTable from "../../../components/UsersTable/UsersTable";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUsersData from "../../../hooks/useUsersData";
import { FaFilter } from "react-icons/fa6";
import { useState } from "react";

const DashUsersList = () => {
  const [role, setRole] = useState("");
  const [usersData, usersRefetch] = useUsersData(role);

  const axiosSecure = useAxiosSecure();

  const handleUserRole = (e, id) => {
    e.preventDefault();

    const userRole = e.target.user_role.value;
    const postData = { role: userRole };
    axiosSecure.put(`/user-role/${id}`, postData).then(() => {
      const dataRefetch = usersRefetch();
      toast.promise(dataRefetch, {
        loading: "Role updating...",
        success: <b>Role updated!</b>,
        error: <b>Could not updated.</b>,
      });
    });
  };
  const role_data = [
    { id: 1, name: "user", unavailable: false },
    { id: 2, name: "admin", unavailable: false },
    { id: 3, name: "pro_user", unavailable: false },
    { id: 4, name: "surveyor", unavailable: false },
  ];

  const handleFilterByRole = async (e) => {
    e.preventDefault();
    const role = e.target.user_role.value;
    setRole(role);
  };

  return (
    <>
      <PageTitle title="Users list" />
      <div className="title py-8">
        <h2 className="text-3xl text-center">All Users List</h2>
        <div className="border-b-2 pt-3 w-2/4 m-auto"></div>
      </div>
      <section>
        <div className="overflow-x-auto">
          <div className="">
            <form
              className="flex justify-center items-center gap-3 mb-4"
              onSubmit={handleFilterByRole}
            >
              <p className="w-full">Filter By User Role : </p>
              <select name="user_role" className="search-form-field w-full [&>option]:uppercase">
                <option value="" selected>
                  all user
                </option>
                {role_data.map((role) => (
                  <option
                    key={role?.id}
                    value={role?.name}
                    disabled={role?.unavailable}
                  >
                    {role?.name}
                  </option>
                ))}
              </select>
              <div className="w-full">
                <button
                  type="submit"
                  className="primary-button !btn-sm !rounded"
                >
                  <FaFilter />
                  Filter
                </button>
              </div>
            </form>
          </div>
          <table className="table table-xs">
            <thead className="bg-slate-500 text-white">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Change Role</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((user, index) => (
                <UsersTable
                  key={user._id}
                  index={index}
                  user={user}
                  handleUserRole={handleUserRole}
                />
              ))}
            </tbody>
            <tfoot>
              {/* <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Change Role</th>
                <th>Last Login IP</th>
              </tr> */}
            </tfoot>
          </table>
        </div>
      </section>
    </>
  );
};

export default DashUsersList;
