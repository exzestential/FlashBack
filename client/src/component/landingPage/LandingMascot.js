import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import mascotAnimation from "../../assets/landingPage/landingPageMascot.lottie"; // adjust path as needed

const LandingMascot = () => {
  return (
    <div className="w-[555px] h-[500px]">
      <DotLottieReact src={mascotAnimation} loop autoplay />
    </div>
  );
};

export default LandingMascot;
