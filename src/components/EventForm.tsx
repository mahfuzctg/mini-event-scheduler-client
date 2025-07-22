import React, { useState } from "react";
import type { CreateEventData } from "../types/event";

interface EventFormProps {
  onSubmit: (eventData: CreateEventData) => void;
  onDelete?: (id: string) => void;
  eventToEdit?: {
    id: string;
    title: string;
    date: string;
    time: string;
    notes?: string;
  } | null;
  isEditing?: boolean;
}

const EventForm: React.FC<EventFormProps> = ({
  onSubmit,
  onDelete,
  eventToEdit,
  isEditing = false,
}) => {
  const [formData, setFormData] = useState<CreateEventData>({
    title: eventToEdit?.title || "",
    date: eventToEdit?.date || "",
    time: eventToEdit?.time || "",
    notes: eventToEdit?.notes || "",
  });
  const [errors, setErrors] = useState<Partial<CreateEventData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<CreateEventData> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length > 100) {
      newErrors.title = "Title cannot exceed 100 characters";
    }

    if (!formData.date) {
      newErrors.date = "Date is required";
    }

    if (!formData.time) {
      newErrors.time = "Time is required";
    }

    if (formData.notes && formData.notes.length > 500) {
      newErrors.notes = "Notes cannot exceed 500 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      if (!isEditing) {
        setFormData({ title: "", date: "", time: "", notes: "" });
        setErrors({});
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (eventToEdit && onDelete) {
      if (
        window.confirm(
          "Are you sure you want to delete this event? This action cannot be undone."
        )
      ) {
        try {
          await onDelete(eventToEdit.id);
        } catch (error) {
          console.error("Error deleting event:", error);
        }
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof CreateEventData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Title <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleInputChange}
          maxLength={100}
          placeholder="Enter event title"
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.title ? "border-red-300" : "border-gray-300"
          }`}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title}</p>
        )}
      </div>

      {/* Date */}
      <div>
        <label
          htmlFor="date"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Date <span className="text-red-500">*</span>
        </label>
        <input
          id="date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.date ? "border-red-300" : "border-gray-300"
          }`}
        />
        {errors.date && (
          <p className="mt-1 text-sm text-red-600">{errors.date}</p>
        )}
      </div>

      {/* Time */}
      <div>
        <label
          htmlFor="time"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Time <span className="text-red-500">*</span>
        </label>
        <input
          id="time"
          name="time"
          type="time"
          value={formData.time}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.time ? "border-red-300" : "border-gray-300"
          }`}
        />
        {errors.time && (
          <p className="mt-1 text-sm text-red-600">{errors.time}</p>
        )}
      </div>

      {/* Notes */}
      <div>
        <label
          htmlFor="notes"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Notes <span className="text-gray-400">(optional)</span>
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          maxLength={500}
          value={formData.notes}
          onChange={handleInputChange}
          placeholder="Add any additional notes..."
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.notes ? "border-red-300" : "border-gray-300"
          }`}
        />
        {errors.notes && (
          <p className="mt-1 text-sm text-red-600">{errors.notes}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          {formData.notes?.length || 0}/500 characters
        </p>
      </div>

      {/* Category (Display Only) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm text-gray-600">
          Auto-populated by backend (Work, Personal, or Other)
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-[#5B4DFB] text-white py-2 px-4 rounded-md 
      hover:bg-[#3a2d8a] 
      focus:outline-none focus:ring-2 focus:ring-[#4b3aaf] focus:ring-offset-2 
      disabled:opacity-50 disabled:cursor-not-allowed 
      transition-colors duration-300 ease-in-out"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              {isEditing ? "Updating Event..." : "Creating Event..."}
            </div>
          ) : isEditing ? (
            "Update Event"
          ) : (
            "Create Event"
          )}
        </button>

        {isEditing && eventToEdit && onDelete && (
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
            title="Delete event"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        )}
      </div>
    </form>
  );
};

export default EventForm;
