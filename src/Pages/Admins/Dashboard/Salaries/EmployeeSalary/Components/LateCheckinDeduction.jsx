import React, { useState, useEffect } from "react";
import { 
  ClipboardList, 
  CalendarDays, 
  DollarSign, 
  Clock, 
  AlertCircle,
  Calendar,
  ArrowRight
} from "lucide-react";

const LateCheckinDeduction = ({ employeeId }) => {
  const [lateCheckinData, setLateCheckinData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deductions, setDeductions] = useState({
    lateCheckins: 0,
   
    totalDeduction: 0,
  });

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const calculateDeductions = (lateCheckins) => {
    const halfDays = Math.floor(lateCheckins / 3);
    const totalDeduction = halfDays * 500; // Assuming halfDayDeduction is 500
    return { lateCheckins, totalDeduction };
  };

  const fetchLateCheckins = async () => {
    try {
      setLoading(true);

      const startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        .toISOString()
        .split("T")[0];
      const endDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
        .toISOString()
        .split("T")[0];

      const response = await fetch(
        `${BASE_URL}/late-checkins/find?employeeId=${employeeId}&startDate=${startDate}&endDate=${endDate}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch late check-ins.");
      const data = await response.json();
      const deductions = calculateDeductions(data.lateCheckins?.length || 0);

      setLateCheckinData(data.lateCheckins || []);
      setDeductions(deductions);
    } catch (error) {
      console.error("Error fetching late check-ins:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLateCheckins();
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
          <h2 className="text-xl font-semibold text-white">Late Check-in Deductions</h2>
          <div className="px-4 py-1 bg-indigo-500/10 rounded-full text-indigo-400 text-sm">
            Current Month
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-900/50 rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-blue-500/10">
                <ClipboardList className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Late Check-ins</p>
                <p className="text-2xl font-bold text-white">{deductions.lateCheckins}</p>
              </div>
            </div>
          </div>
         

          <div className="bg-gray-900/50 rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-red-500/10">
                <DollarSign className="w-6 h-6 text-red-400" />
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
            <h3 className="text-lg font-medium text-white">Late Check-in History</h3>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Clock className="w-4 h-4" />
              <span>Past 30 Days</span>
            </div>
          </div>

          {lateCheckinData.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">No late check-ins recorded this month</p>
            </div>
          ) : (
            <div className="space-y-4">
              {lateCheckinData.map((entry, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-800/40 rounded-lg hover:bg-gray-800/60 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
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
                    <span>Late by 30 mins</span>
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

export default LateCheckinDeduction;