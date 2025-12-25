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
        element: (
          <PrivateRoute>
            <AllTuitions></AllTuitions>
          </PrivateRoute>
        ),
      },
      {
        path: "/all-tutors",
        element: (
          <PrivateRoute>
            <AllTutors></AllTutors>
          </PrivateRoute>
        ),
      },
      {
        path: "/tuitions/:id",
        element: (
          <PrivateRoute>
            <TuitionDetails></TuitionDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/tutors/:id",
        element: (
          <PrivateRoute>
            <TutorDetails></TutorDetails>
          </PrivateRoute>
        ),
      },
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
      }
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
        path :"my-tuitions/tutor",
        element : <TutorRoute>
          <TutorTuitions></TutorTuitions>
        </TutorRoute>
      },
      {
        path :"applications/tutor",
        element : <TutorRoute>
          <TutorApplication></TutorApplication>
        </TutorRoute>
      },
      {
        path :"revenue",
        element : <TutorRoute>
          <Revenue></Revenue>
        </TutorRoute>
      },
      {
        path :"review",
        element : <TutorRoute>
          <TutorReviewsPage></TutorReviewsPage>
        </TutorRoute>
      },
      {
        path :"settings",
       Component : Settings
      },
    ],
  },
  {
    path : "*",
    Component : ErrorPage
  }
]);
