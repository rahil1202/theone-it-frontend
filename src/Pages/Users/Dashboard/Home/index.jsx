import React from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Clock, Users, CheckCircle, TrendingUp } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardHome = () => {
  // Dummy Data for Graphs
  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Productivity Trend",
        data: [70, 75, 78, 80, 85, 83, 88],
        borderColor: "#4F46E5",
        backgroundColor: "rgba(79, 70, 229, 0.3)",
      },
    ],
  };

  const barChartData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Hours Worked",
        data: [40, 35, 42, 38],
        backgroundColor: "#22C55E",
      },
    ],
  };

  return (
    <div className="p-6 min-h-screen pl-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Clock className="w-8 h-8 text-indigo-500" />
            Dashboard Home
          </h1>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Hours Worked */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:scale-105 transform transition-all duration-300">
            <CheckCircle className="w-8 h-8 text-green-500 mb-4" />
            <h3 className="text-lg font-semibold text-gray-200">Total Hours Worked</h3>
            <p className="text-2xl font-bold text-gray-100">160 hrs</p>
          </div>

          {/* Active Employees */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:scale-105 transform transition-all duration-300">
            <Users className="w-8 h-8 text-blue-500 mb-4" />
            <h3 className="text-lg font-semibold text-gray-200">Active Employees</h3>
            <p className="text-2xl font-bold text-gray-100">42</p>
          </div>

          {/* Productivity Score */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:scale-105 transform transition-all duration-300">
            <TrendingUp className="w-8 h-8 text-yellow-500 mb-4" />
            <h3 className="text-lg font-semibold text-gray-200">Productivity Score</h3>
            <p className="text-2xl font-bold text-gray-100">88%</p>
          </div>

          {/* Monthly Attendance */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:scale-105 transform transition-all duration-300">
            <CheckCircle className="w-8 h-8 text-purple-500 mb-4" />
            <h3 className="text-lg font-semibold text-gray-200">Monthly Attendance</h3>
            <p className="text-2xl font-bold text-gray-100">95%</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Line Chart */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-gray-200 mb-4">Productivity Over Time</h3>
            <Line data={lineChartData} options={{ responsive: true }} />
          </div>

          {/* Bar Chart */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-gray-200 mb-4">Weekly Hours Worked</h3>
            <Bar data={barChartData} options={{ responsive: true }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
