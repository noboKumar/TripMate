import React from "react";
import Hero from "../components/Hero";
import ItinerariesPage from "./Itineraries";
import { Toaster } from "react-hot-toast";

const Home = () => {
  return (
    <div>
      <Hero />
      <div className="w-11/12 mx-auto">
        <ItinerariesPage />
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Home;
