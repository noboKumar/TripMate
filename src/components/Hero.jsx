import React, { useContext } from "react";
import coverPhoto from "../assets/cover-photo.jpg";
import { FaPlus } from "react-icons/fa";
import AddItinerariesModal from "./AddItinerariesModal";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const Hero = () => {
  const { user } = useContext(AuthContext);
  const handleAddItinerary = () => {
    if (!user) {
      toast.error("Please log in to add itineraries.");
      return;
    }
    document.getElementById("my_modal_3").showModal();
  };

  return (
    <div className="relative w-full max-h-[500px]">
      <img
        className="w-full max-h-[500px] object-cover"
        src={coverPhoto}
        alt="Travel Cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Plan Your Perfect Trip
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Create, organize, and save your travel itineraries easily with
          TripMate
        </p>
        <button
          onClick={handleAddItinerary}
          className="bg-orange-500 hover:bg-orange-600 outline-2 text-white cursor-pointer font-semibold py-3 px-6 rounded-lg transition flex items-center gap-2"
        >
          <FaPlus />
          Add Itinerary
        </button>
      </div>
      <AddItinerariesModal />
    </div>
  );
};

export default Hero;
