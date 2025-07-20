import React, { useEffect, useState } from "react";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  notes?: string;
  category: "Work" | "Personal" | "Other";
  archived: boolean;
}

const demoEvents: Event[] = [
  {
    id: "1",
    title: "Team Meeting",
    date: "2025-07-21",
    time: "10:00",
    notes: "Discuss project roadmap",
    category: "Work",
    archived: false,
  },
  {
    id: "2",
    title: "Mom’s Birthday",
    date: "2025-07-22",
    time: "18:30",
    notes: "",
    category: "Personal",
    archived: false,
  },
  {
    id: "3",
    title: "Read a book",
    date: "2025-07-23",
    time: "20:00",
    notes: "Start “Atomic Habits”",
    category: "Other",
    archived: true,
  },
];

const EventCard: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${apiUrl}/events`);
        if (!res.ok) throw new Error("API failed");
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.warn("Using demo events due to error:", err);
        setEvents(demoEvents);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [apiUrl]);

  const handleDelete = async (id: string) => {
    try {
      await fetch(`${apiUrl}/events/${id}`, { method: "DELETE" });
      setEvents((prev) => prev.filter((event) => event.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleArchive = async (id: string) => {
    try {
      await fetch(`${apiUrl}/events/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ archived: true }),
      });
      setEvents((prev) =>
        prev.map((event) =>
          event.id === id ? { ...event, archived: true } : event
        )
      );
    } catch (err) {
      console.error("Archive failed:", err);
    }
  };

  if (loading)
    return <p className="text-center text-gray-500">Loading events...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {events.map((event) => (
        <div
          key={event.id}
          className={`rounded-xl border shadow-md p-5 transition-transform hover:scale-[1.01] ${
            event.archived ? "bg-gray-100 opacity-80" : "bg-white"
          }`}
        >
          <div className="mb-2 flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-800">
              {event.title}
            </h3>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                event.category === "Work"
                  ? "bg-blue-100 text-blue-700"
                  : event.category === "Personal"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {event.category}
            </span>
          </div>
          <p className="text-gray-600 text-sm">
            📅 {event.date} &nbsp;&nbsp; ⏰ {event.time}
          </p>
          {event.notes && (
            <p className="mt-2 text-gray-700 text-sm">📝 {event.notes}</p>
          )}
          <div className="mt-4 flex gap-3">
            {!event.archived && (
              <button
                onClick={() => handleArchive(event.id)}
                className="text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded hover:bg-yellow-200"
              >
                Archive
              </button>
            )}
            <button
              onClick={() => handleDelete(event.id)}
              className="text-sm bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventCard;
