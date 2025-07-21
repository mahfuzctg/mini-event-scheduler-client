import { useEffect, useState } from "react";
import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from "../api/eventApi";
import type { Event, NewEventInput } from "../types/event";

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (err) {
        console.error("Failed to load events", err);
      }
    };
    fetchEvents();
  }, []);

  const addEvent = async (event: NewEventInput) => {
    const newEvent = await createEvent(event);
    setEvents((prev) => [...prev, newEvent]);
  };

  const editEvent = async (id: string, event: Partial<Event>) => {
    const updated = await updateEvent(id, event);
    setEvents((prev) => prev.map((e) => (e.id === id ? updated : e)));
  };

  const removeEvent = async (id: string) => {
    await deleteEvent(id);
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return { events, addEvent, editEvent, removeEvent };
};
