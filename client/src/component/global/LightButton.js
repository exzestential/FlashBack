import React from "react";

const LightButton = ({
  text,
  onClick,
  img = null,
  imgClass = null,
  style = null,
  fullWidth = false, // NEW PROP
}) => {
  return (
    <div className="light-button">
      <button
        onClick={onClick}
        className={`${style} ${
          fullWidth ? "w-full" : null
        } flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-700 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-black focus:z-10 focus:ring-4 focus:ring-gray-100 `}
      >
        <img src={img} className={imgClass} />
        {text}
      </button>
    </div>
  );
};

export default LightButton;
