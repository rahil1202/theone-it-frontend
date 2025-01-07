import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../routes/ProtectedRoute";
import Home from "../Pages/Home";
import Signup from "../Pages/Auth/Signup";
import ConfirmRegistration from "../Pages/Auth/ConfirmRegistration";
import Login from "../Pages/Auth/Login";
import ForgotPassword from "../Pages/Auth/ForgotPassword";
import VerifyOtp from "../Pages/Auth/VerifyOtp";
import ResetPassword from "../Pages/Auth/ResetPassword";
import DashboardHome from "../Pages/Users/Dashboard/Home";
import Sidebar from "../Pages/Users/Dashboard/Sidebar";
import Profile from "../Pages/Users/Dashboard/Profile";
import History from "../Pages/Users/Dashboard/History";
import Settings from "../Pages/Users/Dashboard/Settings";
import Attendance from "../Pages/Users/Dashboard/Attendance";

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
               <Sidebar isActive="Home"/>
              <DashboardHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/profile"
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <Sidebar isActive="Profile" />
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/attendance"
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <Sidebar isActive="Attendance" />
              <Attendance />
            </ProtectedRoute>
          }
        />
         <Route
          path="/dashboard/history"
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <Sidebar isActive="History" />
              <History />
            </ProtectedRoute>
          }
        />
         <Route
          path="/dashboard/settings"
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <Sidebar isActive="Settings" />
              <Settings />
            </ProtectedRoute>
          }
        />        
                     
      </Routes>
  );
};

export default AppRouter;
