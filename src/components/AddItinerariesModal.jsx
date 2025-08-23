import React, { useState, useRef, useEffect, useContext } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { AuthContext } from "../context/AuthContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import toast from "react-hot-toast";

const AddItinerariesModal = () => {
  const [selected, setSelected] = useState({ from: null, to: null });
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef();
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    document.getElementById("my_modal_3").close();

    const form = e.target;
    const formData = new FormData(form);
    const itinerary = Object.fromEntries(formData);
    if (user?.email) {
      itinerary.userEmail = user.email;
    }
    itinerary.startDate = selected.from;
    itinerary.endDate = selected.to;
    console.log(itinerary);

    try {
      await addDoc(collection(db, "itineraries"), itinerary);
      toast.success('Itinerary added successfully!');
    } catch (error) {
      toast.error("Error saving itinerary:", error);
    }
  };

  // Close calendar when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box relative">
          <div className="space-y-2 pb-4">
            <h2 className="text-2xl font-medium">Create New Itinerary</h2>
            <p className="text-sm text-gray-500 font-medium">
              Fill in the details of your next adventure.
            </p>
          </div>

          {/* Close Button */}
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-2">
            {/* Destination */}
            <div className="flex flex-col space-y-1">
              <label htmlFor="destination" className="font-medium">
                Destination
              </label>
              <input
                type="text"
                name="destination"
                placeholder="eg. Bali"
                className="input w-full"
                required
              />
            </div>

            {/* Photo URL */}
            <div className="flex flex-col space-y-1">
              <label htmlFor="photo" className="font-medium">
                Photo URL
              </label>
              <input
                type="url"
                name="photo"
                placeholder="eg. https://example.com/photo.jpg"
                className="input w-full"
              />
            </div>

            {/* Trip Type */}
            <div className="flex flex-col space-y-1">
              <label htmlFor="tripType" className="font-medium">
                Trip Type
              </label>
              <select
                required
                name="tripType"
                defaultValue=""
                className="select w-full"
              >
                <option value="" disabled>
                  Pick a Type
                </option>
                <option>Adventure</option>
                <option>Leisure</option>
                <option>Work</option>
              </select>
            </div>

            {/* Dates */}
            <div className="flex flex-col space-y-1 relative" ref={calendarRef}>
              <label htmlFor="dates" className="font-medium">
                Dates
              </label>
              <input
                type="text"
                readOnly
                required
                name="dates"
                value={
                  selected.from
                    ? selected.to
                      ? `${selected.from.toLocaleDateString()} - ${selected.to.toLocaleDateString()}`
                      : selected.from.toLocaleDateString()
                    : ""
                }
                placeholder="Pick a date range"
                className="input w-full"
                onClick={() => setShowCalendar(!showCalendar)}
              />
              {showCalendar && (
                <div className="absolute z-10 mt-2 bg-white p-2 rounded-lg shadow-lg">
                  <DayPicker
                    mode="range"
                    selected={selected}
                    onSelect={setSelected}
                    numberOfMonths={2}
                  />
                </div>
              )}
            </div>

            {/* Activities */}
            <div className="flex flex-col space-y-1">
              <label htmlFor="activities" className="font-medium">
                Activities
              </label>
              <input
                type="text"
                name="activities"
                placeholder="eg. Surfing, Hiking"
                className="input w-full textarea"
                required
              />
            </div>

            {/* Submit Button */}
            <button className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer w-fit my-2">
              Save
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default AddItinerariesModal;
