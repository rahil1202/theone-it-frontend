import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateField = (field, value) => {
    const newErrors = { ...errors };

    switch (field) {
      case "name":
        if (!value) newErrors.name = "Name is required";
        else delete newErrors.name;
        break;

      case "email":
        if (!value) {
          newErrors.email = "Email is required";
        } else if (
          !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value)
        ) {
          newErrors.email = "Invalid email address";
        } else {
          delete newErrors.email;
        }
        break;

      case "phoneNumber":
        if (!value) {
          newErrors.phoneNumber = "Phone number is required";
        } else if (!/^\d{10}$/.test(value)) {
          newErrors.phoneNumber = "Phone number must be 10 digits";
        } else {
          delete newErrors.phoneNumber;
        }
        break;

      case "password":
        if (!value) {
          newErrors.password = "Password is required";
        } else if (
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            value
          )
        ) {
          newErrors.password =
            "Password must be at least 8 characters, include uppercase, lowercase, number, and a symbol";
        } else {
          delete newErrors.password;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      validateField(key, formData[key]);
      if (!formData[key]) {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Signup successful! Redirecting to OTP verification...");
        console.log("Navigating to confirm-otp with email:", formData.email);

        navigate("/confirm-registration", { state: { email: formData.email } });
      } else {
        const errorData = await response.json();
        setErrors({ apiError: errorData.message || "Something went wrong" });
        toast.error(errorData.message || "Something went wrong");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setErrors({ apiError: "Network error. Please try again later." });
      toast.error("Network error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    validateField(name, value);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-lg shadow-lg p-8"
        autoComplete="on"
      >
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
          Create an Account
        </h2>

        {/* API Error Message */}
        {errors.apiError && (
          <p className="text-red-600 text-center mb-4">{errors.apiError}</p>
        )}

        {/* Name Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Enter your name"
            autoComplete="name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Enter your email"
            autoComplete="email"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Phone Number Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${
              errors.phoneNumber ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Enter your phone number"
            autoComplete="tel"
          />
          {errors.phoneNumber && (
            <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Enter your password"
            autoComplete="new-password"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 rounded-md transition-colors font-semibold text-white ${
            isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isLoading ? "Submitting..." : "Sign Up"}
        </button>

        {/* Link to Login */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Log In
          </a>
        </p>
      </form>

      <ToastContainer />
    </div>
  );
}
