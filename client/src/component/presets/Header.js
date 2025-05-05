import React from "react";

function Header({ children, style = "" }) {
  return (
    <h1 className={`text-3xl font-bold ${style} mb-4 font-albert-sans`}>
      {children}
    </h1>
  );
}

export default Header;
