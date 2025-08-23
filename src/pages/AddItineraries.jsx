import React, { useContext, useState } from "react";
import { auth, db } from "../firebase/firebase.config";
import { addDoc, collection } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";

const AddItinerary = () => {
  const [destination, setDestination] = useState("");
  const [activities, setActivities] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tripType, setTripType] = useState("leisure");
  const [itineraries, setItineraries] = useState([]);
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data
    const newItinerary = {
      userId: auth.currentUser.uid, // associate itinerary with logged-in user
      email: user?.email || auth.currentUser.email,
      destination,
      activities: activities.split(",").map((a) => a.trim()),
      startDate,
      endDate,
      tripType,
      createdAt: new Date(),
    };

    try {
      // Save to Firestore
      await addDoc(collection(db, "itineraries"), newItinerary);

      // Optionally add to local state so UI updates immediately
      setItineraries([...itineraries, newItinerary]);

      // Reset form
      setDestination("");
      setActivities("");
      setStartDate("");
      setEndDate("");
      setTripType("leisure");

      alert("Itinerary saved successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to save itinerary!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg border-2 border-gray-300 rounded-xl p-6 w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Add Itinerary</h2>

        <input
          type="text"
          placeholder="Destination"
          className="input input-bordered w-full"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Activities (comma separated)"
          className="input input-bordered w-full"
          value={activities}
          onChange={(e) => setActivities(e.target.value)}
          required
        />

        <input
          type="date"
          className="input input-bordered w-full"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />

        <input
          type="date"
          className="input input-bordered w-full"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />

        <select
          className="select select-bordered w-full"
          value={tripType}
          onChange={(e) => setTripType(e.target.value)}
        >
          <option value="adventure">Adventure</option>
          <option value="leisure">Leisure</option>
          <option value="work">Work</option>
        </select>

        <button type="submit" className="btn btn-primary w-full">
          Save Itinerary
        </button>
      </form>
    </div>
  );
};

export default AddItinerary;
