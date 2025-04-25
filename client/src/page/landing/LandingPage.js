import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import { Nav, LandingMascot } from "../../component/landingPage";
import { ColoredButton, LightButton, Footer } from "../../component/global";
import Login from "./Login";
import "../../styles/page/LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    setIsLoggingIn(urlParams.get("isLoggingIn") === "true");
  }, [location]);

  useEffect(() => {
    const html = document.documentElement;

    if (isLoggingIn) {
      const scrollY = window.scrollY;
      html.classList.add("modal-open");
      html.style.top = `-${scrollY}px`;
      html.dataset.scrollY = scrollY.toString();
    } else {
      const scrollY = html.dataset.scrollY || "0";
      html.classList.remove("modal-open");
      html.style.top = "";

      setTimeout(() => {
        window.scrollTo(0, parseInt(scrollY));
      }, 0);
    }

    return () => {
      const scrollY = html.dataset.scrollY || "0";
      html.classList.remove("modal-open");
      html.style.top = "";

      setTimeout(() => {
        window.scrollTo(0, parseInt(scrollY));
      }, 0);
    };
  }, [isLoggingIn]);

  const handleLoginClick = () => {
    navigate("/?isLoggingIn=true");
  };

  const handleCloseLogin = () => {
    navigate("/", { replace: true });
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="home relative">
        {/* NAVBAR */}
        <Nav />
        {/* BODY */}
        <div className="body-container relative flex flex-col min-h-screen justify-center">
          <div className="flex justify-center items-center ">
            <div className="grid grid-cols-3 ">
              <div className="col-span-2 flex justify-center">
                <LandingMascot />
              </div>
              <div className="flex items-center justify-center flex-col">
                <div className="w-100">
                  <h2 className="text-center mb-10">
                    Flashback helps you master anything, anytime, <br /> one
                    digital card at a time.
                  </h2>
                </div>
                <div className="w-60">
                  <ColoredButton
                    text={"Get Started"}
                    onClick={handleSignupClick}
                    style={"mb-5"}
                  />
                  <LightButton
                    text={"I already have an account"}
                    onClick={handleLoginClick}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 w-full text-center">
            <div className="flex justify-center items-center">
              <div className="grid grid-cols-4 gap-20 justify-items-center py-10">
                <div className="text-center">
                  <p>Flashcards</p>
                </div>
                <div className="text-center">
                  <p>Study Mode</p>
                </div>
                <div className="text-center">
                  <p>Quizzes</p>
                </div>
                <div className="text-center">
                  <p>Match Mode</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* VALUE BLOCKS */}
        <div className="value-blocks-container">
          <div className="grid grid-cols-5 py-20">
            <div className="col-span-2 flex justify-end">
              <img src="http://placehold.co/300" alt="" className="value-1" />
            </div>
            <div className="col-span-3 h-full flex items-center justify-center">
              <div className="text-center">
                <h4 className="text-lg font-semibold">
                  Study smarter, not harder.
                </h4>
                <h5 className="text-sm text-gray-600">
                  Master topics with intelligent flashcards that adapt to how
                  well
                  <br />
                  you know the material—so you focus where it matters most.
                </h5>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-5 py-20">
            <div className="col-span-3 h-full flex items-center justify-center">
              <div className="text-center">
                <h4 className="text-lg font-semibold">
                  Review in minutes, retain for life.
                </h4>
                <h5 className="text-sm text-gray-600">
                  Whether you’ve got 5 minutes or 50, Flashback helps you lock
                  in
                  <br />
                  knowledge with fast, focused review sessions.
                </h5>
              </div>
            </div>
            <div className="col-span-2 flex justify-start">
              <img src="http://placehold.co/300" alt="" className="value-1" />
            </div>
          </div>

          <div className="grid grid-cols-5 py-20">
            <div className="col-span-2 flex justify-end">
              <img src="http://placehold.co/300" alt="" className="value-1" />
            </div>
            <div className="col-span-3 h-full flex items-center justify-center">
              <div className="text-center">
                <h4 className="text-lg font-semibold">
                  Your memory, on demand.
                </h4>
                <h5 className="text-sm text-gray-600">
                  Access your flashcards anytime, anywhere. Perfect for cramming
                  <br />
                  before class or brushing up while in line for coffee.
                </h5>
              </div>
            </div>
          </div>
        </div>
        {/* DOWNLOAD PLUG */}
        <div className="download-plug-container text-center items-center pt-60 min-h-screen">
          <h3 className="pb-10">Train your brain, one flash at a time.</h3>
          <div className="download-buttons flex justify-center">
            <button
              type="button"
              className="flex items-center py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 text-left gap-2"
            >
              <img src="http://placehold.co/75" alt="" className="apple" />
              <div>
                Download on <br /> Apple
              </div>
            </button>
            <button
              type="button"
              className="flex items-center py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 text-left gap-2"
            >
              <img src="http://placehold.co/75" alt="" className="apple" />
              <div>
                Download on <br /> Apple
              </div>
            </button>
          </div>
        </div>
        <Footer />
        <div className={`modal-fade ${isLoggingIn ? "visible" : ""}`}>
          <div className="modal-content">
            <Login onClose={handleCloseLogin} />
          </div>
        </div>{" "}
      </div>
    </motion.div>
  );
};

export default LandingPage;
