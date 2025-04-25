import React from "react";
import { motion } from "framer-motion";

import { ColoredButton } from "../../component/global";

import Nav from "../../component/landingPage/Nav";
const Verification = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="verification-container min-h-screen flex flex-col items-center justify-center">
        <Nav />
        <div className="verification-form">
          <h2 className="text-center">Verify your email</h2>
          <p className="mb-6">
            Please enter the 6-digit pin sent to your email.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Verification;
