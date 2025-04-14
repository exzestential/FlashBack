import React, { useState } from "react";
import { Back, ColoredButton, LightButton } from "../component/global"
import Nav from "../component/landingPage/Nav";
import { Facebook, Google } from "../assets/global";
import "../styles/page/Signup.css";

const Signup = () => {
  const [step, setStep] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
  const [direction, setDirection] = useState("forward");
  const [form, setForm] = useState({
    userType: "",
    interests: [],
    hasUniversityEmail: "",
    email: "",
    password: "",
  });

  const goToStep = (targetStep) => {
    if (animating || targetStep === step) return;

    const isForward = targetStep > step;
    setDirection(isForward ? "forward" : "backward");

    setAnimating(true);
    setAnimationClass(isForward ? "slide-left" : "slide-right");

    setTimeout(() => {
      setStep(targetStep);
      setAnimationClass(isForward ? "slide-right" : "slideLeft");

      setTimeout(() => {
        setAnimating(false);
        setAnimationClass("");
      }, 500);
    }, 500);
  };

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

  const handleSignupClick = () => {
    // figure out the api lmaooo
  };
  return (
    <div className="relative overflow-x-hidden signup-container">
      <Nav />
      {step > 0 && (
        <div>
          <button
            onClick={() => goToStep(step - 1)}
            disabled={animating}
            className="fixed"
          >
            <Back />
          </button>
        </div>
      )}

      {step === 0 && (
        <div className="flex flex-col items-center min-h-screen bg-white">
          <div className="absolute top-1/4">
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
        <div className="slide-right flex flex-col items-center min-h-screen bg-white transition">
          <div className="absolute top-1/4">
            <h2 className="text-center text-xl font-bold mb-10">
              What are you interested in?
            </h2>
            <div className="mx-96 mb-52">
              <div className="grid grid-cols-4 gap-14 place-items-center">
                {interestItems.map((item) => {
                  // When on step 1, force the "pressed" look
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
        <div className="h-screen flex items-start justify-center pt-44 overflow-hidden bg-white">
          <div className="animate-slide-up-center flex flex-col justify-end ">
            <h2 className="text-center text-xl font-bold mb-5 mt-32">
              Great! Let's set up your account!
            </h2>
            <div className="fade-in w-80">
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
                        type="password"
                        id="password"
                        name="password"
                        className="bg-gray-100 border border-gray-200 focus:ring-sky-700 focus:border-sky-700 focus:outline-none p-2.5 my-2.5 rounded-xl w-full"
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
                  By signing in to FlashBack, you agree to our Terms and Privacy
                  Policy.
                </p>
                <p>
                  This site is protected by reCAPTCHA Enterprise and the Google
                  Privacy Policy and Terms of Service apply.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {step < 3 && (
        <div className="next fixed bottom-0 border-t-2 border-gray-200 w-full p-6 pe-10 bg-white">
          <div className="flex justify-end items-center">
            <ColoredButton
              text={"Continue"}
              onClick={() => goToStep(step + 1)}
              disabled={animating}
              style={"px-14"}
            />
          </div>
        </div>
      )}
    </div>
  );
};

//           <button className="flex flex-col items-center justify-center p-10 border-4 border-gray-100 shadow-xl rounded-3xl ">

export default Signup;
