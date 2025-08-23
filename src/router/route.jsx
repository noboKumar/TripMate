import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import Root from "../Root";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import ItinerariesPage from "../pages/Itineraries";
import AddItinerary from "../pages/AddItineraries";

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
        path: "/signIn",
        Component: SignIn,
      },
      {
        path: "/signUp",
        Component: SignUp,
      },
    ],
  },
]);
