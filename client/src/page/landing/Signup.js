import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { Back, ColoredButton, LightButton } from "../../component/global";
import { Facebook, Google } from "../../assets/global";
import { Nav } from "../../component/landingPage";
import "../../styles/page/Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
  const [showNextButton, setShowNextButton] = useState(true);
  const [fadeNextClass, setFadeNextClass] = useState("fade-in");
  const [direction, setDirection] = useState("forward");
  const [form, setForm] = useState({
    userType: "",
    username: "",
    email: "",
    password: "",
    interests: [],
  });

  const goToStep = (targetStep) => {
    if (animating || targetStep === step) return;

    const isForward = targetStep > step;
    setDirection(isForward ? "forward" : "backward");

    setAnimating(true);

    setAnimationClass(isForward ? "slide-left" : "slide-right");

    setTimeout(() => {
      setStep(targetStep);

      setAnimationClass(isForward ? "slide-in-right" : "slide-in-left");

      setTimeout(() => {
        setAnimating(false);
        setAnimationClass("");
      }, 500);
    }, 500);
  };

  useEffect(() => {
    if (step < 2) {
      setShowNextButton(true);
      setFadeNextClass("fade-in");
    } else {
      setFadeNextClass("fade-out");
      // Wait for fade-out to finish before hiding
      setTimeout(() => setShowNextButton(false), 300); // match your CSS duration
    }
  }, [step]);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const toggleInterest = (interest) => {
    setForm((prev) => {
      const interests = prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests };
    });
  };

  const interestItems = [
    { name: "AI", imgSrc: "http://placehold.co/100" },
    { name: "ML", imgSrc: "http://placehold.co/100" },
    { name: "Data Science", imgSrc: "http://placehold.co/100" },
    { name: "Blockchain", imgSrc: "http://placehold.co/100" },
    { name: "Cybersecurity", imgSrc: "http://placehold.co/100" },
    { name: "IoT", imgSrc: "http://placehold.co/100" },
    { name: "UX/UI", imgSrc: "http://placehold.co/100" },
    { name: "DevOps", imgSrc: "http://placehold.co/100" },
    { name: "Cloud", imgSrc: "http://placehold.co/100" },
    { name: "Big Data", imgSrc: "http://placehold.co/100" },
    { name: "Quantum", imgSrc: "http://placehold.co/100" },
    { name: "Gaming", imgSrc: "http://placehold.co/100" },
  ];

  const canContinue = () => {
    if (step === 0) {
      return form.userType !== "";
    } else if (step === 1) {
      return form.interests.length > 0;
    }
    return true;
  };

  const handleSignupClick = () => {
    navigate("/verify");
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative overflow-x-hidden signup-container">
        <Nav />
        {step > 0 && (
          <div>
            <button
              onClick={() => goToStep(step - 1)}
              disabled={animating}
              className="fixed z-50"
            >
              <Back />
            </button>
          </div>
        )}

        {step === 0 && (
          <div
            className={`flex flex-col items-center min-h-screen bg-white ${animationClass} transition`}
          >
            {" "}
            <div className="z-10 absolute top-1/4">
              <h2 className="text-center text-xl font-bold mb-10">I am a...</h2>
              <div className="grid grid-cols-3 gap-20">
                {["Student", "Teacher", "Other"].map((type) => (
                  <button
                    key={type}
                    onClick={() => handleChange("userType", type)}
                    className={`
                  flex flex-col items-center
                  w-52 pt-10 pb-8 rounded-lg
                  text-sm text-slate-900
                  transition
                  ${
                    form.userType === type
                      ? "bg-gray-100 shadow-[0_-6px_0_theme('colors.gray.200')] translate-y-2"
                      : `
                        border-4 border-gray-100
                        bg-white shadow-[0_6px_0_theme('colors.gray.100')]
                        hover:bg-gray-100 hover:border-gray-200 hover:shadow-[0_6px_0_theme('colors.gray.200')] hover:translate-y-[1px] 
                        focus:translate-y-2
                      `
                  }
                `}
                  >
                    <img
                      src="http://placehold.co/100"
                      alt={type}
                      className="pb-3"
                    />
                    <span>{type}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div
            className={`flex flex-col items-center min-h-screen bg-white ${animationClass} transition`}
          >
            <div className="absolute top-1/4">
              <h2 className="text-center text-xl font-bold">
                What are you interested in?
              </h2>
              <h3 className="text-center text-md  mb-10 text-gray-500">
                Choose atleast 1
              </h3>
              <div className="mx-96 mb-52">
                <div className="grid grid-cols-4 gap-14 place-items-center">
                  {interestItems.map((item) => {
                    const isPressedStyle = form.interests.includes(item.name);

                    return (
                      <button
                        key={item.name}
                        onClick={() => toggleInterest(item.name)}
                        className={`
                        flex flex-col items-center
                        w-32 h-32 pt-6 rounded-lg
                        text-sm text-slate-900 
                        transition

                        ${
                          isPressedStyle
                            ? "bg-gray-100 shadow-[0_-6px_0_theme('colors.gray.200')] translate-y-2"
                            : `
                              border-4 border-gray-100
                              bg-white shadow-[0_6px_0_theme('colors.gray.100')]
                              hover:bg-gray-100 hover:border-gray-200 hover:shadow-[0_6px_0_theme('colors.gray.200')] hover:translate-y-[1px] 
                            `
                        }
                      `}
                      >
                        <img
                          src={item.imgSrc}
                          alt={item.name}
                          className="w-14 mr-2 pb-1"
                        />
                        <span>{item.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div
            className={`h-screen flex items-start justify-center pt-44 overflow-hidden bg-white ${animationClass} transition`}
          >
            <div className="animate-slide-up-center flex flex-col justify-end ">
              <h2 className="text-center text-xl font-bold mb-5 mt-32">
                Great! Let's set up your account!
              </h2>
              <div className="login-fade-in w-80">
                <div>
                  <form action="#" method="POST">
                    <div>
                      <div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="bg-gray-100 border border-gray-200 focus:ring-sky-700 focus:border-sky-700 focus:outline-none p-2.5 rounded-xl w-full"
                          placeholder="Email"
                          required
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          id="username"
                          name="username"
                          className="bg-gray-100 border border-gray-200 focus:ring-sky-700 focus:border-sky-700 focus:outline-none p-2.5 my-2.5 rounded-xl w-full"
                          placeholder="Username"
                          required
                        />
                      </div>
                      <div>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          className="bg-gray-100 border border-gray-200 focus:ring-sky-700 focus:border-sky-700 focus:outline-none p-2.5 rounded-xl w-full"
                          placeholder="Password"
                          required
                        />
                      </div>
                      <ColoredButton
                        type="submit"
                        onClick={handleSignupClick}
                        text={"Sign up"}
                        style={"mt-4"}
                      />
                    </div>
                  </form>
                </div>

                {/* ALTERNATIVE LOGIN */}
                <div>
                  <div className="grid grid-cols-7 items-center gap-4">
                    <hr className="col-span-3" />
                    <p className="flex justify-center text-gray-400">or</p>
                    <hr className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <LightButton
                      text={"Facebook"}
                      img={Facebook}
                      imgClass="h-5 rounded-full me-2"
                    />

                    <LightButton
                      text={"Google"}
                      img={Google}
                      imgClass="h-5 rounded-full me-2"
                    />
                  </div>
                </div>

                <div className="text-center mt-8 text-slate-400">
                  <p>
                    By signing in to FlashBack, you agree to our Terms and
                    Privacy Policy.
                  </p>
                  <p>
                    This site is protected by reCAPTCHA Enterprise and the
                    Google Privacy Policy and Terms of Service apply.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {showNextButton && (
          <div
            className={`fadenext fixed bottom-0 border-t-2 border-gray-200 w-full p-6 pe-10 bg-white ${fadeNextClass}`}
          >
            <div className="flex justify-end items-center">
              <ColoredButton
                text={"Continue"}
                onClick={() => goToStep(step + 1)}
                disabled={animating || !canContinue()}
                style={"px-14"}
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

//           <button className="flex flex-col items-center justify-center p-10 border-4 border-gray-100 shadow-xl rounded-3xl ">

export default Signup;
