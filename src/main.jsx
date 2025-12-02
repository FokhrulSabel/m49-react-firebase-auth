import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from "./layout/Root.jsx";
import Home from "./components/Home/Home.jsx";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import AuthProvider from "./contexts/AuthContext/AuthProvider.jsx";
import Orders from "./components/Orders/Orders.jsx";
import PrivateRoutes from "./Routes/PrivateRoutes.jsx";
import Profile from "./components/Profile/Profile.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: 'orders',
        element: <PrivateRoutes>
          <Orders></Orders>
        </PrivateRoutes>
      },
      {
        path: 'profile',
        element: <PrivateRoutes>
          <Profile></Profile>
        </PrivateRoutes>
      },
      {
        path: 'dashboard',
        element:<PrivateRoutes>
          <Dashboard></Dashboard>
        </PrivateRoutes>
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
