# Mini Event Scheduler with AI Categorization - Frontend Setup

## Frontend (React + TypeScript + Tailwind CSS)

## Features

A sleek and responsive event scheduling application designed to simplify your daily planning. Built with React, TypeScript, and Tailwind CSS, it offers a smooth and intuitive user experience across all devices. Users can easily create, view, update, and manage events with real-time updates and automatic AI-powered categorization. The clean design ensures accessibility and ease of use for everyone.

- **Add Events**: Create new events with title, date, time, and optional notes
- **Event Management**: View, archive, and delete events
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Events are automatically sorted by date and time
- **Category Support**: Events are automatically categorized (Work, Personal, Other)
- **Error Handling**: Comprehensive error boundaries and user-friendly error messages

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Date Handling**: date-fns
- **Backend API**: Express.js (separate backend required)

## Getting Started

## 🌐 Deployment Links

### 🔸 Client (Frontend)

Vercel :  
[Frontend Live URL](https://mini-event-scheduler-client.vercel.app)

### 🔸 Server (Backend API)

Vercel:  
[Live Server URL](https://mini-event-scheduler-server-iota.vercel.app)

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running on `http://localhost:5000/api/v1`

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd mini-event-scheduler-with
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## API Endpoints

The application expects the following API endpoints to be available:

- `GET /api/v1/events` - Fetch all events
- `POST /api/v1/events` - Create a new event
- `PATCH /api/v1/events/:id` - Update an event
- `PUT /api/v1/events/:id` - Archive an event
- `DELETE /api/v1/events/:id` - Delete an event

## Event Data Structure

```typescript
interface Event {
  _id: string;
  title: string;
  date: string; // YYYY-MM-DD format
  time: string; // HH:MM format (24-hour)
  notes?: string;
  category: "Work" | "Personal" | "Other";
  archived: boolean;
  createdAt: string;
  updatedAt: string;
}
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/
│   ├── EventScheduler.tsx    # Main application component
│   ├── EventForm.tsx         # Form for creating events
│   ├── EventList.tsx         # List of events
│   └── ErrorBoundary.tsx     # Error handling component
├── services/
│   └── api.ts               # API service functions
├── types/
│   └── event.ts             # TypeScript type definitions
├── utils/
│   └── dateUtils.ts         # Date formatting utilities using date-fns
├── routers/
│   └── routes.tsx           # Application routing
└── App.tsx                  # Root component
```

## Features in Detail

### Event Form

- Required fields: Title, Date, Time
- Optional field: Notes (max 500 characters)
- Real-time validation
- Auto-reset after successful submission

### Event List

- Displays events sorted by date and time
- Shows event details: title, date, time, notes, category
- Archive/unarchive functionality
- Delete functionality
- Responsive design with proper spacing

### Error Handling

- Error boundaries for React errors
- API error handling with user-friendly messages
- Graceful handling of missing or invalid data

### Date & Time Features

- Smart date formatting (Today, Tomorrow, Yesterday, or full date)
- 12-hour time format with AM/PM
- Past event detection with visual indicators
- Relative time descriptions
- Robust date parsing and validation using date-fns

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
