import { Navigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, userRole } = useAuth();

  // console.log("ProtectedRoute - Authenticated:", isAuthenticated);
  // console.log("ProtectedRoute - Role:", userRole);

  if (!isAuthenticated) {
    return <Navigate to="/signup" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
