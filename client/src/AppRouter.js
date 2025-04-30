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

const AppRouter = () => {
  return (
    <Router>
      <AnimatePresence exitBeforeEnter>
        <Routes>
          <Route path="/home/" element={<Home />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify" element={<Verification />} />
          <Route path="/email-verified" element={<EmailVerified />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/edit-card" element={<EditCard />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
};

export default AppRouter;
