import { createBrowserRouter, Navigate } from "react-router-dom";

import App from "../App";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import MainScreen from "../screens/MainScreen";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />,
      },
      {
        path: "login",
        element: <LoginScreen />,
      },
      {
        path: "register",
        element: <RegisterScreen />,
      },
      {
        path: "main",
        element: <MainScreen />,
      },
    ],
  },
]);

export default router;
