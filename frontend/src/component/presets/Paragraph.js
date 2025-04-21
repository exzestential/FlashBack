import React from 'react';

function Paragraph({ children, variant = "normal", font = "albert-sans" }) {
  const base = "text-base leading-relaxed";
  const variants = {
    normal: "text-gray-700",
    muted: "text-gray-400 italic",
    bold: "text-black font-semibold",
  };

  // font styles
  let fontClass = "";
  if (font === "nuosu-sil") {
    fontClass = "font-nuosu-sil";
  } else if (font === "abyssinca-sil") {
    fontClass = "font-abyssinca-sil";
  } else {
    fontClass = "font-albert-sans";  // default ni
  }

  return React.createElement(
    'p',
    { className: `${base} ${variants[variant]} ${fontClass}` },
    children
  );
}

export default Paragraph;
