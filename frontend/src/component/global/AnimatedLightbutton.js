import React from "react";

const AnimatedLightButton = ({
  text,
  type = "button",
  onClick,
  pt,
  ps,
  pb,
  pe,
  p,
  img,
}) => {
  return (
    <div className="text">
      <button
        type={type}
        onClick={onClick}
        className={`
        text-white 
        text-sm 

        bg-white
        shadow-[0_4px_0_theme('colors.gray.200')]
        
        ${p}
        ${pt}
        ${pe}
        ${ps}
        ${pb}
        w-full 
        rounded-lg         
        transition 
      
        hover:bg-gray-200
        hover:shadow-[0_4px_0_theme('colors.gray.300')] 
        hover:translate-y-[1px] 
      
        focus:bg-gray-400
        focus:shadow-none 
        focus:translate-y-1
     `}
      >
        {img}
        {text}
      </button>
    </div>
  );
};

export default AnimatedLightButton;
