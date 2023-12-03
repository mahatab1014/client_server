import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import ReactPreloader from "../components/PreLoader/ReactPreloader";

const PrivateRoutes = ({ children }) => {
  const { user, authLoading } = useAuth();
  const location = useLocation();

  if (authLoading) {
    return <ReactPreloader />;
  }

  if (user) {
    return children;
  }

  return <Navigate to="/auth" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoutes;
