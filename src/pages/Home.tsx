import EventCard from "../components/EventCard";

const Home = () => {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Event Scheduler</h1>
      <EventCard />
    </div>
  );
};

export default Home;
