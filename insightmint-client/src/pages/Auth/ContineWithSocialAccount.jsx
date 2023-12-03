import { FaGoogle } from "react-icons/fa6";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ContineWithSocialAccount = () => {
  const { contineWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleGoogleLogin = () => {
    contineWithGoogle().then(() => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login successfull",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        navigate(from, { replace: true });
      });
    });
  };

  return (
    <div>
      <button
        onClick={handleGoogleLogin}
        className="active:scale-95 transition-all w-full flex items-center justify-center mt-4 text-gray-600 duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
      >
        <div className="px-4 py-2">
          <FaGoogle />
        </div>

        <span className="w-5/6 px-4 py-3 font-bold text-center">
          Sign in with Google
        </span>
      </button>
    </div>
  );
};

export default ContineWithSocialAccount;
