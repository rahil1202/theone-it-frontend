import React, { useState, useEffect } from "react";
import { 
  CalendarDays, 
  DollarSign, 
  ClipboardList, 
  Calendar,
  AlertCircle,
  Loader2
} from "lucide-react";

const AbsentDayDeduction = ({ employeeId, dailySalary }) => {
  const [absentDays, setAbsentDays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deductions, setDeductions] = useState({
    absentDaysCount: 0,
    totalDeduction: 0,
  });

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const calculateDeductions = (absentDaysCount) => {
    const totalDeduction = absentDaysCount * dailySalary;
    return { absentDaysCount, totalDeduction };
  };

  const fetchAbsentDays = async () => {
    try {
      setLoading(true);

      const startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        .toISOString()
        .split("T")[0];
      const endDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
        .toISOString()
        .split("T")[0];

      const response = await fetch(
        `${BASE_URL}/absent/find?employeeId=${employeeId}&startDate=${startDate}&endDate=${endDate}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch absent days.");
      const data = await response.json();
      const deductions = calculateDeductions(data.absentDays?.length || 0);

      setAbsentDays(data.absentDays || []);
      setDeductions(deductions);
    } catch (error) {
      console.error("Error fetching absent days:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAbsentDays();
  }, [employeeId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48 bg-gray-900/50 rounded-lg">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
          <p className="text-gray-400">Loading absent day data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/50 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-red-500/10 p-2 rounded-lg">
          <Calendar className="w-6 h-6 text-red-400" />
        </div>
        <h2 className="text-xl font-bold text-white">Absent Day Deductions</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Total Absent Days Card */}
        <div className="bg-gray-800/50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <ClipboardList className="w-4 h-4 text-indigo-400" />
            <span className="text-gray-400">Total Absent Days</span>
          </div>
          <p className="text-2xl font-bold text-white">{deductions.absentDaysCount}</p>
        </div>

        {/* Deduction per Day Card */}
        <div className="bg-gray-800/50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-yellow-400" />
            <span className="text-gray-400">Deduction per Day</span>
          </div>
          <p className="text-2xl font-bold text-white">₹{dailySalary.toLocaleString()}</p>
        </div>

        {/* Total Deduction Card */}
        <div className="bg-gray-800/50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-red-400" />
            <span className="text-gray-400">Total Deduction</span>
          </div>
          <p className="text-2xl font-bold text-red-400">₹{deductions.totalDeduction.toLocaleString()}</p>
        </div>
      </div>

      {/* Absent Days List */}
      <div className="bg-gray-800/30 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-white mb-4">Absence Details</h3>
        {absentDays.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {absentDays.map((entry, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 bg-gray-800/50 p-3 rounded-lg hover:bg-gray-800/70 transition-colors"
              >
                <CalendarDays className="w-4 h-4 text-indigo-400" />
                <span className="text-gray-300">
                  {new Date(entry.date).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center py-4">No absences recorded this month</p>
        )}
      </div>
    </div>
  );
};

export default AbsentDayDeduction;