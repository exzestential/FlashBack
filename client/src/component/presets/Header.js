import React from "react";

function Header({ title, style = "" }) {
  return React.createElement(
    "h1",
    { className: `text-3xl font-bold ${style} mb-4 font-albert-sans` },
    title
  );
}

export default Header;
