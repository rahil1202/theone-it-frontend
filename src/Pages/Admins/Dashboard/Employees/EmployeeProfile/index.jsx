import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  Calendar,
  ArrowLeft,
  Loader2,
  Home,
  ShieldCheck,
  Banknote,
  DollarSign,
} from "lucide-react";

const AdminEmployeeProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("information");
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [selectedHolidays, setSelectedHolidays] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchEmployeeData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/employee/find?id=${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (!response.ok) throw new Error("Failed to fetch employee details.");

      const data = await response.json();
      setEmployeeDetails(data.employee);
    } catch (error) {
      console.error("Error fetching employee details:", error);
      toast.error(error.message || "Failed to fetch employee details.");
    } finally {
      setLoading(false);
    }
  };

  const fetchSelectedHolidays = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/holidays/selected/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        method: "GET",
      });

      if (!response.ok) throw new Error("Failed to fetch selected holidays.");

      const data = await response.json();
      setSelectedHolidays(data.holidays || []);
    } catch (error) {
      console.error("Error fetching selected holidays:", error);
      toast.error(error.message || "Failed to fetch selected holidays.");
    } finally {
      setLoading(false);
    }
  };

  const fetchDummyLeaveRequests = () => {
    setLeaveRequests([
      {
        _id: "1",
        reason: "Family Event",
        startDate: "2025-01-15",
        endDate: "2025-01-20",
      },
      {
        _id: "2",
        reason: "Medical Leave",
        startDate: "2025-02-10",
        endDate: "2025-02-12",
      },
    ]);
  };

  useEffect(() => {
    if (activeTab === "information") {
      fetchEmployeeData();
    } else if (activeTab === "holidays") {
      fetchSelectedHolidays();
    } else if (activeTab === "leaves") {
      fetchDummyLeaveRequests();
    }
  }, [activeTab, id]);

  const TabButton = ({ label, tab }) => (
    <button
      className={`px-6 py-3 text-sm font-medium transition-all duration-200 border-b-2 hover:text-indigo-400 ${
        activeTab === tab
          ? "border-indigo-500 text-indigo-500 bg-indigo-500/10"
          : "border-transparent text-gray-400 hover:border-indigo-400/30"
      }`}
      onClick={() => setActiveTab(tab)}
    >
      {label}
    </button>
  );

  const InfoCard = ({ icon: Icon, label, value, color }) => (
    <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:border-gray-600/50 transition-all">
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-xs font-medium text-gray-400">{label}</p>
        <p className="text-sm font-medium text-gray-200">{value || "Not Provided"}</p>
      </div>
    </div>
  );

  return (
    <div className="p-6 ml-20 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2.5 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-200 border border-gray-700 hover:border-gray-600"
          >
            <ArrowLeft className="w-5 h-5 text-gray-300" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-100">Employee Profile</h1>
            {employeeDetails && (
              <p className="text-sm text-gray-400 mt-1">Managing {employeeDetails.name}'s information</p>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-700/50">
          <TabButton label="Information" tab="information" />
          <TabButton label="Holidays" tab="holidays" />
          <TabButton label="Leave Requests" tab="leaves" />
          <TabButton label="Salary" tab="salary" />
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="text-sm font-medium">Loading data...</span>
            </div>
          </div>
        ) : (
          <>
            {activeTab === "information" && employeeDetails && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <InfoCard icon={User} label="Full Name" value={employeeDetails.name} color="bg-blue-500/10 text-blue-400" />
                  <InfoCard icon={Mail} label="Email Address" value={employeeDetails.email} color="bg-green-500/10 text-green-400" />
                  <InfoCard icon={Phone} label="Phone Number" value={employeeDetails.phoneNumber} color="bg-yellow-500/10 text-yellow-400" />
                  <InfoCard icon={Briefcase} label="Job Role" value={employeeDetails.jobRole} color="bg-purple-500/10 text-purple-400" />
                  <InfoCard icon={Calendar} label="Date of Birth" value={new Date(employeeDetails.dateofBirth).toLocaleDateString()} color="bg-teal-500/10 text-teal-400" />
                  <InfoCard icon={ShieldCheck} label="Aadhar Number" value={employeeDetails.aadharNumber} color="bg-indigo-500/10 text-indigo-400" />
                  <InfoCard icon={Banknote} label="PAN Number" value={employeeDetails.panNumber} color="bg-green-500/10 text-green-400" />
                  <InfoCard icon={Home} label="Address" value={employeeDetails.address} color="bg-gray-500/10 text-gray-400" />
                </div>
              </div>
            )}
            {activeTab === "holidays" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-200 mb-4">Selected Holidays</h3>
                {selectedHolidays.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {selectedHolidays.map((holiday) => (
                      <div
                        key={holiday._id}
                        className="p-4 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:border-gray-600/50 transition-all"
                      >
                        <p className="font-medium text-gray-200">{holiday.name}</p>
                        <p className="text-sm text-gray-400">
                          {new Date(holiday.date).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">No holidays selected.</p>
                )}
              </div>
            )}

            {activeTab === "leaves" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-200 mb-4">Leave Requests</h3>
                {leaveRequests.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {leaveRequests.map((request) => (
                      <div
                        key={request._id}
                        className="p-4 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:border-gray-600/50 transition-all"
                      >
                        <p className="font-medium text-gray-200">{request.reason}</p>
                        <p className="text-sm text-gray-400">
                          {new Date(request.startDate).toLocaleDateString()} -{" "}
                          {new Date(request.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">No leave requests made.</p>
                )}
              </div>
            )}
            {activeTab === "salary" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <InfoCard
                    icon={DollarSign}
                    label="Monthly Salary"
                    value="₹50,000"
                    color="bg-green-500/10 text-green-400"
                  />
                  <InfoCard
                    icon={DollarSign}
                    label="Yearly Bonus"
                    value="₹1,00,000"
                    color="bg-blue-500/10 text-blue-400"
                  />
                  <InfoCard
                    icon={DollarSign}
                    label="Deductions"
                    value="₹5,000"
                    color="bg-red-500/10 text-red-400"
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <ToastContainer theme="dark" position="top-right" pauseOnHover={false} limit={1} autoClose={2000} />
    </div>
  );
};

export default AdminEmployeeProfile;
