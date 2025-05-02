import React from "react";
import { HiDotsCircleHorizontal } from "react-icons/hi";

const Settings = () => {
  return (
    <button 
      className="text-3xl text-gray-400 hover:text-gray-600 
                 transition-colors duration-200 focus:outline-none
                 focus:ring-2 focus:ring-blue-500 focus:rounded-full"
      aria-label="Settings"
    >
      <HiDotsCircleHorizontal />
    </button>
  );
};

export default Settings;