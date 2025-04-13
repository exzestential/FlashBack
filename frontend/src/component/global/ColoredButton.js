import React from "react";

const ColoredButton = ({
  text,
  type = "button",
  onClick,
  style = "",
  img = "",
  imgClass = "",
}) => {
  const handleClick = (e) => {
    e.currentTarget.blur(); // remove focus style
    onClick?.(); // call the actual onClick handler if provided
  };
  return (
    <div className="text">
      <button
        type={type}
        onClick={handleClick}
        className={`
        ${style}
        cursor-pointer

        flex items-center justify-center

        text-white text-sm 

        bg-sky-600 
        shadow-[0_4px_0_theme('colors.sky.700')]

        p-2.5
        w-full 
        rounded-lg         
        transition 
      
        hover:bg-sky-500 
        hover:shadow-[0_4px_0_theme('colors.sky.600')] 
        hover:translate-y-[1px] 
      
        focus:bg-sky-700 
        focus:shadow-none 
        focus:translate-y-1
      `}
      >
        <img src={img} className={imgClass} />
        {text}
      </button>
    </div>
  );
};

export default ColoredButton;
