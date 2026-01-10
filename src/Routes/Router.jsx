import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/HomePage/Home";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Contact from "../Pages/Contact/Contact";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/AuthPages/Login/Login";
import Register from "../Pages/AuthPages/Register/Register";
import ApplyTutors from "../Pages/ApplyTutors/ApplyTutors";
import PostTuitions from "../Pages/PostTuition/PostTuitions";
import PrivateRoute from "./PrivateRoute";
import AllTuitions from "../Pages/AllTuitions/AllTuitions";
import TuitionDetails from "../Pages/TuitionDetails/TuitionDetails";
import DashboardLayout from "../Layouts/DashboardLayout";
import DashboardHome from "../Pages/DashboardHome/DashboardHome";
import MyTuitions from "../Pages/StudentDashboard/MyTuitions";
import AllTutors from "../Pages/AllTutors/AllTutors";
import TutorDetails from "../Pages/TutorDetails/TutorDetails";
import ApproveTutors from "../Pages/AdminDashboard/ApproveTutors";
import UserManagement from "../Pages/UserManagement/UserManagement";
import AdminRoute from "./AdminRoute";
import StudentRoute from "./StudentRoute";
import TutorRoute from "./TutorRoute";
import TutorTuitions from "../Pages/TutorDashboard/TutorTuitions";
import TutorApplication from "../Pages/TutorDashboard/TutorApplication";
import AllPayments from "../Pages/AdminDashboard/AllPayments";
import Application from "../Pages/StudentDashboard/Application";
import MyPayments from "../Pages/StudentDashboard/MyPayments";
import Settings from "../Pages/DashboardHome/Settings";
import Revenue from "../Pages/TutorDashboard/Revenue";
import PaymentSuccess from "../Pages/StudentDashboard/PaymentSuccess";
import PaymentFailure from "../Pages/StudentDashboard/PaymentFailure";
import TutorReviewsPage from "../Pages/TutorDashboard/TutorReviewsPage";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import ForgetPassword from "../Pages/AuthPages/ForgetPassword/ForgetPassword";
import VerifyOtp from "../Pages/AuthPages/VerifyOtp/VerifyOtp";
import ResetPassword from "../Pages/AuthPages/ResetPassword/ResetPassword";
import DashboardMessages from "../Components/DashboardMessages/DashboardMessages";
import ChatPage from "../Components/ChatPage/ChatPage";
import Career from "../Pages/Footer/Career";
import Pricing from "../Pages/Footer/Pricing";
import Blog from "../Pages/Footer/Blog";
import Support from "../Pages/Footer/Support";
import TermsAndConditions from "../Pages/Footer/TermsAndConditions";
import PrivacyPolicy from "../Pages/Footer/PrivacyPolicy";
import CookiePolicy from "../Pages/Footer/CookiePolicy";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "aboutUs",
        Component: AboutUs,
      },
      {
        path: "contact",
        Component: Contact,
      },
      {
        path: "apply-tutor",
        element: (
          <PrivateRoute>
            <ApplyTutors></ApplyTutors>
          </PrivateRoute>
        ),
      },
      {
        path: "/post-tuition",
        element: (
          <PrivateRoute>
            <PostTuitions></PostTuitions>
          </PrivateRoute>
        ),
      },
      {
        path: "/all-tuition",
        element: <AllTuitions></AllTuitions>,
      },
      {
        path: "/all-tutors",
        element: <AllTutors></AllTutors>,
      },
      {
        path: "/tuitions/:id",
        element: (
          
            <TuitionDetails></TuitionDetails>
          
        ),
      },
      {
        path: "/tutors/:id",
        element: <TutorDetails></TutorDetails>,
      },
      {
        path: "career",
        Component: Career,
      },
      {
        path : "pricing",
        Component : Pricing
      },
      {
        path : "blog",
        Component : Blog
      },
      {
        path : "support",
        Component : Support
      },
      {
        path : "terms-and-conditions",
        Component : TermsAndConditions
      },
      {
        path : "privacy-policy",
        Component : PrivacyPolicy
      },
      {
        path : "cookie-policy",
        Component : CookiePolicy
      }
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "forgot-password",
        Component: ForgetPassword,
      },
      {
        path: "verify-otp",
        Component: VerifyOtp,
      },
      {
        path: "reset-password",
        Component: ResetPassword,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "my-tuitions",
        element: (
          <StudentRoute>
            <MyTuitions></MyTuitions>
          </StudentRoute>
        ),
      },
      {
        path: "applications",
        element: (
          <StudentRoute>
            <Application></Application>
          </StudentRoute>
        ),
      },
      {
        path: "payments",
        element: (
          <StudentRoute>
            <MyPayments></MyPayments>
          </StudentRoute>
        ),
      },
      {
        path: "payment-success",
        element: (
          <StudentRoute>
            <PaymentSuccess></PaymentSuccess>
          </StudentRoute>
        ),
      },
      {
        path: "payment-failure",
        element: (
          <StudentRoute>
            <PaymentFailure></PaymentFailure>
          </StudentRoute>
        ),
      },
      {
        path: "tutors",
        element: (
          <AdminRoute>
            <ApproveTutors></ApproveTutors>
          </AdminRoute>
        ),
      },
      {
        path: "payments/all",
        element: (
          <AdminRoute>
            <AllPayments></AllPayments>
          </AdminRoute>
        ),
      },
      {
        path: "users",
        element: (
          <AdminRoute>
            <UserManagement></UserManagement>
          </AdminRoute>
        ),
      },
      {
        path: "my-tuitions/tutor",
        element: (
          <TutorRoute>
            <TutorTuitions></TutorTuitions>
          </TutorRoute>
        ),
      },
      {
        path: "applications/tutor",
        element: (
          <TutorRoute>
            <TutorApplication></TutorApplication>
          </TutorRoute>
        ),
      },
      {
        path: "revenue",
        element: (
          <TutorRoute>
            <Revenue></Revenue>
          </TutorRoute>
        ),
      },
      {
        path: "review",
        element: (
          <TutorRoute>
            <TutorReviewsPage></TutorReviewsPage>
          </TutorRoute>
        ),
      },
      {
        path: "messages",
        Component: DashboardMessages,
      },
      {
        path: "messages/:conversationId",
        Component: ChatPage,
      },
      {
        path: "settings",
        Component: Settings,
      },
    ],
  },
  {
    path: "*",
    Component: ErrorPage,
  },
]);
