import { Navigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";

const AuthRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? children : <Navigate to="/" />;
};

export default AuthRoute;
