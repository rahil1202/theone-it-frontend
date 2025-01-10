import React, { useState, useEffect } from "react";
import { Loader2, RefreshCw } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AttendanceTab = ({ employeeId }) => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const formatTime = (time) => {
    if (!time) return "N/A";
    return new Date(time).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatRecessDuration = (milliseconds) => {
    if (!milliseconds) return "0m 0s";
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}m ${seconds}s`;
  };

  const formatWorkingTime = (minutes) => {
    if (!minutes) return "0h 0m";
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const getStatusColor = (status) => {
    const colors = {
      'Present': 'bg-green-500/20 text-green-400',
      'Absent': 'bg-red-500/20 text-red-400',
      'Late': 'bg-yellow-500/20 text-yellow-400',
      'On Leave': 'bg-blue-500/20 text-blue-400'
    };
    return colors[status] || 'bg-gray-500/20 text-gray-400';
  };

  const fetchAttendanceData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/attendance-summary/monthly?employeeId=${employeeId}&month=${month}&year=${year}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch attendance data.");
      }

      const { records } = await response.json();
      setAttendanceData(records || []);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
      toast.error(error.message || "Failed to fetch attendance data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (employeeId) {
      fetchAttendanceData();
    }
  }, [employeeId, month, year]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
        <span className="text-sm font-medium text-gray-400 ml-3">Loading attendance data...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-gray-800/30 rounded-lg">
        <div className="flex items-center gap-3">
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 border border-gray-700 focus:ring-2 focus:ring-indigo-500 hover:border-gray-600 transition-colors"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>

          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="px-4 py-2 w-24 rounded-lg bg-gray-800 text-gray-300 border border-gray-700 focus:ring-2 focus:ring-indigo-500 hover:border-gray-600 transition-colors"
            min="2000"
            max={new Date().getFullYear()}
          />
        </div>

        <button
          onClick={fetchAttendanceData}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {attendanceData.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-gray-700">
          <table className="w-full table-auto">
            <thead className="bg-gray-800/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Day</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Check-In</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Check-Out</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Recess</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Working Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {attendanceData.map((record) => {
                const dateObj = new Date(record.date);
                return (
                  <tr key={record._id} className="hover:bg-gray-800/30 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {dateObj.toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {dateObj.toLocaleDateString('en-US', { weekday: 'short' })}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {formatTime(record.checkInTime)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {formatTime(record.checkOutTime)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {formatRecessDuration(record.totalRecessDuration)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {formatWorkingTime(record.totalWorkingTime)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(record.currentStatus)}`}>
                        {record.currentStatus}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-800/30 rounded-lg">
          <p className="text-gray-400">No attendance data available for the selected month and year.</p>
        </div>
      )}

      <ToastContainer theme="dark" position="top-right" autoClose={2000} />
    </div>
  );
};

export default AttendanceTab;