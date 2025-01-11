import React, { useState, useEffect } from "react";
import { Search, Plus, ArrowRight, DollarSign, Users, X } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";

const AdminSalaryManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [salaryData, setSalaryData] = useState({
    employeeId: "",
    baseSalary: "",
    deductions: "",
    bonuses: "",
  });

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchEmployees = async () => {
    try {
      const response = await fetch(`${BASE_URL}/employee/all`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!response.ok) throw new Error("Failed to fetch employees.");
      const data = await response.json();
      setEmployees(data.employees || []);
      setSalaryData({ ...salaryData, employeeId: data.employees[0]?._id });
    } catch (error) {
      console.error("Error fetching employees:", error);
      toast.error(error.message || "Failed to fetch employees.");
    }
  };

  const handleSaveSalary = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/salary/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(salaryData),
      });

      if (!response.ok) throw new Error("Failed to save salary.");
      toast.success("Salary saved successfully!");
      setIsModalOpen(false);
      setSalaryData({ employeeId: "", baseSalary: "", deductions: "", bonuses: "" });
    } catch (error) {
      console.error("Error saving salary:", error);
      toast.error(error.message || "Failed to save salary.");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="ml-20 p-6 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-500/20 rounded-lg">
                <Users className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Employees</p>
                <p className="text-2xl font-semibold text-white">{employees.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-500/20 rounded-lg">
                <DollarSign className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Average Salary</p>
                <p className="text-2xl font-semibold text-white">$5,240</p>
              </div>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Salary Management</h1>
            <p className="text-gray-400">Manage employee compensation and benefits</p>
          </div>
          <button
            onClick={() => {
              setSelectedEmployee(null);
              setSalaryData({ employeeId: "", baseSalary: "", deductions: "", bonuses: "" });
              setIsModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors duration-200 group"
          >
            <Plus className="w-5 h-5" />
            <span>Add New Salary</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search employees by name or email..."
            className="w-full pl-10 pr-4 py-3 bg-gray-800/50 rounded-xl border border-gray-700/50 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 placeholder:text-gray-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Employee Table */}
        <div className="relative overflow-hidden rounded-xl border border-gray-700/50 backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-800/70">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50">
                {filteredEmployees.map((employee) => (
                  <tr key={employee._id} className="hover:bg-gray-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                          <span className="text-indigo-400 font-medium">
                            {employee.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="text-white font-medium">{employee.name}</p>
                          <p className="text-sm text-gray-400">ID: {employee._id.slice(-6)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{employee.email}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedEmployee(employee);
                          setSalaryData({ ...salaryData, employeeId: employee._id });
                          setIsModalOpen(true);
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-gray-700/50 text-white rounded-lg hover:bg-indigo-500/20 hover:text-indigo-400 transition-colors duration-200"
                      >
                        <DollarSign className="w-4 h-4" />
                        Add Salary
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-2xl p-8 w-full max-w-md mx-4 border border-gray-700/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                {selectedEmployee
                  ? `Add Salary: ${selectedEmployee.name}`
                  : "Add New Salary"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <form onSubmit={handleSaveSalary} className="space-y-5">
              {[
                { label: "Base Salary", icon: DollarSign },
                { label: "Deductions", icon: DollarSign },
                { label: "Bonuses", icon: DollarSign },
              ].map(({ label, icon: Icon }) => (
                <div key={label}>
                  <label className="block text-sm font-medium text-gray-400 mb-2">{label}</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <Icon className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      value={salaryData[label.toLowerCase().replace(" ", "")]}
                      onChange={(e) =>
                        setSalaryData({
                          ...salaryData,
                          [label.toLowerCase().replace(" ", "")]: e.target.value,
                        })
                      }
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 rounded-lg border border-gray-700/50 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 text-white"
                      required
                    />
                  </div>
                </div>
              ))}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ToastContainer
        position="top-right"
        theme="dark"
        pauseOnHover={false}
        limit={1}
        autoClose={2000}
      />
    </div>
  );
};

export default AdminSalaryManagement;