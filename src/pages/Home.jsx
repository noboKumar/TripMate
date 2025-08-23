import React from "react";
import Hero from "../components/Hero";
import ItinerariesPage from "./Itineraries";
import { Toaster } from "react-hot-toast";

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <ItinerariesPage></ItinerariesPage>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Home;
