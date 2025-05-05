import React from "react";

function Brand({ children }) {
  return (
    <div className="flex items-center space-x-3 text-2xl font-bold font-ubuntu">
      <div>{children}</div>
    </div>
  );
}

export default Brand;
