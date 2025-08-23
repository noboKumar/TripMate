import React, { useEffect, useState, useContext } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { AuthContext } from "../context/AuthContext";

const ItinerariesPage = () => {
  const { user } = useContext(AuthContext);
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItineraries = async () => {
      if (!user) return;

      try {
        const querySnapshot = await getDocs(collection(db, "itineraries"));
        const userItineraries = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((trip) => trip.userEmail === user.email);

        setItineraries(userItineraries);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching itineraries:", error);
        setLoading(false);
      }
    };

    fetchItineraries();
  }, [user]);

  if (loading) return <p className="p-6">Loading itineraries...</p>;

  if (!user) {
    return <p className="p-6">Please log in to view your itineraries.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-medium py-5 divider">Your Trips:</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {itineraries.map((trip) => {
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
              className="border-2 border-gray-400 p-4 rounded-md shadow-md bg-gray-100 cursor-pointer transition transform hover:scale-105"
            >
              {trip.photo && (
                <img
                  src={trip.photo}
                  alt={trip.destination}
                  className="w-full h-40 object-cover rounded-md mb-2"
                />
              )}
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold">{trip.destination}</h2>
                <p className="text-gray-600">Type: {trip.tripType}</p>
                <p className="text-gray-600">
                  Dates: {start} {end && `- ${end}`}
                </p>
                {activities.length > 0 && (
                  <div className="list-disc list-inside text-gray-700 mt-2">
                    {activities.map((act, idx) => (
                      <div key={idx} className="badge bg-blue-200">
                        {act}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ItinerariesPage;
