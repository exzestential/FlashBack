import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/axios";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";

import { ColoredButton, Close } from "../../component/global";
import { Facebook, Google } from "../../assets/";
import { Header, SubHeader, Text } from "../../component/presets";

const Login = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Make login request to backend API - using our configured api instance
      const response = await api.post("/api/auth/login", { email, password });

      console.log("Login response:", response.data);

      if (response.data && response.data.token) {
        // Store token in localStorage
        localStorage.setItem("token", response.data.token);

        // Store userId directly from response if available
        if (response.data.userId) {
          localStorage.setItem("userId", response.data.userId);
        } else {
          // Decode the token to get user ID as fallback
          try {
            const decoded = jwtDecode(response.data.token);
            localStorage.setItem("userId", decoded.userId);
          } catch (decodeErr) {
            console.error("Error decoding token:", decodeErr);
            setError("Authentication error: Invalid token format");
            setIsLoading(false);
            return;
          }
        }

        // Show success message and redirect
        navigate("/home");
      } else {
        setError("Login failed: No token received");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="login-container fixed inset-0 z-50 min-h-screen bg-slate-900 text-white">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-800"
        >
          <Close style={{ color: "white", fontSize: "40px" }} />
        </button>

        <div className="flex flex-col items-center justify-center min-h-screen">
          <SubHeader>Login</SubHeader>

          {/* LOGIN FORM */}
          <div className="w-80">
            <form onSubmit={handleLogin}>
              {error && (
                <div className="bg-red-500 bg-opacity-20 border border-red-400 text-red-100 px-4 py-2 rounded-xl mb-4">
                  {error}
                </div>
              )}

              <div>
                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-slate-800 border border-slate-700 focus:ring-sky-700 focus:border-sky-700 focus:outline-none p-2.5 rounded-xl w-full"
                    placeholder="Email"
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-slate-800 border border-slate-700 focus:ring-sky-700 focus:border-sky-700 focus:outline-none p-2.5 my-2.5 rounded-xl w-full"
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="flex justify-center mt-4">
                  <ColoredButton
                    type="submit"
                    text={isLoading ? "Logging in..." : "Login"}
                    style="w-40"
                    disabled={isLoading}
                  />
                </div>
              </div>
            </form>
          </div>

          {/* ALTERNATIVE LOGIN */}
          <div>
            <div className="grid grid-cols-7 items-center gap-4 mt-6">
              <hr className="col-span-3" />
              <p>or</p>
              <hr className="col-span-3" />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <button className="flex items-center justify-center bg-transparent border border-sky-700 rounded-xl p-2.5">
                <img src={Facebook} alt="" className="h-5 rounded-full me-2" />
                Facebook
              </button>

              <button className="flex items-center justify-center bg-transparent border border-sky-700 rounded-xl p-2.5">
                <img src={Google} alt="" className="h-5 rounded-full me-2" />
                Google
              </button>
            </div>
          </div>

          <div className="text-center w-80 m-10 text-slate-700">
            <p>
              By signing in to FlashBack, you agree to our Terms and Privacy
              Policy.
            </p>
            <p>
              This site is protected by reCAPTCHA Enterprise and the Google
              Privacy Policy and Terms of Service apply.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
