import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Dashboard = lazy(() => import("../views/Dashboard"));
const Login = lazy(() => import("../views/Login"));
const Books = lazy(() => import("../views/ui/Books.js"));

/*****Routes******/

const ThemeRoutes = (isAuthenticated, isAuthenticating) => [
  {
    path: "/",
    element:
      isAuthenticated !== null ? <FullLayout /> : <Navigate to="/login" />,
    children: [
      { path: "/", element: <Navigate to="/dashboard" /> },
      { path: "/dashboard", exact: true, element: <Dashboard /> },
      { path: "/books", exact: true, element: <Books /> },
    ],
  },
  {
    path: "/",
    element:
      isAuthenticated === null && isAuthenticating === false ? (
        <Login />
      ) : (
        <Navigate to="/dashboard" />
      ),
    children: [
      { path: "login", element: <Login /> },
      { path: "/", element: <Navigate to="/login" /> },
    ],
  },
];

export default ThemeRoutes;
