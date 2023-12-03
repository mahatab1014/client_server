import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import PageNotFound from "../pages/ErrorPage/PageNotFound";
import SurveysDetails from "../pages/Surveys/SurveysDetails";
import SignIn from "../pages/Auth/SignIn";
import SignUp from "../pages/Auth/SignUp";
import AuthLayout from "../layouts/AuthLayout";
import Surveys from "../pages/Surveys/Surveys";
import BecomeAProUser from "../pages/BecomeAProUser/BecomeAProUser";
import DashboardLayout from "../layouts/DashboardLayout";
import DashHome from "../pages/Dashboard/DashHome/DashHome";
import DashSurveyList from "../pages/Dashboard/DashSurveyList/DashSurveyList";
import DashSurveyCreate from "../pages/Dashboard/DashSurveyCreate/DashSurveyCreate";
import DashUsersList from "../pages/Dashboard/DashUsersList/DashUsersList";
import DashReportList from "../pages/Dashboard/DashReportList/DashReportList";
import DashPaymentTransactions from "../pages/Dashboard/DashPaymentTransactions/DashPaymentTransactions";
import DashUpdateSurvey from "../pages/Dashboard/DashUpdateSurvey/DashUpdateSurvey";
import PrivateRoutes from "./PrivateRoutes";
import DashProfile from "../pages/Dashboard/DashProfile/DashProfile";
import DashAnalytics from "../pages/Dashboard/DashAnalytics/DashAnalytics";
import {
  HideAdminRoutes,
  HideAuthRoutes,
  HideProUserRoutes,
  HideSurveyorRoutes,
} from "./HideRoutes";

const PublicRoutes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "surveys",
        element: <Surveys />,
      },
      {
        path: "survey/:id",
        element: <SurveysDetails />,
      },
      {
        path: "become-a-pro-user",
        element: <BecomeAProUser />,
      },
    ],
  },
  {
    path: "/auth",
    element: (
      <HideAuthRoutes>
        <AuthLayout />
      </HideAuthRoutes>
    ),
    children: [
      {
        index: true,
        element: <SignIn />,
      },
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <DashboardLayout />
      </PrivateRoutes>
    ),
    children: [
      {
        index: true,
        element: <DashHome />,
      },
      {
        path: "profile",
        element: <DashProfile />,
      },
      {
        path: "survey-list",
        element: (
          <HideSurveyorRoutes>
            <DashSurveyList />
          </HideSurveyorRoutes>
        ),
      },
      {
        path: "survey-create",
        element: (
          <HideSurveyorRoutes>
            <DashSurveyCreate />
          </HideSurveyorRoutes>
        ),
      },
      {
        path: "survey-analytics/:id",
        element: (
          <HideSurveyorRoutes>
            <DashAnalytics />
          </HideSurveyorRoutes>
        ),
      },
      {
        path: "survey-analytics",
        element: (
          <HideSurveyorRoutes>
            <DashSurveyList />
          </HideSurveyorRoutes>
        ),
      },
      {
        path: "survey-update/:id",
        element: (
          <HideSurveyorRoutes>
            <DashUpdateSurvey />
          </HideSurveyorRoutes>
        ),
      },
      {
        path: "survey-update",
        element: (
          <HideSurveyorRoutes>
            <DashSurveyList />
          </HideSurveyorRoutes>
        ),
      },
      {
        path: "users",
        element: (
          <HideAdminRoutes>
            <DashUsersList />
          </HideAdminRoutes>
        ),
      },
      {
        path: "reports",
        element: (
          <HideAdminRoutes>
            <DashReportList />
          </HideAdminRoutes>
        ),
      },
      {
        path: "payment-transactions",
        element: <DashPaymentTransactions />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default PublicRoutes;
