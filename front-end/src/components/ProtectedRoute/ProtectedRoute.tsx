import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import authServices from "../../services/authAPI";
import { getTokenRole } from "../../utils/token";

const ProtectedRoute = ({
  requiredRole,
  requireNoRole,
}: {
  requiredRole?: string;
  requireNoRole?: boolean;
}) => {
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
  if (requireNoRole) {
    const token = localStorage.getItem("token")!;
    const role = getTokenRole(token);
    if (role === "volunteer") {
      return <Navigate to="/volunteer/dashboard" replace />;
    }
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
