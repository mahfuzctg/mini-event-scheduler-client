import React, { useEffect, useState } from "react";
import type { EventType } from "../types/event";

interface Props {
  onAddEvent: (newEvent: EventType) => void;
}

const EventForm: React.FC<Props> = ({ onAddEvent }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [category, setCategory] = useState<"Work" | "Personal" | "Other">(
    "Other"
  );

  useEffect(() => {
    // Simulate fetching from backend
    const fetchCategory = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/category`);
        const data = await res.json();
        setCategory(data.category);
      } catch {
        setCategory("Other");
      }
    };
    fetchCategory();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date || !time) {
      alert("Please fill in all required fields.");
      return;
    }

    const newEvent: EventType = {
      id: crypto.randomUUID(),
      title,
      date,
      time,
      notes,
      category,
      isArchived: false,
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      });
      if (!res.ok) throw new Error();

      onAddEvent(newEvent);
      setTitle("");
      setDate("");
      setTime("");
      setNotes("");
    } catch {
      alert("Failed to create event. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 shadow-lg rounded-md space-y-4 w-full max-w-xl mx-auto"
    >
      <h2 className="text-xl font-bold text-gray-800">Add New Event</h2>
      <input
        type="text"
        placeholder="Title *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <textarea
        placeholder="Notes (optional)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="w-full border p-2 rounded"
      ></textarea>
      <div className="text-sm text-gray-600">
        Category: <span className="font-semibold">{category}</span>
      </div>
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white py-2 rounded hover:opacity-90"
      >
        Submit
      </button>
    </form>
  );
};

export default EventForm;
