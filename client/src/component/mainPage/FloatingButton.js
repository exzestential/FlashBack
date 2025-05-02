import React from "react";

const FloatingButton = ({ setOpen, onClick }) => {
  const handleClick = (e) => {
    e.currentTarget.blur();
    setOpen((prevState) => !prevState);
    onClick?.();
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="
          cursor-pointer
          flex items-center justify-center
          text-white text-7xl
          bg-sky-500 
          shadow-[0_4px_0_theme('colors.sky.600')]
          p-2.5
          rounded-full        
          transition 
          hover:bg-sky-400 
          hover:shadow-[0_4px_0_theme('colors.sky.500')] 
          hover:translate-y-[1px] 
          focus:bg-sky-600 
          focus:shadow-none 
          focus:translate-y-1
          disabled:opacity-50 
          disabled:cursor-not-allowed 
          disabled:hover:bg-sky-500 
          disabled:hover:shadow-[0_4px_0_theme('colors.sky.600')] 
          disabled:hover:translate-y-0
          absolute
          bottom-0
          right-0
          m-10
          h-24
          w-24
          pb-7
        "
        title="Create Deck"
      >
        +
      </button>
    </div>
  );
};

export default FloatingButton;
