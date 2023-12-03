import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import useAdmin from "../hooks/useAdmin";
import ReactPreloader from "../components/PreLoader/ReactPreloader";

const handleUserAccess = (allowedRoles, children) => {
  const { logOutUser } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const navigate = useNavigate();

  const handleOthersUser = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You're not allowed to access admin dashboard",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Go Dashboard",
      cancelButtonText: "Log out!",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/dashboard");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        logOutUser();
      }
    });
  };

  if (isAdminLoading) {
    return <ReactPreloader />;
  }

  if (isAdmin && allowedRoles.includes(isAdmin)) {
    return children;
  }

  return handleOthersUser();
};

export const HideAdminRoutes = ({ children }) => {
  return handleUserAccess(["admin"], children);
};

export const HideAuthRoutes = ({ children }) => {
  const { user, authLoading } = useAuth();
  const location = useLocation();

  // if (user) {
  //   return <ReactPreloader />;
  // }

  if (user) {
    return <Navigate to="/dashboard" replace></Navigate>;
  }

  return children;
};

export const HideProUserRoutes = ({ children }) => {
  return handleUserAccess(["pro_user", "admin"], children);
};

export const HideSurveyorRoutes = ({ children }) => {
  return handleUserAccess(["surveyor", "admin"], children);
};
