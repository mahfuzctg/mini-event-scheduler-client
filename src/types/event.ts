export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  notes?: string;
  category: "Work" | "Personal" | "Other";
  isArchived: boolean;
}

export type NewEventInput = Omit<Event, "id" | "isArchived">;
