import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { User, Phone, Mail, Calendar, Shield, Loader2 } from "lucide-react";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/employee/my-profile`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setProfile(data.employee);
        toast.success("Profile loaded successfully!");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to load profile");
      }
    } catch (error) {
      toast.error("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-950">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
          <p className="text-lg font-semibold text-gray-300">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 py-8 px-4">
      <div className="max-w-4xl mx-auto rounded-2xl bg-gray-900 shadow-xl border border-gray-800">
        <div className="p-6 space-y-6">
          <div className="flex items-center space-x-3 border-b border-gray-800 pb-4">
            <User className="w-8 h-8 text-blue-400" />
            <h2 className="text-3xl font-bold text-gray-100">User Profile</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: <User className="w-6 h-6 text-blue-400" />,
                label: "Name",
                value: profile.name,
                bgColor: "bg-blue-400/10",
                borderColor: "border-blue-400/20",
              },
              {
                icon: <Mail className="w-6 h-6 text-green-400" />,
                label: "Email",
                value: profile.email,
                bgColor: "bg-green-400/10",
                borderColor: "border-green-400/20",
              },
              {
                icon: <Phone className="w-6 h-6 text-yellow-400" />,
                label: "Phone Number",
                value: profile.phoneNumber,
                bgColor: "bg-yellow-400/10",
                borderColor: "border-yellow-400/20",
              },
              {
                icon: <Shield className="w-6 h-6 text-purple-400" />,
                label: "Role",
                value: profile.role,
                bgColor: "bg-purple-400/10",
                borderColor: "border-purple-400/20",
              },
              {
                icon: <Calendar className="w-6 h-6 text-pink-400" />,
                label: "Joined On",
                value: new Date(profile.createdAt).toLocaleDateString(),
                bgColor: "bg-pink-400/10",
                borderColor: "border-pink-400/20",
              },
              {
                icon: <Calendar className="w-6 h-6 text-indigo-400" />,
                label: "Last Updated",
                value: new Date(profile.updatedAt).toLocaleDateString(),
                bgColor: "bg-indigo-400/10",
                borderColor: "border-indigo-400/20",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`flex items-center p-4 rounded-xl border ${item.borderColor} ${item.bgColor} backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg`}
              >
                <div className="mr-4">{item.icon}</div>
                <div>
                  <p className="text-sm font-medium text-gray-400">{item.label}</p>
                  <p className="text-lg font-bold text-gray-100 capitalize">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ToastContainer
        theme="dark"
        position="top-right"
        autoClose={3000}
        pauseOnHover={false}
        closeOnClick={true}
      />
    </div>
  );
};

export default Profile;