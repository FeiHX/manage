import React from "react";
import { useRoutes } from "react-router-dom";
import Login from "../views/login/Login";

export default function LoginRoute() {
  const element = useRoutes([
    {
      path: "/login",
      element: <Login />
    }
  ]);
  return element;
}
