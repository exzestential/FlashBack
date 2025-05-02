import React from "react";

function Text({ children, variant = "normal" }) {
  const base = "text-base leading-relaxed";

  const variants = {
    normal: "text-white",
    muted: "text-gray-400 italic",
    bold: "text-black font-semibold",
  };

  const fontClass = "font-nuosu-sil"; // Only Nuosu SIL

  return (
    <p className={`${base} ${variants[variant]} ${fontClass}`}>{children}</p>
  );
}

export default Text;
