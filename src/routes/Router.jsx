import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../routes/ProtectedRoute";
import Home from "../Pages/Home";
import Signup from "../Pages/Auth/Signup";
import ConfirmRegistration from "../Pages/Auth/ConfirmRegistration";
import Login from "../Pages/Auth/Login";
import ForgotPassword from "../Pages/Auth/ForgotPassword";
import VerifyOtp from "../Pages/Auth/VerifyOtp";
import ResetPassword from "../Pages/Auth/ResetPassword";
import DashboardHome from "../Pages/Users/Dashboard/DashboardHome";
// import Profile from "../Pages/Dashboard/Profile";
// import Settings from "../Pages/Dashboard/Settings";
// import Attendance from "../Pages/Dashboard/Attendance";

const AppRouter = () => {
  return ( 

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/confirm-registration" element={<ConfirmRegistration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Private Routes */}
          <Route
          path="/dashboard/home"
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <DashboardHome />
            </ProtectedRoute>
          }
        />
                     
        </Routes>
  );
};

export default AppRouter;
