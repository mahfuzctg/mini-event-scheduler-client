import { Calendar, ClipboardList, Clock, MapPin } from "lucide-react";
import React, { useState } from "react";

const EventForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    // You can integrate this with API here
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-gradient-to-br from-white via-gray-100 to-gray-200 p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Create New Event
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div className="flex items-center border-b border-gray-300 focus-within:border-green-600">
          <ClipboardList className="text-gray-500 mr-3" />
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            className="w-full bg-transparent py-2 outline-none"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Date */}
        <div className="flex items-center border-b border-gray-300 focus-within:border-green-600">
          <Calendar className="text-gray-500 mr-3" />
          <input
            type="date"
            name="date"
            className="w-full bg-transparent py-2 outline-none"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        {/* Time */}
        <div className="flex items-center border-b border-gray-300 focus-within:border-green-600">
          <Clock className="text-gray-500 mr-3" />
          <input
            type="time"
            name="time"
            className="w-full bg-transparent py-2 outline-none"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>

        {/* Location */}
        <div className="flex items-center border-b border-gray-300 focus-within:border-green-600">
          <MapPin className="text-gray-500 mr-3" />
          <input
            type="text"
            name="location"
            placeholder="Event Location"
            className="w-full bg-transparent py-2 outline-none"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div className="border border-gray-300 rounded-md focus-within:border-green-600">
          <textarea
            name="description"
            placeholder="Event Description..."
            rows={4}
            className="w-full bg-transparent p-2 outline-none resize-none"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-green-500 to-green-700 text-white hover:from-green-600 hover:to-green-800 transition"
          >
            Submit Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
