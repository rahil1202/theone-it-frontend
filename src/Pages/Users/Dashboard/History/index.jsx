import React, { useState, useEffect } from "react";
import { Calendar, Clock, CheckSquare } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";

const MonthlyAttendance = () => {
  const [records, setRecords] = useState([]);
  const [totalWorkHours, setTotalWorkHours] = useState(0); // in minutes
  const [month, setMonth] = useState(new Date().getMonth() + 1); // Default to current month
  const [year, setYear] = useState(new Date().getFullYear()); // Default to current year
  const [loading, setLoading] = useState(false);

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const employeeId = localStorage.getItem("_id"); // Assuming employee ID is stored in local storage

  // Function to convert minutes to "hours and minutes"
  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours} hours ${remainingMinutes} minutes`;
  };

  const fetchMonthlyAttendance = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/attendance-summary/monthly?employeeId=${employeeId}&month=${month}&year=${year}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch monthly attendance");

      const data = await response.json();
      setRecords(data.records || []);

      // Extract numerical value from the "totalWorkHours" string
      const totalMinutes = parseInt(data.totalWorkHours.split(" ")[0], 10) || 0;
      setTotalWorkHours(totalMinutes);

      toast.success(data.message || "Monthly attendance fetched successfully");
    } catch (error) {
      console.error("Error fetching monthly attendance:", error);
      toast.error(error.message || "Failed to fetch monthly attendance");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMonthlyAttendance();
  }, [month, year]);

  const handleMonthChange = (e) => setMonth(Number(e.target.value));
  const handleYearChange = (e) => setYear(Number(e.target.value));

  return (
    <div className="p-6 min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Calendar className="w-8 h-8 text-indigo-500" />
            Monthly Attendance
          </h1>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <select
            value={month}
            onChange={handleMonthChange}
            className="p-2 rounded-lg bg-gray-800 text-white border border-gray-700"
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
            onChange={handleYearChange}
            className="p-2 rounded-lg bg-gray-800 text-white border border-gray-700"
            min="2000"
            max={new Date().getFullYear()}
          />
          <button
            onClick={fetchMonthlyAttendance}
            disabled={loading}
            className={`px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Loading..." : "Show Records"}
          </button>
        </div>

        {/* Total Work Hours */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-6 h-6 text-indigo-500" />
            <h3 className="text-lg font-semibold text-gray-200">Total Work Hours for Month</h3>
          </div>
          <p className="text-gray-400">{formatTime(totalWorkHours)}</p>
        </div>

        {/* Attendance Records */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-green-500" /> Attendance Records
          </h3>
          {records.length > 0 ? (
            <table className="w-full text-gray-400">
              <thead>
                <tr>
                  <th className="text-left py-2">Date</th>
                  <th className="text-left py-2">Check-in Time</th>
                  <th className="text-left py-2">Check-out Time</th>
                  <th className="text-left py-2">Break Duration</th>
                  <th className="text-left py-2">Total Working Time</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record._id} className="hover:bg-gray-700">
                    <td className="py-2">{new Date(record.date).toLocaleDateString()}</td>
                    <td className="py-2">
                      {record.checkInTime
                        ? new Date(record.checkInTime).toLocaleTimeString()
                        : "-"}
                    </td>
                    <td className="py-2">
                      {record.checkOutTime
                        ? new Date(record.checkOutTime).toLocaleTimeString()
                        : "-"}
                    </td>
                    <td className="py-2">
                      {record.totalRecessDuration
                        ? `${Math.floor(record.totalRecessDuration / 60000)} minutes`
                        : "0 minutes"}
                    </td>
                    <td className="py-2">
                      {record.totalWorkingTime
                        ? formatTime(record.totalWorkingTime)
                        : "0 hours 0 minutes"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No records available for the selected month and year.</p>
          )}
        </div>
      </div>
      <ToastContainer theme="dark" position="top-right" pauseOnHover={false} limit={1} />
    </div>
  );
};

export default MonthlyAttendance;
