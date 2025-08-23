import React, { useEffect, useState, useContext } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
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
        // FireStore query: get only itineraries for logged-in user
        const q = query(
          collection(db, "itineraries"),
          where("email", "==", user.email)
        );
        const querySnapshot = await getDocs(q);
        const userItineraries = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
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

  return (
    <div className="p-6">
      <h1 className="text-4xl font-medium py-5 divider">Your Trips:</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 space-y-4">
        {itineraries.length > 0 ? (
          itineraries.map((trip) => (
            <div key={trip.id} className="border-2 border-gray-400 p-4 rounded-md shadow-md bg-gray-100">
              <h2 className="text-xl font-semibold">{trip.destination}</h2>
              <p className="text-gray-600">Type: {trip.tripType}</p>
              <p className="text-gray-600">
                Dates: {trip.startDate} - {trip.endDate}
              </p>
              <ul className="list-disc list-inside text-gray-700">
                {trip.activities.map((act, idx) => (
                  <li key={idx}>{act}</li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>No itineraries found. Add one!</p>
        )}
      </div>
    </div>
  );
};

export default ItinerariesPage;
