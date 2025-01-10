import React, { useState } from "react";
import {
  Search,
  Plus,
  Edit,
  Check,
  X,
  DollarSign,
  Filter,
  ChevronDown,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminSalaryManagement = () => {
  const [salaries, setSalaries] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@company.com",
      jobRole: "Software Engineer",
      baseSalary: 50000,
      deductions: 2000,
      bonuses: 3000,
      netSalary: 51000,
      status: "Paid",
    },
    {
      id: 2,
      name: "Sarah Smith",
      email: "sarah.smith@company.com",
      jobRole: "Product Manager",
      baseSalary: 70000,
      deductions: 5000,
      bonuses: 4000,
      netSalary: 69000,
      status: "Pending",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSalary, setNewSalary] = useState({
    name: "",
    email: "",
    jobRole: "",
    baseSalary: "",
    deductions: "",
    bonuses: "",
  });

  const handleAddSalary = (e) => {
    e.preventDefault();
    const netSalary =
      parseInt(newSalary.baseSalary) - parseInt(newSalary.deductions) + parseInt(newSalary.bonuses);

    const newRecord = {
      ...newSalary,
      id: salaries.length + 1,
      netSalary,
      status: "Pending",
    };

    setSalaries([newRecord, ...salaries]);
    toast.success("Salary record added successfully!");
    setIsModalOpen(false);
    setNewSalary({
      name: "",
      email: "",
      jobRole: "",
      baseSalary: "",
      deductions: "",
      bonuses: "",
    });
  };

  const handleUpdateStatus = (id, status) => {
    setSalaries((prev) =>
      prev.map((salary) => (salary.id === id ? { ...salary, status } : salary))
    );
    toast.success(`Status updated to ${status}!`);
  };

  const filteredSalaries = salaries.filter(
    (salary) =>
      salary.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      salary.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="ml-20 p-6 min-h-screen bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Admin Salary Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg flex items-center gap-2 transition-all transform hover:scale-105"
        >
          <Plus className="w-4 h-4" /> Add Salary
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search employees..."
            className="pl-9 pr-4 py-2 w-full bg-gray-900/50 rounded-lg ring-1 ring-white/10 focus:ring-2 focus:ring-indigo-500/50 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Salary Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800/50 rounded-lg">
          <thead>
            <tr className="bg-gray-800/70">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Job Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Base Salary
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Deductions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Bonuses
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Net Salary
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredSalaries.map((salary) => (
              <tr key={salary.id} className="hover:bg-gray-700/30">
                <td className="px-6 py-3 text-sm text-gray-300">{salary.name}</td>
                <td className="px-6 py-3 text-sm text-gray-300">{salary.jobRole}</td>
                <td className="px-6 py-3 text-sm text-gray-300">₹{salary.baseSalary}</td>
                <td className="px-6 py-3 text-sm text-gray-300">₹{salary.deductions}</td>
                <td className="px-6 py-3 text-sm text-gray-300">₹{salary.bonuses}</td>
                <td className="px-6 py-3 text-sm text-gray-300">₹{salary.netSalary}</td>
                <td className="px-6 py-3 text-sm">
                  <span
                    className={`px-3 py-1 rounded-lg text-xs font-medium ${
                      salary.status === "Paid"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-yellow-500/10 text-yellow-400"
                    }`}
                  >
                    {salary.status}
                  </span>
                </td>
                <td className="px-6 py-3 text-right">
                  {salary.status === "Pending" ? (
                    <>
                      <button
                        onClick={() => handleUpdateStatus(salary.id, "Paid")}
                        className="px-3 py-1 text-sm text-green-400 hover:text-white hover:bg-green-500/30 rounded-lg transition-all"
                      >
                        Mark as Paid
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(salary.id, "Rejected")}
                        className="ml-2 px-3 py-1 text-sm text-red-400 hover:text-white hover:bg-red-500/30 rounded-lg transition-all"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <Edit className="w-5 h-5 text-gray-400 hover:text-indigo-500 cursor-pointer" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Salary Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-2xl p-8 w-full max-w-md mx-4 ring-1 ring-white/10">
            <h2 className="text-xl font-bold mb-4">Add New Salary</h2>
            <form onSubmit={handleAddSalary} className="space-y-4">
              {[
                { label: "Name", field: "name" },
                { label: "Email", field: "email" },
                { label: "Job Role", field: "jobRole" },
                { label: "Base Salary", field: "baseSalary" },
                { label: "Deductions", field: "deductions" },
                { label: "Bonuses", field: "bonuses" },
              ].map(({ label, field }) => (
                <div key={field}>
                  <label className="block text-sm text-gray-300 mb-1">{label}</label>
                  <input
                    type="text"
                    value={newSalary[field]}
                    onChange={(e) =>
                      setNewSalary({ ...newSalary, [field]: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-gray-900/50 rounded-lg ring-1 ring-white/10 focus:ring-2 focus:ring-indigo-500/50 focus:outline-none"
                    required
                  />
                </div>
              ))}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-indigo-500 hover:bg-indigo-600 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2.5 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ToastContainer theme="dark" position="top-right" pauseOnHover={false} limit={1} autoClose={2000} />
    </div>
  );
};

export default AdminSalaryManagement;
