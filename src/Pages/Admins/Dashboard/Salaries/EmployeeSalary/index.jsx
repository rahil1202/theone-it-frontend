import React, { useState, useEffect } from "react";
import {
  DollarSign,
  Info,
  AlertCircle,
  CalendarDays,
  UserCheck,
  ClipboardList,
  ChevronLeft,
  Building,
  Mail,
  BadgeCheck,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import LateCheckinDeduction from "./Components/LateCheckInDeduction";
import HalfDayDeduction from "./Components/HalfDayDeduction";
import AbsentDayDeduction from "./Components/AbsentDayDeduction";
import OverallCalculation from "./Components/OverallCalculation";
import { toast } from "react-toastify";

const AdminEmployeeSalaryProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState(null);
  const [activeTab, setActiveTab] = useState("salary");

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchEmployeeDetails = async () => {
    try {
      const response = await fetch(`${BASE_URL}/employee/find?id=${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!response.ok) throw new Error("Failed to fetch employee details.");
      const data = await response.json();
      setEmployeeData(data.employee);
    } catch (error) {
      console.error("Error fetching employee details:", error);
      toast.error("Failed to fetch employee details.");
    }
  };

  useEffect(() => {
    fetchEmployeeDetails();
  }, [id]);

  if (!employeeData) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  const tabs = [
    { id: "salary", label: "Salary Details", icon: DollarSign },
    { id: "late-checkins", label: "Late Check-ins", icon: ClipboardList },
    { id: "absent-days", label: "Absent Days", icon: UserCheck },
    { id: "half-day", label: "Half Days", icon: CalendarDays },
    { id: "overview", label: "Overview", icon: BadgeCheck },
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case "salary":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Salary Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-700/50 p-6 rounded-lg">
                <DollarSign className="w-8 h-8 text-green-400 mb-4" />
                <p className="text-gray-400 mb-2">Base Salary</p>
                <p className="text-2xl font-bold">₹{employeeData.baseSalary}</p>
              </div>
              <div className="bg-gray-700/50 p-6 rounded-lg">
                <Info className="w-8 h-8 text-yellow-400 mb-4" />
                <p className="text-gray-400 mb-2">Bonuses</p>
                <p className="text-2xl font-bold">₹{employeeData.bonuses}</p>
              </div>
              <div className="bg-gray-700/50 p-6 rounded-lg">
                <AlertCircle className="w-8 h-8 text-red-400 mb-4" />
                <p className="text-gray-400 mb-2">Deductions</p>
                <p className="text-2xl font-bold">₹{employeeData.deductions}</p>
              </div>
            </div>
          </div>
        );
      case "late-checkins":
        return <LateCheckinDeduction employeeId={id} />;
      case "half-day":
        return <HalfDayDeduction employeeId={id} />;
      case "absent-days":
        return <AbsentDayDeduction employeeId={id} dailySalary={employeeData.baseSalary} />;
        case "overview":
        return (
          <OverallCalculation
            baseSalary={employeeData.baseSalary}
            bonuses={employeeData.bonuses}
            deductions={{
              lateCheckinsTotalDeduction: employeeData.lateCheckinsTotalDeduction,
              totalHalfDayDeduction: employeeData.totalHalfDayDeduction,
              totalAbsentDayDeduction: employeeData.totalAbsentDayDeduction,
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="ml-10 p-6 min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all flex items-center gap-2 text-gray-300 hover:text-white"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-medium">Back to Salary Management</span>
          </button>

          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h1 className="text-3xl font-bold text-white">{employeeData.name}</h1>
                <div className="flex items-center gap-4 text-gray-400">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>{employeeData.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    <span>Employee ID: {id}</span>
                  </div>
                </div>
              </div>
              <div className="bg-indigo-500/10 px-4 py-2 rounded-lg">
                <p className="text-indigo-400 font-semibold">Active Employee</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-6">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all ${
                activeTab === id
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">{renderActiveTab()}</div>
      </div>
    </div>
  );
};

export default AdminEmployeeSalaryProfile;
