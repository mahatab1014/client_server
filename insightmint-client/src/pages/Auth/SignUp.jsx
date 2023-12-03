import Container from "../../components/Container/Container";
import LightLogo from "../../assets/images/logo/logo_light.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UploadImageImgBB } from "../../utility/utility";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import ContineWithSocialAccount from "./ContineWithSocialAccount";
import Swal from "sweetalert2";

const SignUp = () => {
  const [selectedImage, setSelectedImage] = useState("");
  const {
    createUserWithEmail,
    updateUserProfile,
  } = useAuth();
  const [confirmPass, setConfirmPass] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const form = e.target;
    const name = form.name.value;
    // const photo = form.photo.files[0];
    const profile_url = form.photo_url.value;
    const email = form.email.value;
    const password = form.password.value;
    const passwordConfimation = password === confirmPass;
    // if (!passwordConfimation) {
    //   return setErrorMessage("Password doesn't match");
    // }
    // if (!/^(.{6,})$/.test(password)) {
    //   return setErrorMessage("Password must be at least 6 characters");
    // }
    // if (!/[A-Z]/.test(password)) {
    //   return setErrorMessage(
    //     "Password must contain at least one capital letter"
    //   );
    // }
    // if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)) {
    //   return setErrorMessage(
    //     "Password must contain at least one special character"
    //   );
    // }
    console.log(profile_url);

    createUserWithEmail(email, password)
      .then(async () => {
        // const data = await UploadImageImgBB(photo);
        // const profile_picture = data?.data?.display_url;
        console.log(profile_url);
        console.log(name);
        updateUserProfile(name, profile_url);
        // Swal.fire({
        //   position: "center",
        //   icon: "success",
        //   title: "Sign Up successfully",
        //   showConfirmButton: false,
        //   timer: 1500,
        // }).then(() => {
        //   navigate(from, { replace: true });
        // });
      })
      .catch((error) => setErrorMessage("Your email is already in use"));
  };

  const handleImage = (e) => {
    const image = e.target.files[0];

    if (image instanceof Blob) {
      const reader = new FileReader();

      reader.onload = () => {
        const imageDataUrl = reader.result;
        setSelectedImage(imageDataUrl);
      };

      reader.readAsDataURL(image);
    } else {
      console.error("Selected file is not a valid image");
    }
  };

  return (
    <section>
      <Container>
        <div className="my-5 lg:my-0 lg:h-screen lg:flex lg:items-center">
          <div className="flex h-[90%] w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
            <div className="w-full px-6 py-8 md:px-8 lg:w-1/2 overflow-y-scroll custom-scrollbar">
              <div className="flex justify-center mx-auto">
                <img className="w-auto h-10 sm:h-16" src={LightLogo} alt="" />
              </div>

              <ContineWithSocialAccount />

              <div className="flex items-center justify-between mt-4">
                <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

                <span className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">
                  or sign up with email
                </span>

                <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
              </div>
              {errorMessage && (
                <div className="mt-8 bg-error p-2 text-black">
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSignUp}>
                <div className="mt-4">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                    type="text"
                    required
                  />
                </div>
                {/*               <div className="mt-4">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                    htmlFor="photo"
                  >
                    Profile Picture
                  </label>
                  {selectedImage && (
                    <div className="avatar flex pb-3 justify-center">
                      <div className="w-24 rounded-full">
                        <img src={selectedImage} />
                      </div>
                    </div>
                  )}

                  <input
                    id="photo"
                    name="photo"
                    className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                    type="file"
                    onChangeCapture={handleImage}
                    accept="image/*"
                  />
</div> */}
                <div className="mt-4">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                    htmlFor="photo_url"
                  >
                    Profile Picture
                  </label>

                  <input
                    id="photo_url"
                    name="photo_url"
                    className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                    type="url"
                  />
                </div>
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
                  </div>

                  <input
                    id="loggingPassword"
                    className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                    type="password"
                    name="password"
                    required
                  />
                </div>

                <div className="mt-4">
                  <div className="flex justify-between">
                    <label
                      className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                      htmlFor="confirmPassword"
                    >
                      Confirm Password
                    </label>
                  </div>

                  <input
                    id="confirmPassword"
                    className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                    type="password"
                    name="confirmPassword"
                    onChange={(e) => setConfirmPass(e.target.value)}
                    required
                  />
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
              <div className="mt-4 text-center">
                <span>Have An Account?</span>
                <Link
                  to="/auth/sign-in"
                  className="hover:underline text-blue-600"
                >
                  {" "}
                  Sign In
                </Link>
              </div>
            </div>
            <div
              className="hidden bg-cover lg:block lg:w-1/2"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1606660265514-358ebbadc80d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1575&q=80')",
              }}
            ></div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SignUp;
