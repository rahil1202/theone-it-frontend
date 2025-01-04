import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignUp from "./pages/Signup";
import LogIn from "./pages/Login";
import ConfirmRegistration from "./pages/ConfirmRegistration";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">      
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/confirm-registration" element={<ConfirmRegistration/>} />
            <Route path="/login" element={<LogIn/>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
