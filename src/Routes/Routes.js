import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Components/Dashboard/Dashboard";
import Home from "../Components/Home/Home";
import MyProperties from "../Components/Myproperties/MyProperties";
import Main from "../Layouts/Main";

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
                path: '/dashboard',
                element: <Dashboard></Dashboard>
            },
            {
                path: '/properties',
                element: <MyProperties></MyProperties>
            },
            {
                path: '/properties/:id',
                element: <MyProperties></MyProperties>
            },
        ]
    }
])