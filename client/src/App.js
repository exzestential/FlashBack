import React, { useEffect } from "react";
import AppRouter from "./AppRouter";
import axios from "axios";
import api from "./utils/axios";
import "./App.css";

const App = () => {
  axios.defaults.withCredentials = true; // Make sure cookies are sent

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await api.get("/api/auth/check-session");
        console.log("User session:", res.data);
      } catch (err) {
        console.log("Not logged in");
      }
    };

    checkSession();
  }, []);

  return (
    <div>
      <AppRouter />
    </div>
  );
};

export default App;
