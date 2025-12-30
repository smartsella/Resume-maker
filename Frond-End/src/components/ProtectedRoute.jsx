import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const { token, login, logout, user, setUser } = useContext(AuthContext);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let mounted = true;

    const validate = async () => {
      if (!token) {
        setChecking(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:3000/api/auth/me");

        // If valid, store user in context
        if (mounted && res.data?.user) {
          login(token, res.data.user);
        }
      } catch (err) {
        logout();
      } finally {
        if (mounted) setChecking(false);
      }
    };

    validate();

    return () => {
      mounted = false;
    };
  }, [token]);

  if (checking) return null;

  // if (!token) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
