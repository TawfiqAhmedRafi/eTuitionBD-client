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
import MyTuitions from "../Pages/DashboardHome/MyTuitions";

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
        path: "/tuitions/:id",
        element: (
          <PrivateRoute>
            <TuitionDetails></TuitionDetails>
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
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children:[
      {
        index : true ,
        Component: DashboardHome
      },
      {
        path : 'my-tuitions',
        Component : MyTuitions
      }
    ]
  },
]);
