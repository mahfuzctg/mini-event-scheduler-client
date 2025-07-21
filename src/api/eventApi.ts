import axios from "axios";
import type { Event } from "../types/event";

const API_URL = "http://localhost:5000/api/events";

export const getEvents = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createEvent = async (event: Omit<Event, "_id">) => {
  const response = await axios.post(API_URL, event);
  return response.data;
};

export const updateEvent = async (id: string, event: Partial<Event>) => {
  const response = await axios.put(`${API_URL}/${id}`, event);
  return response.data;
};

export const deleteEvent = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
