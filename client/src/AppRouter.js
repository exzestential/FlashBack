import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import {
  LandingPage,
  Signup,
  Verification,
  EmailVerified,
  Home,
  Discover,
  EditCard,
} from "./page";
import DecktoCard from "./page/study/DecktoCard";

const AppRouter = () => {
  return (
    <Router>
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
          <Route path="/deck-to-card" element={<DecktoCard />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
};

export default AppRouter;
