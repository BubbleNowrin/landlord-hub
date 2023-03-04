import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Components/Dashboard/Dashboard";
import Home from "../Components/Home/Home";
import Archived from "../Components/Myproperties/Archived";
import MyProperties from "../Components/Myproperties/MyProperties";
import MyProperty from "../Components/Myproperties/MyProperty";
import SingleProperty from "../Components/Myproperties/SingleProperty";
import Login from "../Components/SignUp/Login";
import SignUp from "../Components/SignUp/SignUp";
import Main from "../Layouts/Main";
import PropertyLayout from "../Layouts/PropertyLayout";
import PrivateRoutes from "./PrivateRoutes";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/home',
                element: <Home></Home>
            },
            {
                path: '/dashboard',
                element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>
            },
            {
                path: '/archived',
                element: <PrivateRoutes><Archived></Archived></PrivateRoutes>
            },
            {
                path: '/properties/:id',
                loader: ({ params }) => fetch(`https://landlord-hub.vercel.app/property/${params.id}`),
                element: <PrivateRoutes><SingleProperty></SingleProperty></PrivateRoutes>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/login',
                element: <Login></Login>
            },

        ]
    },
    {
        path: '/properties',
        element: <PrivateRoutes><PropertyLayout></PropertyLayout></PrivateRoutes>,
        children: [
            {
                path: '/properties',
                element: <PrivateRoutes><MyProperties></MyProperties></PrivateRoutes>,
            }
        ]
    }
])