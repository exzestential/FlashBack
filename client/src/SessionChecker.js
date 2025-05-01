// SessionChecker.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "./utils/axios";

const SessionChecker = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await api.get("/api/auth/check-session");
        const userId = res.data.userId; // Correct path now
        console.log("userId: ", userId);

        if (userId) {
          localStorage.setItem("userId", userId);
          navigate("/home");
        }
      } catch (err) {
        console.log("Not logged in");
      }
    };

    checkSession();
  }, [navigate]);

  return children;
};

export default SessionChecker;
