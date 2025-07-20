import React, { useEffect, useState } from "react";

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
}

const demoEvents: Event[] = [
  {
    id: "1",
    title: "Tech Conference 2025",
    date: "2025-08-15",
    location: "Dhaka, Bangladesh",
  },
  {
    id: "2",
    title: "AI & Future",
    date: "2025-09-05",
    location: "Chittagong, Bangladesh",
  },
  {
    id: "3",
    title: "Startup Meetup",
    date: "2025-10-01",
    location: "Sylhet, Bangladesh",
  },
];

const EventCard: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${apiUrl}/events`);
        if (!response.ok) throw new Error("API Error");
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events, loading demo data:", error);
        setEvents(demoEvents); // Fallback to demo data
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [apiUrl]);

  if (loading) return <p className="text-gray-600">Loading events...</p>;

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <div
          key={event.id}
          className="border rounded p-4 shadow hover:shadow-lg transition duration-200"
        >
          <h2 className="text-xl font-semibold">{event.title}</h2>
          <p className="text-gray-600">{event.date}</p>
          <p className="text-gray-500">{event.location}</p>
        </div>
      ))}
    </div>
  );
};

export default EventCard;
