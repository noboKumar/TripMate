import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import Root from "../Root";
import Login from "../pages/login";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
    ],
  },
]);
