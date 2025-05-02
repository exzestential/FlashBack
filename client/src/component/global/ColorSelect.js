import React, { useState } from "react";

const ColorSelect = ({ setFolderColor }) => {
  const tailwindColors = [
    "red",
    "yellow",
    "green",
    "blue",
    "indigo",
    "purple",
    "pink",
    "rose",
    "amber",
    "lime",
    "emerald",
    "teal",
    "cyan",
    "sky",
    "violet",
    "fuchsia",
    "gray",
    "slate",
    "zinc",
    "neutral",
    "stone",
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");

  const handleSelectColor = (color) => {
    setSelectedColor(color);
    setFolderColor(color); // just "rose", not "rose-500"
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <button
        type="button"
        className="appearance-none bg-gray-100 border border-gray-200 focus:ring-sky-700 focus:border-sky-700 focus:outline-none p-2.5 rounded-xl w-full text-gray-600 flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedColor ? (
          <div className="flex items-center gap-2">
            <span
              className={`w-5 h-5 rounded-full bg-${selectedColor}-500`}
            ></span>
            <span className="capitalize">{selectedColor}</span>
          </div>
        ) : (
          "Select Folder Color"
        )}
        <svg
          className={`w-4 h-4 ml-2 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 bg-white border border-gray-200 mt-2 rounded-xl p-3 w-full max-h-60 overflow-y-auto shadow-lg">
          <div className="grid grid-cols-6 gap-2">
            {tailwindColors.map((color) => (
              <div key={color} className="flex items-center justify-center">
                <div
                  onClick={() => handleSelectColor(color)}
                  className={`w-8 h-8 rounded-full bg-${color}-500 cursor-pointer border border-gray-300 hover:ring-2 hover:ring-sky-600`}
                  title={color}
                ></div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorSelect;
