import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Signup from "../Pages/Auth/Signup";
import ConfirmRegistration from "../Pages/Auth/ConfirmRegistration";
import Login from "../Pages/Auth/Login";
import ForgotPassword from "../Pages/Auth/ForgotPassword";
import VerifyOtp from "../Pages/Auth/VerifyOtp";
import ResetPassword from "../Pages/Auth/ResetPassword";

const Layout = ()  => {
   return (
    <Router>
       <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/confirm-registration" element={<ConfirmRegistration/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/forgot-password" element={<ForgotPassword/>} />      
            <Route path="/verify-otp" element={<VerifyOtp/>} />
            <Route path="/reset-password" element={<ResetPassword/>} />      
        </Routes>
    </Router>
    );
}

export default Layout;