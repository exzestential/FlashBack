import React from "react";
import { CSlottie } from "../../assets";
import { Header } from "../presets";

const ComingSoon = () => {
  return (
    <div className="flex flex-grow items-center justify-center h-full w-full">
      <div className="flex flex-col items-center">
        <Header>Coming Soon</Header>
        <CSlottie />
      </div>
    </div>
  );
};

export default ComingSoon;
