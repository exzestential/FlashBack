import React from "react";

function SubHeader({ children }) {
  return (
    <div className="flex items-center space-x-3 p-3">
      <h2 className="text-xl font-bold font-futura">{children}</h2>
    </div>
  );
}

export default SubHeader;
