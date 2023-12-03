import { Link, useLocation } from "react-router-dom";
import Container from "../../components/Container/Container";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import Payment from "../Payment/Payment";
import useAuth from "../../hooks/useAuth";
import useAdmin from "../../hooks/useAdmin";

const BecomeAProUser = () => {
  let [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const [isAdmin] = useAdmin();
  const location = useLocation();

  // console.log(isAdmin);

  return (
    <section>
      <Container>
        <div className="bg-white dark:bg-gray-900">
          <div className="my-10">
            <div className="xl:items-center xl:-mx-8 xl:flex">
              <div className="flex flex-col items-center xl:items-start xl:mx-8">
                <h1 className="text-2xl font-medium text-gray-800 capitalize lg:text-3xl dark:text-white">
                  Our Pricing Plan
                </h1>

                <div className="mt-4">
                  <span className="inline-block w-40 h-1 bg-blue-500 rounded-full"></span>
                  <span className="inline-block w-3 h-1 mx-1 bg-blue-500 rounded-full"></span>
                  <span className="inline-block w-1 h-1 bg-blue-500 rounded-full"></span>
                </div>

                <p className="mt-4 font-medium text-gray-500 dark:text-gray-300">
                  You can get All Access by selecting your plan!
                </p>

                <Link className="flex items-center mt-4 -mx-1 text-sm text-gray-700 capitalize dark:text-blue-400 hover:underline hover:text-blue-600 dark:hover:text-blue-500">
                  <span className="mx-1">read more</span>
                  <svg
                    className="w-4 h-4 mx-1 rtl:-scale-x-100"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </Link>
              </div>

              <div className="flex-1 xl:mx-8">
                <div className="mt-8 space-y-8 md:-mx-4 md:flex md:items-center md:justify-center md:space-y-0 xl:mt-0">
                  <div className="max-w-sm mx-auto border rounded-lg md:mx-4 dark:border-gray-700">
                    <div className="p-6">
                      <h2 className="text-xl font-medium text-gray-700 capitalize lg:text-2xl dark:text-white">
                        Pro Membership
                      </h2>

                      <p className="mt-4 text-gray-500 dark:text-gray-300">
                        Unlock exclusive features and benefits with our Pro
                        Membership. Upgrade now for a premium survey experience!
                      </p>

                      <h2 className="mt-4 text-2xl font-semibold text-gray-700 sm:text-3xl dark:text-gray-300">
                        $14.99
                        <span className="text-base font-medium">/Month</span>
                      </h2>

                      <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-full px-4 py-2 mt-6 tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                      >
                        Start Now
                      </button>
                    </div>

                    <hr className="border-gray-200 dark:border-gray-700" />

                    <div className="p-6">
                      <h4 className="text-lg font-medium text-gray-700 capitalize lg:text-xl dark:text-white">
                        What’s included:
                      </h4>

                      <div className="mt-8 space-y-4">
                        <div className="flex items-center">
                          <FaCheck className="w-5 h-5 text-blue-500" />
                          <span className="mx-4 text-gray-700 dark:text-gray-300">
                            All limited links
                          </span>
                        </div>
                        <div className="flex items-center">
                          <FaCheck className="w-5 h-5 text-blue-500" />
                          <span className="mx-4 text-gray-700 dark:text-gray-300">
                            Comment access
                          </span>
                        </div>
                        <div className="flex items-center">
                          <FaCheck className="w-5 h-5 text-blue-500" />
                          <span className="mx-4 text-gray-700 dark:text-gray-300">
                            Own analytics platform
                          </span>
                        </div>
                        <div className="flex items-center">
                          <FaCheck className="w-5 h-5 text-blue-500" />
                          <span className="mx-4 text-gray-700 dark:text-gray-300">
                            24/7 Support
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <>
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
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-5">
                    <div className="">
                      {user?.email ? (
                        <>
                          {isAdmin === "admin" ? (
                            <h3 className="font-bold text-lg">
                              Broh! You're a admin
                            </h3>
                          ) : (
                            <Payment />
                          )}
                        </>
                      ) : (
                        <>
                          <h3 className="font-bold text-lg">Hello there!</h3>
                          <p className="py-4">
                            To perform this operation, you need to be logged in.
                            Please{" "}
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
                        </>
                      )}
                    </div>

                    <div className="mt-4 text-right">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        Close
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    </section>
  );
};

export default BecomeAProUser;
