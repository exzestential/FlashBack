import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import {
  LandingPage,
  Signup,
  Verification,
  Home,
  Discover,
  EditCard,
} from "./page";
import EmailVerified from "./page/misc/EmailVerified";
import SessionChecker from "./SessionChecker"; // Import this

const AppRouter = () => {
  return (
    <Router>
      <SessionChecker>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify" element={<Verification />} />
            <Route path="/email-verified" element={<EmailVerified />} />
            <Route path="/home" element={<Home />} />
            {/* Note the :id param */}
            <Route path="/discover" element={<Discover />} />
            <Route path="/edit-card" element={<EditCard />} />
          </Routes>
        </AnimatePresence>
      </SessionChecker>
    </Router>
  );
};

export default AppRouter;
