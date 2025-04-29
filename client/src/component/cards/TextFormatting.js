import React from "react";
import {
  FaAlignCenter,
  FaAlignJustify,
  FaAlignLeft,
  FaAlignRight,
} from "react-icons/fa";

const TextFormatting = ({
  onBold,
  onItalic,
  onUnderline,
  onHyperlink,
  onTextAlignLeft,
  onTextAlignCenter,
  onTextAlignRight,
  onHighlight,
  formatStates,
}) => {
  // Helper function to apply active class to buttons based on format state
  const getButtonClasses = (formatType) => {
    return formatStates[formatType]
      ? "text-gray-600 bg-gray-300 p-2 rounded-lg outline-none"
      : "text-gray-400 p-2 rounded-lg outline-none";
  };

  return (
    <div className="flex justify-evenly text-center items-center w-full px-40 text-gray-400">
      <button
        onClick={onBold}
        className={`flex items-center justify-center text-xl h-10 w-10 font-bold ${getButtonClasses(
          "bold"
        )}`}
      >
        B
      </button>
      <button
        onClick={onItalic}
        className={`flex items-center justify-center text-xl h-10 w-10 font-italic ${getButtonClasses(
          "italic"
        )}`}
      >
        I
      </button>
      <button
        onClick={onUnderline}
        className={`flex items-center justify-center text-xl h-10 w-10 underline ${getButtonClasses(
          "underline"
        )}`}
      >
        U
      </button>

      <button
        onClick={onHyperlink}
        className={`text-xl ${getButtonClasses("hyperlink")}`}
      >
        🔗
      </button>

      <button
        onClick={onTextAlignLeft}
        className={`text-xl px-2 ${getButtonClasses("textAlignLeft")}`}
        title="Align Left"
      >
        <FaAlignLeft />
      </button>
      <button
        onClick={onTextAlignCenter}
        className={`text-xl px-2 ${getButtonClasses("textAlignCenter")}`}
        title="Align Center"
      >
        <FaAlignCenter />
      </button>
      <button
        onClick={onTextAlignRight}
        className={`text-xl px-2 ${getButtonClasses("textAlignRight")}`}
        title="Align Right"
      >
        <FaAlignRight />
      </button>

      <button
        onClick={onHighlight}
        className={`text-xl px-2 rounded-lg ${
          formatStates.highlight
            ? "bg-yellow-300 text-gray-600"
            : "bg-yellow-300 text-gray-400"
        }`}
      >
        H
      </button>
    </div>
  );
};

export default TextFormatting;
