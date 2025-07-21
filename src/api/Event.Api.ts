import type { CreateEventData, Event, UpdateEventData } from "../types/event";

// const API_BASE_URL = "http://localhost:5000/api/v1";
const API_BASE_URL = "https://mini-event-with-ai.vercel.app/api/v1";

export const eventApi = {
  // Get all events
  /**
   * Fetch all events from the API with support for search, sorting, and pagination.
   * @param params Optional query parameters: searchTerm, page, limit
   * @returns An object with meta and result (array of events)
   */
  getAllEvents: async (params?: {
    searchTerm?: string;
    page?: number;
    limit?: number;
  }): Promise<{
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      totalPage: number;
    };
    result: Event[];
  }> => {
    // Build query string from params
    let query = "";
    if (params) {
      const searchParams = new URLSearchParams();
      if (params.searchTerm)
        searchParams.append("searchTerm", params.searchTerm);
      if (params.page) searchParams.append("page", params.page.toString());
      if (params.limit) searchParams.append("limit", params.limit.toString());
      query = `?${searchParams.toString()}`;
    }
    const response = await fetch(`${API_BASE_URL}/events${query}`);
    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }
    // Expecting { meta, result } from backend
    return response.json();
  },

  // Search events
  /**
   * Search events by title, notes, or other criteria
   * @param searchTerm The search term to look for
   * @param category Optional category filter
   * @param includeArchived Whether to include archived events
   * @returns An object with meta and result (array of events)
   */
  searchEvents: async (params: {
    searchTerm?: string;
    category?: string;
    includeArchived?: boolean;
    page?: number;
    limit?: number;
  }): Promise<{
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      totalPage: number;
    };
    result: Event[];
  }> => {
    const searchParams = new URLSearchParams();

    if (params.searchTerm) {
      searchParams.append("searchTerm", params.searchTerm);
    }
    if (params.category && params.category !== "all") {
      searchParams.append("category", params.category);
    }
    if (params.includeArchived !== undefined) {
      searchParams.append("includeArchived", params.includeArchived.toString());
    }
    if (params.page) {
      searchParams.append("page", params.page.toString());
    }
    if (params.limit) {
      searchParams.append("limit", params.limit.toString());
    }

    const query = searchParams.toString() ? `?${searchParams.toString()}` : "";
    const response = await fetch(`${API_BASE_URL}/events${query}`);

    if (!response.ok) {
      throw new Error("Failed to search events");
    }

    return response.json();
  },

  // Create a new event
  createEvent: async (eventData: CreateEventData): Promise<Event> => {
    const response = await fetch(`${API_BASE_URL}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });
    if (!response.ok) {
      throw new Error("Failed to create event");
    }
    return response.json();
  },

  // Update an event
  updateEvent: async (
    id: string,
    eventData: UpdateEventData
  ): Promise<Event> => {
    const response = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });
    if (!response.ok) {
      throw new Error("Failed to update event");
    }
    return response.json();
  },

  // Archive an event
  archiveEvent: async (id: string): Promise<Event> => {
    const response = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to archive event");
    }
    return response.json();
  },

  // Delete an event
  deleteEvent: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete event");
    }
  },
};
