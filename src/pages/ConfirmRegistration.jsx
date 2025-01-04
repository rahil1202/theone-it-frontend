import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";


export default function ConfirmRegistration() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email; // Access the passed email 
  console.log(email);

  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp) {
      toast.error("OTP is required");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/confirm-registration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      if (response.ok) {
        toast.success("OTP verified successfully!");
        navigate("/dashboard"); // Navigate to a dashboard or home page after successful verification
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Invalid OTP");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("Network error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-lg shadow-lg p-8"
      >
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
          Verify OTP
        </h2>
        <p className="text-center text-gray-600 mb-4">
          An OTP has been sent to <strong>{email}</strong>
        </p>

        {/* OTP Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            OTP
          </label>
          <input
            type="text"
            name="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter OTP"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 rounded-md transition-colors font-semibold text-white ${
            isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isLoading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>

      <ToastContainer />
    </div>
  );
}
