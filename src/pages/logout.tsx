import React, { useEffect } from "react";
import { useAuth } from "../providers/AuthProvider";
import { useToast } from "../hooks/useToast";

export default React.memo(function logout() {
  const { logout } = useAuth();
  const toast = useToast();

  useEffect(() => {
    logout();
    toast.success("Logged out successfully");
  }, [logout]);

  return null;
});
