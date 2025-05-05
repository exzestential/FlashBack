import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import ComingSoon from "./ComingSoon.lottie"; // adjust path as needed

const CSlottie = () => {
  return (
    <div className="w-[455px] h-[400px]">
      <DotLottieReact src={ComingSoon} loop autoplay />
    </div>
  );
};

export default CSlottie;
