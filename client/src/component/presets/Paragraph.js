import React from 'react';

function Paragraph({ children, variant = "normal" }) {
  const base = "text-base leading-relaxed";
  
  const variants = {
    normal: "text-gray-700",
    muted: "text-gray-400 italic",
    bold: "text-black font-semibold",
  };

  const fontClass = "font-nuosu-sil";  // Only Nuosu SIL

  return React.createElement(
    'p',
    { className: `${base} ${variants[variant]} ${fontClass}` },
    children
  );
}

export default Paragraph;
