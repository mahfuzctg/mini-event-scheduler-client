import React, { useState } from "react";
import type { NewEventInput } from "../types/event";

interface Props {
  onSubmit: (newEvent: NewEventInput) => void;
}

const EventForm: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [category, setCategory] = useState<"Work" | "Personal" | "Other">(
    "Other"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date || !time) {
      alert("Please fill in all required fields.");
      return;
    }

    const newEvent: NewEventInput = {
      title,
      date,
      time,
      notes,
      category,
    };

    onSubmit(newEvent);

    setTitle("");
    setDate("");
    setTime("");
    setNotes("");
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
      <select
        value={category}
        onChange={(e) =>
          setCategory(e.target.value as "Work" | "Personal" | "Other")
        }
        className="w-full border p-2 rounded"
      >
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Other">Other</option>
      </select>
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Submit
      </button>
    </form>
  );
};

export default EventForm;
