import React, { useState, useEffect } from "react";
import { 
  ClipboardList, 
  CalendarDays, 
  DollarSign,
  Calendar,
  Clock,
  Sun,
  AlertCircle
} from "lucide-react";

const HalfDayDeduction = ({ employeeId }) => {
  const [halfDayData, setHalfDayData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deductions, setDeductions] = useState({
    halfDays: 0,
    totalDeduction: 0,
  });

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const calculateDeductions = (halfDays) => {
    const totalDeduction = halfDays * 500; // Assuming halfDayDeduction is 500
    return { halfDays, totalDeduction };
  };

  const fetchHalfDays = async () => {
    try {
      setLoading(true);

      const startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        .toISOString()
        .split("T")[0];
      const endDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
        .toISOString()
        .split("T")[0];

      const response = await fetch(
        `${BASE_URL}/halfday/find?employeeId=${employeeId}&startDate=${startDate}&endDate=${endDate}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch half-days.");
      const data = await response.json();
      const deductions = calculateDeductions(data.halfDays?.length || 0);

      setHalfDayData(data.halfDays || []);
      setDeductions(deductions);
    } catch (error) {
      console.error("Error fetching half-days:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHalfDays();
  }, [employeeId]);

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Half-Day Deductions</h2>
          <div className="px-4 py-1 bg-indigo-500/10 rounded-full text-indigo-400 text-sm">
            Current Month
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-900/50 rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-purple-500/10">
                <Sun className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Total Half Days</p>
                <p className="text-2xl font-bold text-white">{deductions.halfDays}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/50 rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-emerald-500/10">
                <DollarSign className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Deduction/Day</p>
                <p className="text-2xl font-bold text-white">₹500</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/50 rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-red-500/10">
                <AlertCircle className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Total Deduction</p>
                <p className="text-2xl font-bold text-white">₹{deductions.totalDeduction}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-white">Half-Day History</h3>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <CalendarDays className="w-4 h-4" />
              <span>Past 30 Days</span>
            </div>
          </div>

          {halfDayData.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">No half-days recorded this month</p>
            </div>
          ) : (
            <div className="space-y-4">
              {halfDayData.map((entry, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-800/40 rounded-lg hover:bg-gray-800/60 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                    <span className="text-white">
                      {new Date(entry.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>Half Day</span>
                    <span className="px-2 py-1 bg-purple-500/10 rounded-full text-purple-400 text-xs ml-2">
                      -₹500
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HalfDayDeduction;