import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Image,
  FileText,
  Music,
  Video,
} from "lucide-react";

function Sidebar() {
  const menuItems = [
    { name: "Dashboard", path: "/", icon: <LayoutDashboard size={20} /> , },
    { name: "Photos", path: "/photos", icon: <Image size={20} /> },
    { name: "Documents", path: "/documents", icon: <FileText size={20} /> },
    { name: "Videos", path: "/videos", icon: <Video size={20} /> },
  ];

  return (
    <div className="bg-zinc-900 text-white w-72 h-screen shadow-xl border-r border-white/10 flex flex-col">
      {/* Logo */}
      <div className="flex items-center justify-center h-20 border-b border-white/10">
        <h1 className="text-3xl font-extrabold text-blue-400 tracking-wide">
          CloudVault
        </h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow mt-6 px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg text-base font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-gray-300 hover:bg-zinc-800 hover:text-white"
                  }`
                }
              >
                {item.icon}
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer or Logout Placeholder (optional) */}
      <div className="p-4 text-xs text-gray-500 text-center">
        © 2025 CloudVault
      </div>
    </div>
  );
}

export default Sidebar;
