import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import mascotAnimation from "../../assets/landingPage/landingPageMascot.lottie"; // adjust path as needed

const LandingMascot = () => {
  return (
    <div className="w-[455px] h-[400px]">
      <DotLottieReact src={mascotAnimation} loop autoplay />
    </div>
  );
};

export default LandingMascot;
