import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import authServices from "../../services/authAPI";

const ProtectedRoute = () => {
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
  return verified ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;
