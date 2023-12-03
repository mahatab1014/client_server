import Container from "../../components/Container/Container";
import LightLogo from "../../assets/images/logo/logo_light.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import ContineWithSocialAccount from "./ContineWithSocialAccount";
import Swal from "sweetalert2";
import { useState } from "react";

const SignIn = () => {
  const { signInWithEmail } = useAuth();
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  // console.log(location);

  const handleSignIn = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    setErrorMessage("");
    signInWithEmail(email, password)
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Sign In successfully done",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate(from, { replace: true });
        });
      })
      .catch((error) => {
        setErrorMessage("Email or Password is incorrect!");
      });
  };

  return (
    <section>
      <Container>
        <div className="my-5 lg:my-0 lg:h-screen lg:flex lg:items-center">
          <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
            <div
              className="hidden bg-cover lg:block lg:w-1/2"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1606660265514-358ebbadc80d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1575&q=80')",
              }}
            ></div>

            <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
              <div className="flex justify-center mx-auto">
                <img className="w-auto h-10 sm:h-16" src={LightLogo} alt="" />
              </div>

              <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
                Welcome back!
              </p>

              <ContineWithSocialAccount />
              <div className="flex items-center justify-between mt-4">
                <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

                <span className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">
                  or login with email
                </span>

                <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
              </div>

              {errorMessage && (
                <div className="mt-8 bg-error p-2 text-black">
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSignIn}>
                <div className="mt-4">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                    htmlFor="LoggingEmailAddress"
                  >
                    Email Address
                  </label>
                  <input
                    id="LoggingEmailAddress"
                    className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                    type="email"
                    name="email"
                    required
                  />
                </div>

                <div className="mt-4">
                  <div className="flex justify-between">
                    <label
                      className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                      htmlFor="loggingPassword"
                    >
                      Password
                    </label>
                    <span className="text-xs text-gray-500 dark:text-gray-300 hover:underline">
                      Forget Password?
                    </span>
                  </div>

                  <input
                    id="loggingPassword"
                    className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                    type="password"
                    name="password"
                    required
                  />
                </div>

                <div className="mt-6">
                  <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                    Sign In
                  </button>
                </div>
              </form>
              <div className="mt-4 text-center">
                <span>Don't Have An Account?</span>
                <Link
                  to="/auth/sign-up"
                  className="hover:underline text-blue-600"
                  state={{ from: from }}
                >
                  {" "}
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SignIn;
