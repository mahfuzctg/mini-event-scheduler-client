import EventForm from "../components/EventForm";
import { useEvents } from "../hooks/useEvents";

const EventsPage = () => {
  const { events, addEvent, removeEvent, editEvent } = useEvents();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add a New Event</h1>
      <EventForm onSubmit={addEvent} />

      <div className="mt-10">
        <h2 className="text-xl font-bold mb-2">All Events</h2>
        {events.map((event) => (
          <div key={event.id} className="mb-4 p-4 border rounded shadow">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{event.title}</h3>
                <p className="text-sm text-gray-600">
                  {event.date} at {event.time}
                </p>
                <p className="text-sm">{event.notes}</p>
              </div>
              <div className="flex gap-2">
                {!event.isArchived && (
                  <button
                    onClick={() => editEvent(event.id, { isArchived: true })}
                    className="text-yellow-600 hover:underline"
                  >
                    Archive
                  </button>
                )}
                <button
                  onClick={() => removeEvent(event.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
