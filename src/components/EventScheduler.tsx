import { isValid } from "date-fns";
import React, { useEffect, useState } from "react";

import type { CreateEventData, Event } from "../types/event";

import { parseISO } from "date-fns/parseISO";
import { EventApi } from "../api/Event.Api";
import EventForm from "./EventForm";
import EventList from "./EventList";

const EventScheduler: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await EventApi.getAllEvents();
      const fetchedEvents = response.result;

      const sortedEvents = fetchedEvents.sort((a, b) => {
        const dateA = parseISO(`${a.date || ""}T${a.time || ""}`);
        const dateB = parseISO(`${b.date || ""}T${b.time || ""}`);
        if (!isValid(dateA) || !isValid(dateB)) return 0;
        return dateA.getTime() - dateB.getTime();
      });

      setEvents(sortedEvents);
      setError(null);
    } catch (err) {
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = async (eventData: CreateEventData) => {
    try {
      const newEvent = await EventApi.createEvent(eventData);
      setEvents((prev) =>
        [...prev, newEvent].sort(
          (a, b) =>
            parseISO(`${a.date}T${a.time}`).getTime() -
            parseISO(`${b.date}T${b.time}`).getTime()
        )
      );
    } catch (err) {
      console.error("Error creating event:", err);
      setError("Failed to create event");
    }
  };

  const handleUpdateEvent = async (id: string, eventData: Partial<Event>) => {
    try {
      const updatedEvent = await EventApi.updateEvent(id, eventData);
      setEvents((prev) =>
        prev.map((e) =>
          e.data._id === id || e.data.id === id ? updatedEvent : e
        )
      );
    } catch (err) {
      console.error("Error updating event:", err);
      setError("Failed to update event");
    }
  };

  const handleArchiveEvent = async (id: string) => {
    try {
      const updatedEvent = await EventApi.archiveEvent(id);
      setEvents((prev) =>
        prev.map((e) =>
          e.data._id === id || e.data.id === id ? updatedEvent : e
        )
      );
    } catch (err) {
      console.error("Error archiving event:", err);
      setError("Failed to archive event");
    }
  };

  const handleDeleteEvent = async (id: string) => {
    try {
      await EventApi.deleteEvent(id);
      setEvents((prev) =>
        prev.filter((e) => e.data._id !== id && e.data.id !== id)
      );
    } catch (err) {
      console.error("Error deleting event:", err);
      setError("Failed to delete event");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-indigo-600 font-medium">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr  py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl uppercase font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow-md">
            Event Scheduler
          </h1>
          <p className="text-gray-600 mt-2 text-lg font-light">
            Simplify your event planning and boost productivity.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow">
            {error}
          </div>
        )}

        {/* Form Section */}
        <div className="mb-12 bg-gradient-to-tr from-white via-slate-50 to-white rounded-xl shadow-xl p-6 border border-gray-100">
          <h2 className="text-xl uppercase font-semibold text-indigo-700 mb-6">
            Create A Event
          </h2>
          <EventForm onSubmit={handleCreateEvent} />
        </div>

        {/* Event List Section */}
        <div>
          <EventList
            events={events}
            onArchive={handleArchiveEvent}
            onDelete={handleDeleteEvent}
            onUpdate={handleUpdateEvent}
          />
        </div>
      </div>
    </div>
  );
};

export default EventScheduler;
