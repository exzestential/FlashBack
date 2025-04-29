import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

import { ColoredButton, Notification, Loader } from "../../component/global";
import { Nav } from "../../component/landingPage";

const Verification = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [values, setValues] = useState(Array(6).fill(""));
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = useRef(Array.from({ length: 6 }, () => React.createRef()));
  const form = JSON.parse(localStorage.getItem("userData"));
  const email = form ? form.email : null;

  useEffect(() => {
    console.log("email: ", email);
  }, []);

  const [notification, setNotification] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e, index) => {
    const newValues = [...values];
    newValues[index] = e.target.value.slice(0, 1);
    setValues(newValues);

    if (e.target.value && index < 5) {
      inputRefs.current[index + 1].current.focus(); // Move to next input field
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && values[index] === "") {
      if (index > 0) {
        inputRefs.current[index - 1].current.focus(); // Move to previous input field if backspace is pressed
      }
    }
  };

  const handleResend = async (e) => {
    e.preventDefault();
    // If cooldown is active, do not resend
    if (resendCooldown > 0) {
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/auth/resend-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email }), // Send the email to resend the code
      });

      if (response.ok) {
        setNotification((prevNotification) => [
          ...prevNotification,
          {
            id: Date.now(),
            message:
              "Verification code has been resent. Please check your email.",
          },
        ]);

        // Start 1-minute cooldown
        setResendCooldown(60);
        const timer = setInterval(() => {
          setResendCooldown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000); // Update every second
      } else {
        setNotification((prevNotification) => [
          ...prevNotification,
          {
            id: Date.now(),
            message: "Failed to resend verification code. Please try again.",
          },
        ]);
      }
    } catch (error) {
      console.error("Error resending code:", error);
    }
  };

  const handleVerify = async (e) => {
    if (e) {
      e.preventDefault();
    }
    console.log({ email });
    const code = values.join("");

    try {
      const response = await fetch("http://localhost:5000/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, code }), // Send email and code to the backend
      });

      if (response.ok) {
        setIsLoading(true);

        setTimeout(() => {
          navigate(`/signup?email=verified`, {
            state: { email: email },
          });
          setIsLoading(false);
        }, 500);
      } else {
        // Trigger notification if verification fails
        setNotification((prevNotification) => [
          ...prevNotification,
          {
            id: Date.now(),
            message: "Incorrect code. Please try again.",
          },
        ]);
      }
    } catch (error) {
      console.error("Error verifying code:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="verification-container min-h-screen flex flex-col items-center justify-center">
        <Nav />
        <div className="verification-form flex flex-col justify-center items-center">
          <h2 className="text-center">Verify your email</h2>
          <p className="mb-6">
            Please enter the 6-digit pin sent to your email.
          </p>
          <form>
            <div className="flex space-x-2 just">
              {values.map((value, index) => (
                <input
                  key={index}
                  type="text"
                  value={value}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleBackspace(e, index)}
                  ref={inputRefs.current[index]}
                  className="w-16 h-16 text-center text-xl p-5 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleResend}
              className="text-xs mt-1 hover:underline"
              disabled={resendCooldown > 0} // Disable button during cooldown
            >
              {resendCooldown > 0
                ? `Didn't get an email? Resend verification code in ${resendCooldown}s`
                : "Didn't get an email? Resend verification code"}
            </button>

            <div className="my-7 w-80 mx-auto">
              <ColoredButton
                text={"Submit"}
                onClick={(e) => handleVerify(e)}
                fullWidth
              />
            </div>
          </form>
        </div>

        {notification.length > 0 && (
          <Notification
            notification={notification}
            setNotification={setNotification}
          />
        )}
        <Loader isLoading={isLoading} />
      </div>
    </motion.div>
  );
};

export default Verification;
