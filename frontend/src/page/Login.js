import React from "react";
import { RxCross2 } from "react-icons/rx";
import { ColoredButton } from "../component/global";
import { Facebook, Google } from "../assets/global";

const Login = ({ onClose }) => {
  const Cross = RxCross2;
  const handleLoginClick = () => {
    // login api
  };

  return (
    <div className="login-container fixed inset-0 z-50 min-h-screen bg-slate-900 text-white">
      <button type="button" onClick={onClose} className="flex w-100 m-10">
        <Cross style={{ color: "white", fontSize: "40px" }} />
      </button>

      <div className="flex flex-col items-center">
        <h1 className="mb-6">Login</h1>

        {/* LOGIN FOM */}
        <div>
          <form action="#" method="POST">
            <div>
              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
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
                  className="bg-slate-800 border border-slate-700 focus:ring-sky-700 focus:border-sky-700 focus:outline-none p-2.5 my-2.5 rounded-xl w-full"
                  placeholder="Password"
                  required
                />
              </div>
              <ColoredButton
                type="submit"
                onClick={handleLoginClick}
                text={"Login"}
              />
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
