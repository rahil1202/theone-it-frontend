import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Settings = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    jobRole: "",
    dateofBirth: "",
    aadharNumber: "",
    panNumber: "",
    bankAccountNumber: "",
    address: "",
  });
  const [originalData, setOriginalData] = useState({}); // Save original data for comparison
  const [loading, setLoading] = useState(false);

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  // Fetch User Profile
  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/employee/my-profile`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile data");
      }

      const { employee } = await response.json();

      const formatteddateofBirth = employee.dateofBirth
        ? new Date(employee.dateofBirth).toISOString().split("T")[0]
        : "";
      // toast.success("Profile data fetched successfully");
      const profileData = {
        name: employee.name || "",
        email: employee.email || "",
        phoneNumber: employee.phoneNumber || "",
        jobRole: employee.jobRole || "",
        dateofBirth: formatteddateofBirth,
        aadharNumber: employee.aadharNumber || "",
        panNumber: employee.panNumber || "",
        bankAccountNumber: employee.bankAccountNumber || "",
        address: employee.address || "",
      };

      setFormData(profileData);
      setOriginalData(profileData); // Save original data for comparison
    } catch (error) {
      console.error("Error fetching profile data:", error);
      toast.error(error.message || "Failed to fetch profile data");
    } finally {
      setLoading(false);
    }
  };

  // Update User Profile
  const updateUserProfile = async (e) => {
    e.preventDefault();

    // Compare formData with originalData to find changed fields
    const updatedFields = Object.keys(formData).reduce((acc, key) => {
      if (formData[key] !== originalData[key]) {
        acc[key] = formData[key];
      }
      return acc;
    }, {});

    if (Object.keys(updatedFields).length === 0) {
      toast.info("No changes detected.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/employee/update`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFields),
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || "Failed to update profile data");
      }

      const { employee, message } = await response.json();
      const formatteddateofBirth = employee.dateofBirth
        ? new Date(employee.dateofBirth).toISOString().split("T")[0]
        : "";

      const updatedProfileData = {
        name: employee.name || "",
        email: employee.email || "",
        phoneNumber: employee.phoneNumber || "",
        jobRole: employee.jobRole || "",
        dateofBirth: formatteddateofBirth,
        aadharNumber: employee.aadharNumber || "",
        panNumber: employee.panNumber || "",
        bankAccountNumber: employee.bankAccountNumber || "",
        address: employee.address || "",
      };

      setFormData(updatedProfileData);
      setOriginalData(updatedProfileData); // Update original data after a successful update
      toast.success(message || "Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile data:", error);
      toast.error(error.message || "Failed to update profile data");
    } finally {
      setLoading(false);
    }
  };

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div className="p-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 min-h-screen text-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        <form
          onSubmit={updateUserProfile}
          className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700"
        >
          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
              placeholder="Enter your phone number"
              required
            />
          </div>

          {/* Job Role */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Job Role</label>
            <input
              type="text"
              name="jobRole"
              value={formData.jobRole}
              onChange={handleChange}
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
              placeholder="Enter your job role"
            />
          </div>

          {/* Date of Birth */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Date of Birth</label>
            <input
              type="date"
              name="dateofBirth"
              value={formData.dateofBirth}
              onChange={handleChange}
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
            />
          </div>

          {/* Aadhar Number */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Aadhar Number</label>
            <input
              type="text"
              name="aadharNumber"
              value={formData.aadharNumber}
              onChange={handleChange}
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
              placeholder="Enter your Aadhar number"
            />
          </div>

          {/* PAN Number */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">PAN Number</label>
            <input
              type="text"
              name="panNumber"
              value={formData.panNumber}
              onChange={handleChange}
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
              placeholder="Enter your PAN number"
            />
          </div>

          {/* Bank Account Number */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Bank Account Number</label>
            <input
              type="text"
              name="bankAccountNumber"
              value={formData.bankAccountNumber}
              onChange={handleChange}
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
              placeholder="Enter your bank account number"
            />
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
              placeholder="Enter your address"
              rows="3"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow-md focus:outline-none focus:ring focus:ring-indigo-500 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer theme="dark" position="top-right" pauseOnHover={false} autoClose={2000} closeOnClick={true} limit={1} />
    </div>
  );
};

export default Settings;
