import React, { useState, useEffect } from "react";
import { Clock, LogIn, LogOut, Coffee, StopCircle, Timer } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Attendance = () => {
  const [status, setStatus] = useState("");
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [totalRecessDuration, setTotalRecessDuration] = useState("0 minutes");
  const [totalWorkingTime, setTotalWorkingTime] = useState("0 minutes");
  const [liveWorkingTime, setLiveWorkingTime] = useState("0 minutes");
  const [loading, setLoading] = useState(false);

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchAttendanceStatus = async () => {
    try {
      const response = await fetch(`${BASE_URL}/attendance/status`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (!response.ok) throw new Error("Failed to fetch attendance status");

      const { data } = await response.json();
      setStatus(data.status || "No status available");
      setCheckInTime(data.checkInTime);
      setCheckOutTime(data.checkOutTime);
      setTotalRecessDuration(data.totalRecessDuration || "0 minutes");
      setTotalWorkingTime(data.totalWorkingTime || "0 minutes");
      setLiveWorkingTime(data.liveWorkingTime || "0 minutes");
    } catch (error) {
      console.error("Error fetching attendance status:", error);
      toast.error(error.message || "Failed to fetch attendance status.");
    }
  };

  const handleAttendanceAction = async (action) => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/attendance/${action}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || `Failed to ${action}`);
      }

      const { attendance, message } = await response.json();

      setStatus(attendance.currentStatus || "No status available");
      setCheckInTime(attendance.checkInTime);
      setCheckOutTime(attendance.checkOutTime);
      setTotalRecessDuration(
        attendance.totalRecessDuration
          ? `${Math.floor(attendance.totalRecessDuration / 60000)} minutes`
          : "0 minutes"
      );

      setLiveWorkingTime(attendance.liveWorkingTime || "0 minutes");

      const totalWorkingTime =
        attendance.checkOutTime && attendance.checkInTime
          ? `${Math.floor(
              (new Date(attendance.checkOutTime) -
                new Date(attendance.checkInTime) -
                (attendance.totalRecessDuration || 0)) /
                3600000
            )} hours ${Math.floor(
              ((new Date(attendance.checkOutTime) -
                new Date(attendance.checkInTime) -
                (attendance.totalRecessDuration || 0)) %
                3600000) /
                60000
            )} minutes`
          : "0 minutes";

      setTotalWorkingTime(totalWorkingTime);
      toast.success(message || `${action} successful`);
    } catch (error) {
      console.error(`Error during ${action}:`, error.message);
      toast.error(error.message || `Failed to ${action}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  // Update live working time every minute if user is checked in
  useEffect(() => {
    if (status === "Checked In") {
      const interval = setInterval(() => {
        fetchAttendanceStatus();
      }, 60000);
      return () => clearInterval(interval);
    }
  }, [status]);

  useEffect(() => {
    fetchAttendanceStatus();
  }, []);

  const getStatusColor = () => {
    switch (status) {
      case "Checked In":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "Checked Out":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      case "In Recess":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  const isDisabled = (buttonStatus) => {
    if (status === "In Recess") {
      // When in recess, disable all buttons except "End Recess"
      return buttonStatus !== "end-recess";
    }

    if (status !== "Checked In" && buttonStatus !== "checkin") {
      // If not checked in, disable all buttons except "Check In"
      return true;
    }

    if (buttonStatus === "checkin" && status === "Checked In") {
      // Disable "Check In" if already checked in
      return true;
    }

    if (buttonStatus === "checkout" && (status === "Checked Out" || status === "In Recess")) {
      // Disable "Check Out" if already checked out or in recess
      return true;
    }

    if (buttonStatus === "start-recess" && (status === "Checked Out" || status === "In Recess")) {
      // Disable "Start Break" if checked out or in recess
      return true;
    }

    if (buttonStatus === "end-recess" && status !== "In Recess") {
      // Disable "End Break" if not in recess
      return true;
    }

    return false;
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Clock className="w-8 h-8 text-indigo-500" />
            Attendance Dashboard
          </h1>
          <div
            className={`px-4 py-2 rounded-full border transform transition-all duration-300 ${getStatusColor()}`}
          >
            <span className="font-semibold">{status || "No Status"}</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 backdrop-blur-lg hover:scale-105 transform transition-all duration-300">
            <LogIn className="w-5 h-5 text-emerald-500 mb-2" />
            <h3 className="text-lg font-semibold text-gray-200">Check-in Time</h3>
            <p className="text-gray-400">
              {checkInTime ? new Date(checkInTime).toLocaleString() : "Not checked in"}
            </p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 backdrop-blur-lg hover:scale-105 transform transition-all duration-300">
            <LogOut className="w-5 h-5 text-red-500 mb-2" />
            <h3 className="text-lg font-semibold text-gray-200">Check-out Time</h3>
            <p className="text-gray-400">
              {checkOutTime ? new Date(checkOutTime).toLocaleString() : "Not checked out"}
            </p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 backdrop-blur-lg hover:scale-105 transform transition-all duration-300">
            <Coffee className="w-5 h-5 text-amber-500 mb-2" />
            <h3 className="text-lg font-semibold text-gray-200">Break Duration</h3>
            <p className="text-gray-400">{totalRecessDuration}</p>
          </div>
        </div>

        {/* Live Working Time */}
        <div className="mt-8 bg-gray-800 rounded-xl p-6 border border-gray-700 backdrop-blur-lg hover:scale-105 transform transition-all duration-300">
          <Timer className="w-5 h-5 text-indigo-500 mb-2" />
          <h3 className="text-lg font-semibold text-gray-200">Live Working Time</h3>
          <p className="text-gray-400">{liveWorkingTime}</p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {["checkin", "checkout", "start-recess", "end-recess"].map((action) => (
            <button
              key={action}
              onClick={() => handleAttendanceAction(action)}
              disabled={isDisabled(action)}
              className={`p-4 rounded-xl border border-gray-700 transform transition-all duration-300 ${
                isDisabled(action)
                  ? "bg-gray-800 text-gray-500 opacity-50 cursor-not-allowed"
                  : "bg-gray-800 hover:bg-gray-700 text-indigo-500 hover:scale-105 hover:border-indigo-500/50"
              }`}
            >
              {action === "checkin" && <LogIn className="w-6 h-6" />}
              {action === "checkout" && <LogOut className="w-6 h-6" />}
              {action === "start-recess" && <Coffee className="w-6 h-6" />}
              {action === "end-recess" && <StopCircle className="w-6 h-6" />}
              <span className="text-sm font-medium capitalize">{action.replace("-", " ")}</span>
            </button>
          ))}
        </div>
      </div>
      <ToastContainer theme="dark" position="top-right" pauseOnHover={false} limit={1} />
    </div>
  );
};

export default Attendance;
