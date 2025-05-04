import React from "react";

function subheader({ text = "This is a pre-header", logoUrl = null }) {
  return (
    <div className="flex items-center space-x-3 p-3">
      <h2 className="text-lg font-bold text-gray-800 font-futura">{text}</h2>
    </div>
  );
}

export default subheader;
