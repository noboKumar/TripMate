import React, { useEffect, useState, useContext } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { AuthContext } from "../context/AuthContext";
import {
  HiOutlineCalendar,
  HiOutlineMap,
  HiOutlineBriefcase,
  HiOutlineHashtag,
} from "react-icons/hi";
import placeholderImg from "../assets/placeholder-Img.jpeg";
import { FaRegHeart } from "react-icons/fa";
import SearchBar from "../components/SearchBar";

const ItinerariesPage = () => {
  const { user } = useContext(AuthContext);
  const [itineraries, setItineraries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchItineraries = async () => {
      if (!user) return;

      try {
        const querySnapshot = await getDocs(collection(db, "itineraries"));
        const userItineraries = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((trip) => trip.userEmail === user.email);

        setItineraries(userItineraries);
      } catch (error) {
        console.error("Error fetching itineraries:", error);
      }
    };

    fetchItineraries();
  }, [user]);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-20">
        <p className="text-xl font-medium text-gray-700">
          Please log in to view your itineraries.
        </p>
        <a
          href="/login"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition"
        >
          Log In
        </a>
      </div>
    );
  }

  const filteredItineraries = itineraries.filter((trip) => {
    const query = searchQuery.toLowerCase();
    return (
      trip.destination.toLowerCase().includes(query) ||
      trip.tripType.toLowerCase().includes(query) ||
      (typeof trip.activities === "string"
        ? trip.activities.toLowerCase().includes(query)
        : Array.isArray(trip.activities) &&
          trip.activities.some((act) => act.toLowerCase().includes(query)))
    );
  });

  return (
    <div className="p-6">
      <h1 className="text-4xl font-medium py-5 divider">Your Trips:</h1>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredItineraries.length > 0 ? (
          filteredItineraries.map((trip) => {
            const start = trip.startDate
              ? trip.startDate.toDate().toLocaleDateString()
              : "N/A";
            const end = trip.endDate
              ? trip.endDate.toDate().toLocaleDateString()
              : "N/A";

            // Ensure activities is an array
            const activities =
              typeof trip.activities === "string"
                ? trip.activities.split(",").map((a) => a.trim())
                : Array.isArray(trip.activities)
                ? trip.activities
                : [];

            return (
              <div
                key={trip.id}
                className="border-2 border-gray-400 p-4 rounded-xl shadow-md bg-gray-100 hover:shadow-xl transition"
              >
                <div className="relative">
                  <img
                    src={trip.photo || placeholderImg}
                    alt={trip.destination}
                    className="w-full h-40 object-cover rounded-md mb-2"
                  />
                  <div className="absolute top-2 right-2 bg-white p-2 rounded-full transition transform hover:scale-110 cursor-pointer">
                    <FaRegHeart size={30} className="text-red-500" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold flex items-center gap-2">
                    <HiOutlineMap className="text-blue-500" />
                    {trip.destination}
                  </h2>

                  <p className="text-gray-600 flex items-center gap-2">
                    <HiOutlineBriefcase className="text-green-500" />
                    Type: <span className="font-semibold">{trip.tripType}</span>
                  </p>

                  <p className="text-gray-600 flex items-center gap-2">
                    <HiOutlineCalendar className="text-red-500" />
                    Dates:{" "}
                    <span className="font-semibold">
                      {start} {end && `- ${end}`}
                    </span>
                  </p>

                  {activities.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {activities.map((act, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-1 bg-blue-200 px-2 py-1 rounded-full text-sm"
                        >
                          <HiOutlineHashtag className="text-blue-600" />
                          {act}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-1 md:col-span-2 lg:col-span-4">
            <p className="text-gray-500">No trips found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItinerariesPage;
