import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { LandingPage, Signup } from "./page";

const AppRouter = () => {
  return (
    <Router>
      <AnimatePresence exitBeforeEnter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Signup />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
};

export default AppRouter;
