import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import {
  LandingPage,
  Signup,
  Verification,
  EmailVerified,
  Home,
  EditCard,
  StudyPage,
} from "./page";

import { ComingSoon } from "./component/global";

import FolderDetails from "./page/main/homeTabs/FileBrowser/FolderDetails";
import DeckDetails from "./page/main/homeTabs/FileBrowser/DeckDetails";
import Layout from "./page/Layout";
import DecktoCard from "./page/study/DecktoCard";

const AppRouter = () => {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify" element={<Verification />} />
          <Route path="/email-verified" element={<EmailVerified />} />

          {/* Internal Routes with Sidebar */}
          <Route path="/" element={<Layout />}>
            <Route path="home" element={<Home />} />
            <Route path="edit-card" element={<EditCard />} />
            <Route path="folder/:folderId" element={<FolderDetails />} />
            <Route path="deck/:deckId" element={<DeckDetails />} />
            <Route path="/study/:deckId" element={<StudyPage />} />
            <Route path="/card/:cardId" element={<EditCard />} />
            <Route path="/create" element={<EditCard />} />
            <Route path="/create/deck/:deckId" element={<EditCard />} />

            {/* COming Soon */}
            <Route path="explore" element={<ComingSoon />} />
            <Route path="/study" element={<ComingSoon />} />
            <Route path="/create" element={<ComingSoon />} />
            <Route path="/notifications" element={<ComingSoon />} />
            <Route path="/profile" element={<ComingSoon />} />
            <Route path="/settings" element={<ComingSoon />} />
          </Route>
          <Route path="/deck-to-card" element={<DecktoCard />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
};

export default AppRouter;
