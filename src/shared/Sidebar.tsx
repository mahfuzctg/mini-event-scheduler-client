import {
  BarChart,
  Calendar,
  ClipboardList,
  Home,
  PlusCircle,
} from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  {
    name: "Dashboard",
    path: "",
    icon: <Home className="w-6 h-6" />,
    clickable: false,
  },
  {
    name: "All Events",
    path: "/events",
    icon: <Calendar className="w-6 h-6" />,
    clickable: true,
  },
  {
    name: "Create Event",
    path: "",
    icon: <PlusCircle className="w-6 h-6" />,
    clickable: false,
  },
  {
    name: "Categories",
    path: "",
    icon: <ClipboardList className="w-6 h-6" />,
    clickable: false,
  },
];

const Sidebar: React.FC = () => {
  return (
    <aside className="bg-gradient-to-b from-white via-gray-100 to-gray-200 text-gray-700 w-64 min-h-screen p-6 flex flex-col shadow-xl">
      {/* Logo / Brand */}
      <div className="mb-12 flex items-center space-x-3">
        <BarChart className="w-8 h-8 text-[#5850FB] drop-shadow-md" />
        <h1 className="text-2xl font-extrabold tracking-wide select-none text-gray-900">
          Event Scheduler
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className="space-y-5">
          {navItems.map(({ name, path, icon, clickable }) =>
            clickable ? (
              <li key={name}>
                <NavLink
                  to={path}
                  end
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-semibold transition-all duration-250
                    ${
                      isActive
                        ? "bg-[#5850FB] shadow-lg text-white"
                        : "hover:bg-[#D9D9FF] hover:text-[#5850FB] text-gray-700"
                    }`
                  }
                >
                  {React.cloneElement(icon, {
                    className: `w-6 h-6 ${
                      window.location.pathname === path
                        ? "text-white"
                        : "text-[#5850FB]"
                    }`,
                  })}
                  <span>{name}</span>
                </NavLink>
              </li>
            ) : (
              <li
                key={name}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-semibold text-gray-400 cursor-not-allowed select-none relative group"
                title="Demo only - not clickable"
              >
                {icon}
                <span>{name}</span>

                {/* Tooltip */}
                <span className="absolute left-full top-1/2 -translate-y-1/2 ml-3 whitespace-nowrap rounded bg-[#5850FB] px-2 py-1 text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  Demo only
                </span>
              </li>
            )
          )}
        </ul>
      </nav>

      {/* Footer */}
      <div className="mt-auto text-xs text-gray-400 select-none">
        &copy; {new Date().getFullYear()} Mini Event Scheduler
      </div>
    </aside>
  );
};

export default Sidebar;
