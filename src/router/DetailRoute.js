import React from "react";
import { useRoutes } from "react-router-dom";
import Detail from "../views/news/Detail";

export default function DetailRoute() {
  const element = useRoutes([
    {
      path: "/detail/:id",
      element: <Detail />
    }
  ]);
  return element;
}
