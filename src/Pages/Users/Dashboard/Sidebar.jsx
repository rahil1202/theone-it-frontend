import React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  User,
  Settings,
  Calendar,
  Home as HomeIcon,
  Menu,
  X,
} from "lucide-react";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const menuItems = [
    { name: "Home", icon: <HomeIcon className="w-5 h-5" />, path: "/dashboard/home" },
    { name: "Profile", icon: <User className="w-5 h-5" />, path: "/dashboard/profile" },
    { name: "Attendance", icon: <Calendar className="w-5 h-5" />, path: "/dashboard/attendance" },
    { name: "Settings", icon: <Settings className="w-5 h-5" />, path: "/dashboard/settings" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-gray-900 text-white h-full ${
          isSidebarOpen ? "w-64" : "w-16"
        } transition-all duration-300`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4">
          <h2
            className={`text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent ${
              isSidebarOpen ? "block" : "hidden"
            }`}
          >
            Dashboard
          </h2>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-yellow-400"
          >
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex flex-col mt-8 space-y-4">
          {menuItems.map((item, index) => (
            <Link
              to={item.path}
              key={index}
              className="flex items-center px-4 py-2 text-sm font-medium hover:bg-gray-700 rounded-md transition"
            >
              {item.icon}
              <span className={`${isSidebarOpen ? "ml-4" : "hidden"}`}>
                {item.name}
              </span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
