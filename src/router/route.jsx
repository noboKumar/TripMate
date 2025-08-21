import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import Root from "../Root";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
]);
