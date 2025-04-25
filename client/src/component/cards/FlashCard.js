import { useState } from "react";
import "../../styles/component/flashcard/FlashCard.css";

export default function FlipCard() {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="w-64 h-96 relative perspective-1000">
      <div
        className={`relative w-full h-full duration-700 transform-style-preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front of card */}
        <div className="absolute w-full h-full backface-hidden bg-blue-500 rounded-lg shadow-lg flex flex-col justify-between p-6">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Front Side</h2>
            <p className="text-white">ts gay</p>
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={handleClick}
              className="bg-white text-blue-500 px-4 py-2 rounded-md hover:bg-blue-100 transition-colors"
            >
              Flip Card
            </button>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute w-full h-full backface-hidden bg-red-500 rounded-lg shadow-lg rotate-y-180 flex flex-col justify-between p-6">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Back Side</h2>
            <p className="text-white">homo</p>
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={handleClick}
              className="bg-white text-red-500 px-4 py-2 rounded-md hover:bg-red-100 transition-colors"
            >
              Flip Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
