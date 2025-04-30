import React from "react";

const ColoredButton = ({
  text,
  type = "button",
  onClick,
  disabled = false,
  fullWidth = false, // NEW PROP
  style = "",
  img = "",
  imgClass = "",
}) => {
  const handleClick = (e) => {
    e.currentTarget.blur();
    onClick?.();
  };

  return (
    <div>
      <button
        type={type}
        onClick={handleClick}
        className={`
          ${style}
          cursor-pointer
          flex items-center justify-center
          text-white text-sm 
          bg-sky-500 
          shadow-[0_4px_0_theme('colors.sky.600')]
          p-2.5
          ${fullWidth ? "w-full" : ""}
          rounded-lg         
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
        `}
        disabled={disabled}
      >
        {img && <img src={img} className={imgClass} />}
        {text}
      </button>
    </div>
  );
};

export default ColoredButton;
