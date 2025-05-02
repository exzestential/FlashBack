import React from "react";

const LightFloatingButton = ({ onClick }) => {
  const handleClick = (e) => {
    e.currentTarget.blur();
    onClick?.();
  };

  return (
    <div>
      <button
        onClick={handleClick}
        type="button"
        title="Create Deck"
        className="
          flex items-center justify-center
          text-7xl text-gray-700
          bg-gray-100 border-dashed border-4 border-gray-200 rounded-full
          hover:bg-gray-100 hover:text-black
          focus:outline-none focus:z-10 focus:ring-4 focus:ring-gray-100
          transition cursor-pointer
          p-2.5 pb-7 h-24 w-24
        "
      >
        +
      </button>
    </div>
  );
};

export default LightFloatingButton;
