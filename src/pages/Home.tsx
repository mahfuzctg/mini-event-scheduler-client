/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { getEvents } from "../api/eventApi";
import type { Event } from "../types/event";

const Home = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    getEvents().then(setEvents);
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Event Scheduler</h1>
      {/* Map events here */}
    </div>
  );
};

export default Home;
