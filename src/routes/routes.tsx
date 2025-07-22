import { createBrowserRouter } from "react-router-dom";
import EventScheduler from "../components/EventScheduler";
import Layout from "../Layout/Layout";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/events",
        element: <EventScheduler />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
