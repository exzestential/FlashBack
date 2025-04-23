import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { LandingPage, Signup, Verification, Home } from "./page";

const AppRouter = () => {
  return (
    <Router>
      <AnimatePresence exitBeforeEnter>
        <Routes>
          <Route path="/temp" element={<Home />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify" element={<Verification />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
};

export default AppRouter;
