import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/HomePage/Home";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Contact from "../Pages/Contact/Contact";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/AuthPages/Login/Login";

export  const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
        {
            index : true,
            Component: Home
        },
        {
            path : "aboutUs",
            Component: AboutUs
        },
        {
            path : "contact",
            Component : Contact
        }
    ]
  },
  {
    path : '/',
    Component: AuthLayout,
    children :[
        {
          path : 'login',
          Component: Login
        }
    ]
  }
]);