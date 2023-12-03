import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
/* eslint-disable react/prop-types */
const UsersTable = ({ user, index, handleUserRole }) => {
  const role_data = [
    { id: 1, name: "user", unavailable: false },
    { id: 2, name: "admin", unavailable: false },
    { id: 3, name: "pro_user", unavailable: false },
    { id: 4, name: "surveyor", unavailable: false },
  ];

  const [selectedRole, setSelectedRole] = useState(role_data[0]);
  let [isOpen, setIsOpen] = useState(false);
  // console.log(selectedRole);
  return (
    <tr>
      <th>{index}</th>
      <td>{user?.name}</td>
      <td>{user?.email}</td>
      <td>{user?.role}</td>
      <td>
        <span className="btn btn-xs" onClick={() => setIsOpen(true)}>
          Change
        </span>
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
                    Chnage User Role
                  </Dialog.Title>
                  <div className="my-3">
                    <form onSubmit={(e) => handleUserRole(e,user?._id)}>
                      <select
                      name="user_role"
                        className="search-form-field w-full"
                        onChange={(e) => setSelectedRole(e.target.value)}
                        defaultValue={user?.role}
                      >
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
                      <button
                        type="submit"
                        className="primary-button !btn-sm mt-3 !rounded"
                      >
                        Change Role
                      </button>
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

export default UsersTable;
