import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { EmployeeLoginResponse } from "../api/auth/useLoginEmployee";

interface JwtPayload {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
  exp: number;
  iss: string;
  aud: string;
}

interface AuthContextInterface {
  user: JwtPayload | null;
  isAuthenticated: boolean;
  userId: string | null;
  userEmail: string | null;
  login: (employeeLoginResponse: EmployeeLoginResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextInterface | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<JwtPayload | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        if (decoded.exp * 1000 > Date.now()) {
          setUser(decoded);
        } else {
          localStorage.removeItem("accessToken");
        }
      } catch {
        localStorage.removeItem("accessToken");
      }
    }
  }, []);

  const login = (employeeLoginResponse: EmployeeLoginResponse) => {
    localStorage.setItem("accessToken", employeeLoginResponse.accessToken);
    localStorage.setItem("employeeId", employeeLoginResponse.employeeId);
    const decoded = jwtDecode<JwtPayload>(employeeLoginResponse.accessToken);
    setUser(decoded);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("employeeId");
    setUser(null);
  };

  const userId =
    user?.[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    ] || null;
  const userEmail =
    user?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] ||
    null;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        userId,
        userEmail,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextInterface => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
