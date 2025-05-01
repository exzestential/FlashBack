import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  Back,
  ColoredButton,
  LightButton,
  Notification,
  Loader,
} from "../../component/global";
import { Facebook, Google } from "../../assets/global";
import { Nav } from "../../component/landingPage";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
  const [showNextButton, setShowNextButton] = useState(true);
  const [fadeNextClass, setFadeNextClass] = useState("fade-in");
  const [direction, setDirection] = useState("forward");
  const [form, setForm] = useState({
    user_type: "",
    username: "",
    email: "",
    password: "",
    interests: [],
  });

  const [notification, setNotification] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const [emailRequirementsMet, setEmailRequirementsMet] = useState({
    hasAtSymbol: false,
    validDomain: false,
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordRequirementsMet, setPasswordRequirementsMet] = useState({
    length: false,
    uppercase: false,
    number: false,
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
      setTimeout(() => setShowNextButton(false), 300);
    }
  }, [step]);

  const handleChange = (key, value) => {
    setForm((prevForm) => ({ ...prevForm, [key]: value }));
  };

  const toggleInterest = (interest) => {
    setForm((prev) => {
      const interests = prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests };
    });
  };

  const userType = [
    { name: "Teacher", imgSrc: "http://placehold.co/100" },
    { name: "Student", imgSrc: "http://placehold.co/100" },
    { name: "Other", imgSrc: "http://placehold.co/100" },
  ];

  const interestItems = [
    {
      name: "Designing",
      imgSrc: "https://cdn-icons-png.flaticon.com/128/2857/2857527.png",
    },
    {
      name: "Foreign Language",
      imgSrc: "https://cdn-icons-png.flaticon.com/128/12836/12836969.png",
    },
    {
      name: "Networking",
      imgSrc: "https://cdn-icons-png.flaticon.com/128/2082/2082812.png",
    },
    {
      name: "Media",
      imgSrc: "https://cdn-icons-png.flaticon.com/128/15127/15127687.png",
    },
    {
      name: "Coding",
      imgSrc: " https://cdn-icons-png.flaticon.com/128/1197/1197409.png",
    },
    {
      name: "History",
      imgSrc: " https://cdn-icons-png.flaticon.com/128/2234/2234770.png",
    },
    {
      name: "Virtualization",
      imgSrc: "https://cdn-icons-png.flaticon.com/128/12154/12154753.png",
    },
    {
      name: "Digital Art",
      imgSrc: "https://cdn-icons-png.flaticon.com/128/3940/3940120.png",
    },
    {
      name: "Film Making",
      imgSrc: "https://cdn-icons-png.flaticon.com/128/3874/3874166.png",
    },
    {
      name: "Culture",
      imgSrc: "https://cdn-icons-png.flaticon.com/128/17870/17870074.png",
    },
    {
      name: "Troubleshooting",
      imgSrc: "https://cdn-icons-png.flaticon.com/128/9782/9782620.png",
    },
    {
      name: "Marketing",
      imgSrc: "https://cdn-icons-png.flaticon.com/128/1260/1260235.png",
    },
  ];

  const canContinue = () => {
    if (step === 0) {
      return form.user_type !== "";
    } else if (step === 1) {
      return form.interests.length > 0;
    }
    return true;
  };

  const emailRequirements = {
    hasAtSymbol: /@/,
    validDomain: /\.[a-z]{2,}$/i, // basic domain check like .com or .org
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;

    setForm((prevForm) => ({ ...prevForm, email: newEmail }));

    setEmailRequirementsMet({
      hasAtSymbol: emailRequirements.hasAtSymbol.test(newEmail),
      validDomain: emailRequirements.validDomain.test(newEmail),
    });
  };

  const passwordRequirements = {
    length: /.{8,}/, // at least 8 characters
    uppercase: /[A-Z]/, // contains uppercase
    number: /\d/, // contains number
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setForm((prevForm) => ({ ...prevForm, password: newPassword }));

    setPasswordRequirementsMet({
      length: passwordRequirements.length.test(newPassword),
      uppercase: passwordRequirements.uppercase.test(newPassword),
      number: passwordRequirements.number.test(newPassword),
    });
  };

  useEffect(() => {
    if (
      passwordRequirementsMet.length &&
      passwordRequirementsMet.uppercase &&
      passwordRequirementsMet.number
    ) {
      const timeout = setTimeout(() => {
        setIsFocused(false);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [passwordRequirementsMet]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const isFormComplete =
    passwordRequirementsMet.length &&
    passwordRequirementsMet.uppercase &&
    passwordRequirementsMet.number &&
    emailRequirementsMet.hasAtSymbol &&
    emailRequirementsMet.validDomain;

  const handleSignupClick = async () => {
    localStorage.setItem("userData", JSON.stringify(form));
    console.log(
      "Form saved in localStorage:",
      localStorage.getItem("userData")
    );

    const email = form.email;
    const username = form.username; // ✅ Add this line

    setIsLoading(true);
    try {
      // Check if the email already exists
      const emailCheckResponse = await axios.post(
        "http://localhost:5000/api/auth/check-email",
        { email }
      );

      if (emailCheckResponse.data.registered) {
        setIsLoading(false);
        setNotification((prev) => [
          ...prev,
          {
            id: Date.now(),
            message: "Email already exists. Please use another email.",
          },
        ]);
        return;
      }

      // ✅ Check username
      const usernameCheckResponse = await axios.post(
        "http://localhost:5000/api/auth/check-username",
        { username }
      );

      if (usernameCheckResponse.data.registered) {
        setIsLoading(false);
        setNotification((prev) => [
          ...prev,
          {
            id: Date.now(),
            message: "Username already exists. Please use another username.",
          },
        ]);
        return;
      }

      // ✅ Proceed to send verification
      await axios.post("http://localhost:5000/api/auth/send-verification", {
        email,
      });

      setIsLoading(false);
      navigate("/verify");
    } catch (err) {
      setIsLoading(false);
      console.error(
        "Error during signup process:",
        err.response?.data || err.message
      );
      setNotification((prev) => [
        ...prev,
        {
          id: Date.now(),
          message: "An error occurred. Please try again later.",
        },
      ]);
    }
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

        {/* Back Button */}
        {step > 0 && (
          <div>
            <button
              onClick={() => goToStep(step - 1)}
              disabled={animating}
              className="fixed z-50 "
            >
              <div className="absolute mt-32 ms-80">
                <Back />
              </div>
            </button>
          </div>
        )}

        {/* user_type */}
        {step === 0 && (
          <div
            className={`flex flex-col items-center min-h-screen bg-white ${animationClass} transition`}
          >
            {" "}
            <div className="z-10 absolute top-1/4">
              <h2 className="text-center text-xl font-bold mb-10">I am a...</h2>
              <div className="grid grid-cols-3 gap-20">
                {userType.map((type) => (
                  <button
                    key={type}
                    onClick={() => handleChange("user_type", type.name)}
                    className={`
                  flex flex-col items-center
                  w-52 pt-10 pb-8 rounded-lg
                  text-sm text-slate-900
                  transition
                  ${
                    form.user_type === type.name
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
                    <img src={type.imgSrc} alt={type.name} className="pb-3" />
                    <span>{type.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Interests */}
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

        {/* Login Form */}
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
                        {form.email &&
                          (!emailRequirementsMet.hasAtSymbol ||
                            !emailRequirementsMet.validDomain) && (
                            <p className="text-red-500 text-xs pt-0 pb-1">
                              Please enter a valid email address.
                            </p>
                          )}
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={form.email}
                          onChange={handleEmailChange}
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
                          value={form.username}
                          onChange={(e) =>
                            handleChange(e.target.name, e.target.value)
                          }
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
                          value={form.password}
                          onFocus={handleFocus}
                          onChange={handlePasswordChange}
                          className="bg-gray-100 border border-gray-200 focus:ring-sky-700 focus:border-sky-700 focus:outline-none p-2.5 rounded-xl w-full"
                          placeholder="Password"
                          required
                        />
                        {isFocused && (
                          <div
                            className="password-requirements text-sm absolute bg-white border border-gray-300 text-gray-700 rounded-lg shadow-md p-2"
                            style={{ zIndex: 10 }}
                          >
                            <p
                              className={`${
                                passwordRequirementsMet.length
                                  ? "text-lime-500"
                                  : ""
                              }`}
                            >
                              At least 8 characters
                            </p>
                            <p
                              className={`${
                                passwordRequirementsMet.uppercase
                                  ? "text-lime-500"
                                  : ""
                              }`}
                            >
                              At least one uppercase letter
                            </p>
                            <p
                              className={`${
                                passwordRequirementsMet.number
                                  ? "text-lime-500"
                                  : ""
                              }`}
                            >
                              At least one number
                            </p>
                          </div>
                        )}
                      </div>
                      <ColoredButton
                        type="button"
                        onClick={handleSignupClick}
                        text={"Sign up"}
                        style={"mt-4"}
                        disabled={!isFormComplete}
                        fullWidth
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

export default Signup;
