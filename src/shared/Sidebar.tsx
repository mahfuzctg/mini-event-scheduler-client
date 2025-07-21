import {
  Bars3Icon,
  CalendarIcon,
  ClipboardDocumentListIcon,
  HomeIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: <HomeIcon className="w-6 h-6" />,
  },
  {
    name: "All Events",
    path: "/events",
    icon: <CalendarIcon className="w-6 h-6" />,
  },
  {
    name: "Create Event",
    path: "/create",
    icon: <PlusCircleIcon className="w-6 h-6" />,
  },
  {
    name: "Categories",
    path: "/categories",
    icon: <ClipboardDocumentListIcon className="w-6 h-6" />,
  },
];

const Sidebar: React.FC = () => {
  return (
    <aside className="bg-gradient-to-b from-purple-800 via-indigo-900 to-blue-900 text-white w-64 min-h-screen p-6 flex flex-col">
      {/* Logo / Brand */}
      <div className="mb-10 flex items-center space-x-3">
        <Bars3Icon className="w-8 h-8 text-pink-400" />
        <h1 className="text-2xl font-bold tracking-wide">Event Scheduler</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className="space-y-4">
          {navItems.map(({ name, path, icon }) => (
            <li key={name}>
              <NavLink
                to={path}
                end
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md transition-colors duration-200
                  ${
                    isActive
                      ? "bg-pink-500 text-white shadow-lg"
                      : "hover:bg-indigo-700 hover:text-pink-300 text-indigo-200"
                  }`
                }
              >
                {icon}
                <span className="font-medium">{name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer / Optional */}
      <div className="mt-auto text-sm text-indigo-300">
        &copy; {new Date().getFullYear()} Mini Event Scheduler
      </div>
    </aside>
  );
};

export default Sidebar;
