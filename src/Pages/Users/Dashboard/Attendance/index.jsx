import React, { useState, useEffect } from "react";
import { Clock, LogIn, LogOut, Coffee, StopCircle, Timer, Calendar, Users } from "lucide-react";
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
  const [showDialog, setShowDialog] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [checkoutTimeout, setCheckoutTimeout] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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
    if (action === "checkout") {
      setShowDialog(true);
      setTimeLeft(10);
      return;
    }

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

  const initiateCheckout = () => {
    const timeout = setTimeout(() => {
      handleAttendanceAction("checkout");
      setShowDialog(false);
    }, 10000);
    
    setCheckoutTimeout(timeout);
    toast.info("Checkout will be processed in 10 seconds. Click 'Cancel' to undo.", {
      autoClose: 10000,
    });
  };

  const cancelCheckout = () => {
    clearTimeout(checkoutTimeout);
    setShowDialog(false);
    setTimeLeft(10);
    toast.info("Checkout canceled.");
  };

  useEffect(() => {
    let timer;
    if (showDialog && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [showDialog, timeLeft]);

  useEffect(() => {
    if (showDialog) {
      initiateCheckout();
    }
    return () => {
      if (checkoutTimeout) {
        clearTimeout(checkoutTimeout);
      }
    };
  }, [showDialog]);

  useEffect(() => {
    if (status === "Checked In") {
      const interval = setInterval(() => {
        fetchAttendanceStatus();
      }, 120000);
      return () => clearInterval(interval);
    }
  }, [status]);

  useEffect(() => {
    fetchAttendanceStatus();
  }, []);

  const getStatusColor = () => {
    switch (status) {
      case "Checked In":
        return "bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/50";
      case "Checked Out":
        return "bg-red-500/20 text-red-400 ring-1 ring-red-500/50";
      case "In Recess":
        return "bg-amber-500/20 text-amber-400 ring-1 ring-amber-500/50";
      default:
        return "bg-gray-500/20 text-gray-400 ring-1 ring-gray-500/50";
    }
  };

  const getActionButtonStyle = (action, disabled) => {
    if (disabled) return "bg-gray-800/50 text-gray-600 cursor-not-allowed opacity-50";
    
    switch (action) {
      case "checkin":
        return "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/50 hover:bg-emerald-500/20";
      case "checkout":
        return "bg-red-500/10 text-red-400 ring-1 ring-red-500/50 hover:bg-red-500/20";
      case "start-recess":
        return "bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/50 hover:bg-amber-500/20";
      case "end-recess":
        return "bg-indigo-500/10 text-indigo-400 ring-1 ring-indigo-500/50 hover:bg-indigo-500/20";
      default:
        return "bg-gray-700 text-gray-300 hover:bg-gray-600";
    }
  };

  const isDisabled = (buttonStatus) => {
    if (status === "In Recess") {
      return buttonStatus !== "end-recess";
    }

    if (status !== "Checked In" && buttonStatus !== "checkin") {
      return true;
    }

    if (buttonStatus === "checkin" && status === "Checked In") {
      return true;
    }

    if (buttonStatus === "checkout" && (status === "Checked Out" || status === "In Recess")) {
      return true;
    }

    if (buttonStatus === "start-recess" && (status === "Checked Out" || status === "In Recess")) {
      return true;
    }

    if (buttonStatus === "end-recess" && status !== "In Recess") {
      return true;
    }

    return false;
  };

  return (
    <div className="ml-20 p-6 min-h-screen bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gray-800/50 p-6 rounded-2xl backdrop-blur-sm ring-1 ring-white/10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-500/10 rounded-xl ring-1 ring-indigo-500/30">
              <Clock className="w-8 h-8 text-indigo-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Attendance Dashboard</h1>
              <p className="text-gray-400">
                {currentTime.toLocaleDateString()} • {currentTime.toLocaleTimeString()}
              </p>
            </div>
          </div>
          <div className={`px-6 py-3 rounded-xl ${getStatusColor()} backdrop-blur-sm`}>
            <span className="font-semibold text-lg">{status || "No Status"}</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-800/50 rounded-2xl p-6 backdrop-blur-sm ring-1 ring-white/10">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 bg-emerald-500/10 rounded-lg ring-1 ring-emerald-500/30">
                <LogIn className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-200">Check-in</h3>
            </div>
            <p className="text-gray-400">
              {checkInTime ? new Date(checkInTime).toLocaleString() : "Not checked in"}
            </p>
          </div>

          <div className="bg-gray-800/50 rounded-2xl p-6 backdrop-blur-sm ring-1 ring-white/10">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 bg-red-500/10 rounded-lg ring-1 ring-red-500/30">
                <LogOut className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-200">Check-out</h3>
            </div>
            <p className="text-gray-400">
              {checkOutTime ? new Date(checkOutTime).toLocaleString() : "Not checked out"}
            </p>
          </div>

          <div className="bg-gray-800/50 rounded-2xl p-6 backdrop-blur-sm ring-1 ring-white/10">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 bg-amber-500/10 rounded-lg ring-1 ring-amber-500/30">
                <Coffee className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-200">Break Time</h3>
            </div>
            <p className="text-gray-400">{totalRecessDuration}</p>
          </div>

          <div className="bg-gray-800/50 rounded-2xl p-6 backdrop-blur-sm ring-1 ring-white/10">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 bg-indigo-500/10 rounded-lg ring-1 ring-indigo-500/30">
                <Timer className="w-5 h-5 text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-200">Working Time</h3>
            </div>
            <p className="text-gray-400">{liveWorkingTime}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { id: "checkin", icon: LogIn, label: "Check In" },
            { id: "checkout", icon: LogOut, label: "Check Out" },
            { id: "start-recess", icon: Coffee, label: "Start Break" },
            { id: "end-recess", icon: StopCircle, label: "End Break" }
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => handleAttendanceAction(id)}
              disabled={isDisabled(id)}
              className={`p-4 rounded-xl transition-all duration-300 ${getActionButtonStyle(
                id,
                isDisabled(id)
              )} group flex flex-col items-center gap-3`}
            >
              <Icon className="w-6 h-6 transition-transform group-hover:scale-110" />
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>

        {/* Checkout Dialog */}
        {showDialog && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-gray-900/90 backdrop-blur-sm" />
            <div className="relative bg-gray-800 rounded-2xl p-8 w-full max-w-md mx-4 ring-1 ring-white/10">
              <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                <div className="p-4 bg-red-500/10 rounded-xl ring-1 ring-red-500/30">
                  <LogOut className="w-8 h-8 text-red-400" />
                </div>
              </div>
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-white mt-2">Confirming Checkout</h3>
                <p className="text-gray-400 mt-2">
                  Automatic checkout in {timeLeft} seconds
                </p>
              </div>
              <div className="w-full h-1.5 bg-gray-700 rounded-full mb-6 overflow-hidden">
                <div
                  className="h-full bg-red-500 rounded-full transition-all duration-1000"
                  style={{ width: `${(timeLeft / 10) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-center gap-4">
                <button
                  onClick={cancelCheckout}
                  className="px-6 py-3 rounded-xl bg-gray-700/50 hover:bg-gray-700 text-white font-medium transition-colors duration-200 ring-1 ring-white/10"
                >
                  Cancel Checkout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Status Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800/50 rounded-2xl p-6 backdrop-blur-sm ring-1 ring-white/10">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 bg-purple-500/10 rounded-lg ring-1 ring-purple-500/30">
                <Calendar className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-200">Today's Summary</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Working Hours</span>
                <span className="text-gray-200">{totalWorkingTime}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Break Duration</span>
                <span className="text-gray-200">{totalRecessDuration}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-2xl p-6 backdrop-blur-sm ring-1 ring-white/10">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 bg-blue-500/10 rounded-lg ring-1 ring-blue-500/30">
                <Users className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-200">Current Status</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Live Working Time</span>
                <span className="text-gray-200">{liveWorkingTime}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Current State</span>
                <span className={`px-3 py-1 rounded-lg text-sm ${getStatusColor()}`}>
                  {status || "No Status"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer 
        theme="dark" 
        position="top-right" 
        pauseOnHover={false} 
        limit={1} 
        autoClose={2000}
        toastClassName="bg-gray-800 ring-1 ring-white/10"
      />
    </div>
  );
};

export default Attendance;