import React from "react";
import EventForm from "../components/EventForm";
import type { CreateEventData } from "../types/event";

interface FormEventProps {
  onCreate: (data: CreateEventData) => void;
}

const FormEvent: React.FC<FormEventProps> = ({ onCreate }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Add New Event
      </h2>
      <EventForm onSubmit={onCreate} />
    </div>
  );
};

export default FormEvent;
