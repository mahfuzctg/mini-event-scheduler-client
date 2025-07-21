import EventForm from "../components/EventForm";
import { useEvents } from "../hooks/useEvents";

const EventsPage = () => {
  const { addEvent } = useEvents();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add a New Event</h1>
      <EventForm onSubmit={addEvent} />
    </div>
  );
};

export default EventsPage;
