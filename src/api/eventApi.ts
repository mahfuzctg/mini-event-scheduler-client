import axios from "axios";
import type { Event, NewEventInput } from "../types/event";

const API_URL = import.meta.env.VITE_API_URL + "/events";

export const getEvents = async (): Promise<Event[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createEvent = async (event: NewEventInput): Promise<Event> => {
  const res = await axios.post(API_URL, event);
  return res.data;
};

export const updateEvent = async (
  id: string,
  event: Partial<Event>
): Promise<Event> => {
  const res = await axios.put(`${API_URL}/${id}`, event);
  return res.data;
};

export const deleteEvent = async (id: string) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
