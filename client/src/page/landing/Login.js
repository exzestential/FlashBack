import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/axios";

import { ColoredButton, Close } from "../../component/global";
import { Facebook, Google } from "../../assets/global";
import { Header } from "../../component/presets";

const Login = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      alert(res.data.message);
      navigate("/home"); // or wherever you want to redirect
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container fixed inset-0 z-50 min-h-screen bg-slate-900 text-white">
      <button
        type="button"
        onClick={onClose}
        className="absolute top-3 right-4 text-gray-500 hover:text-gray-800"
      >
        <Close style={{ color: "white", fontSize: "40px" }} />
      </button>

      <div className="flex flex-col items-center justify-center min-h-screen">
        <Header title="Login" />

        {/* LOGIN FOM */}
        <div className="w-80">
          <form action="#" method="POST">
            <div>
              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
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
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-800 border border-slate-700 focus:ring-sky-700 focus:border-sky-700 focus:outline-none p-2.5 my-2.5 rounded-xl w-full"
                  placeholder="Password"
                  required
                />
              </div>
              <div className="flex justify-center mt-4">
                <ColoredButton
                  type="submit"
                  onClick={handleLogin}
                  text={"Login"}
                  style="w-40"
                />
              </div>
            </div>
          </form>
        </div>

        {/* ALTERNATIVE LOGIN */}
        <div>
          <div className="grid grid-cols-7 items-center gap-4">
            <hr className="col-span-3" />
            <p>or</p>
            <hr className="col-span-3" />
          </div>
          <div className="grid grid-cols-2 gap-4">
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
  );
};

export default Login;
