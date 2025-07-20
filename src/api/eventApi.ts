import axios from "axios";
import type { Event } from "../types/event";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const getEvents = async (): Promise<Event[]> => {
  const res = await axios.get(`${API_URL}/events`);
  return res.data;
};

export const createEvent = async (event: Omit<Event, "id" | "category">) => {
  const res = await axios.post(`${API_URL}/events`, event);
  return res.data;
};

export const deleteEvent = async (id: string) => {
  await axios.delete(`${API_URL}/events/${id}`);
};

export const archiveEvent = async (id: string) => {
  await axios.put(`${API_URL}/events/${id}`);
};
