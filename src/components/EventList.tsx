import axios from "axios";
import { Archive, Trash2 } from "lucide-react"; // Lucide icons
import React, { useEffect, useState } from "react";

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
}

// Demo fallback data if API fails
const fallbackEvents: Event[] = [
  {
    id: "1",
    title: "Demo Event 1",
    date: "2025-08-01",
    location: "Dhaka, Bangladesh",
  },
  {
    id: "2",
    title: "Demo Event 2",
    date: "2025-08-05",
    location: "Chattogram, Bangladesh",
  },
];

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/events`)
      .then((res) => setEvents(res.data))
      .catch(() => setEvents(fallbackEvents));
  }, []);

  const handleArchive = (id: string) => {
    console.log(`Archived event: ${id}`);
    // Optional: Implement archive logic
  };

  const handleDelete = (id: string) => {
    console.log(`Deleted event: ${id}`);
    setEvents((prev) => prev.filter((e) => e.id !== id));
    // Optional: API call to delete
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 font-roboto">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
        📅 Upcoming Events
      </h2>
      <ul className="space-y-4">
        {events.map((event) => (
          <li
            key={event.id}
            className="p-4 rounded-xl shadow-md bg-gradient-to-r from-green-100 via-white to-green-50 border border-green-200 hover:shadow-lg transition relative"
          >
            <div>
              <p className="text-xl font-medium text-gray-800">{event.title}</p>
              <p className="text-sm text-gray-600">📅 {event.date}</p>
              <p className="text-sm text-gray-600">📍 {event.location}</p>
            </div>
            <div className="absolute top-4 right-4 flex gap-3">
              <button
                onClick={() => handleArchive(event.id)}
                title="Archive"
                className="text-gray-600 hover:text-green-600 transition"
              >
                <Archive size={20} />
              </button>
              <button
                onClick={() => handleDelete(event.id)}
                title="Delete"
                className="text-gray-600 hover:text-red-600 transition"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
