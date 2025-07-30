import { Navigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles?: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, roles } = useAuth();
  const hasAccess = !allowedRoles
    ? true
    : allowedRoles.some((role) => roles.includes(role));
  return isAuthenticated && hasAccess ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
