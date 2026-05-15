import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { ROLES } from "../../constants/roles";
import authServices from "../../services/authAPI";
import { getTokenRole } from "../../utils/token";

const ProtectedRoute = ({ requiredRole }: { requiredRole?: string }) => {
  const [verified, setVerified] = useState<boolean | null>(null);

  useEffect(() => {
    const token: string = localStorage.getItem("token");

    if (!token) {
      setVerified(false);
      return;
    }

    authServices
      .verifyToken(token)
      .then((): void => {
        setVerified(true);
      })
      .catch((): void => {
        localStorage.removeItem("token");
        setVerified(false);
      });
  });

  if (verified === null) {
    return "Loadning...";
  }
  if (!verified) {
    <Navigate to="/auth/login" replace />;
  }
  if (requiredRole) {
    const token = localStorage.getItem("token")!;
    if (getTokenRole(token) !== requiredRole) {
      return <Navigate to="/" replace />;
    }
  }
  return <Outlet />;
};

export default ProtectedRoute;
