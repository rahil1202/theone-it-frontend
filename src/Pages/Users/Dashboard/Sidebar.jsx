import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {  Settings, CalendarPlus, CalendarOff ,HistoryIcon, Home as HomeIcon, Menu, X, LogOut } from "lucide-react";
import { useAuth } from "../../../Contexts/AuthContext";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    { name: "Home", icon: <HomeIcon className="w-5 h-5" />, path: "/dashboard/home" },
    // { name: "Profile", icon: <User className="w-5 h-5" />, path: "/dashboard/profile" },
    { name: "Attendance", icon: <CalendarPlus className="w-5 h-5" />, path: "/dashboard/attendance" },    
    { name: "History", icon: <HistoryIcon className="w-5 h-5" />, path: "/dashboard/history" },
    { name: "Holidays", icon: <CalendarOff className="w-5 h-5" />, path: "/dashboard/holidays" },
    { name: "Settings", icon: <Settings className="w-5 h-5" />, path: "/dashboard/settings" },
    
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    // Automatically close the sidebar after 1.5 seconds
    if (!isSidebarOpen) {
      setTimeout(() => {
        setIsSidebarOpen(false);
      }, 1500); // Close after 1.5 seconds
    }
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200 shadow-xl h-full top-0 left-0 z-50
          ${isSidebarOpen ? "w-64" : "w-20 overflow-hidden"} 
          transition-all duration-300 ease-in-out flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
          <h2
            className={`font-bold text-gray-100 text-lg transition-opacity duration-300
              ${isSidebarOpen ? "opacity-100" : "opacity-0 w-0"}`}
          >
            Dashboard
          </h2>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            {isSidebarOpen ? (
              <X className="w-6 h-6 text-gray-300" />
            ) : (
              <Menu className="w-6 h-6 text-gray-300" />
            )}
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 p-4 space-y-3">
          {menuItems.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              onClick={() => setIsSidebarOpen(false)} // Close the sidebar when navigating
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-lg transition-all duration-200 group
                ${
                  isActive
                    ? "bg-gray-700 text-white"
                    : "text-gray-400 hover:bg-gray-700 hover:text-white"
                }`
              }
            >
              <div
                className={`${
                  isSidebarOpen
                    ? "text-gray-300"
                    : "text-gray-400"
                } transition-colors duration-100`}
              >
                {item.icon}
              </div>
              <span
                className={`ml-3 font-medium text-sm ${
                  isSidebarOpen ? "opacity-100" : "opacity-0 w-0"
                } transition-all duration-200`}
              >
                {item.name}
              </span>
            </NavLink>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className={`flex items-center w-full px-4 py-3 text-sm font-medium text-gray-200
              transition-all hover:bg-red-600 hover:text-white ${
                isSidebarOpen ? "justify-start" : "justify-center"
              }`}
          >
            <LogOut className="w-5 h-5" />
            {isSidebarOpen && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      {/* <div
        className={`flex-1 bg-gray-100 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        {/* Add your main content here */}
      {/* </div> */} 
    </>
  );
};

export default Sidebar;
