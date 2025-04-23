import React from "react";

const LightButton = ({ text, onClick, img = "", imgClass = "" }) => {
  return (
    <div className="light-button">
      <button
        onClick={onClick}
        className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-slate-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-cyan-600 focus:z-10 focus:ring-4 focus:ring-gray-100 w-full"
      >
        <img src={img} className={imgClass} />
        {text}
      </button>
    </div>
  );
};

export default LightButton;
