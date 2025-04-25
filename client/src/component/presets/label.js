import React from "react";

function Label({ children, variant = "normal" }) {
  const base = "text-sm font-medium";

  const variants = {
    normal: "text-gray-800",
    muted: "text-gray-500",
    bold: "text-black font-bold",
  };

  const fontClass = "font-encode-sans"; // Using Encode Sans Semi Expanded

  return React.createElement(
    "label",
    { className: `${base} ${variants[variant]} ${fontClass}` },
    children
  );
}

export default Label;
