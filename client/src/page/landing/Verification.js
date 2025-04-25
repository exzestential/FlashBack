import React from "react";
import { motion } from "framer-motion";

import { ColoredButton } from "../../component/global";
import { Nav } from "../../component/landingPage";

const Verification = () => {
  // Code input
  // const handleChange = (e, index) => {
  //   const newValues = [...values];
  //   newValues[index] = e.target.value.slice(0, 1);
  //   setValues(newValues);

  //   if (e.target.value && index < 5) {
  //     inputRefs.current[index + 1].current.focus(); // Move to next input field
  //   }
  // };

  // const handleBackspace = (e, index) => {
  //   if (e.key === "Backspace" && values[index] === "") {
  //     if (index > 0) {
  //       inputRefs.current[index - 1].current.focus(); // Move to previous input field if backspace is pressed
  //     }
  //   }
  // };

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
