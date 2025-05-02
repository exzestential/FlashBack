import { useState } from "react";
import "./FlipCard.css";

const FlipCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="w-96 h-[32rem] relative perspective-1000"> 
      <div
        className={`relative w-full h-full duration-700 transform-style-preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front of card */}
        <div className="absolute w-full h-full backface-hidden bg-blue-500 rounded-xl shadow-2xl flex flex-col justify-between p-8"> 
          <div className="flex flex-col items-center text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Front Side</h2> 
            <p className="text-white text-xl">To show the loss or gain of energy, the unit ____ is used</p> 
          </div>
          <div className="flex justify-center mt-6"> 
            <button
              onClick={handleClick}
              className="bg-white text-blue-500 px-6 py-3 rounded-lg hover:bg-blue-100 transition-colors text-lg" 
            >
              Show Answer
            </button>
          </div>
        </div>
  
        {/* Back of card */}
        <div className="absolute w-full h-full backface-hidden bg-red-500 rounded-xl shadow-2xl rotate-y-180 flex flex-col justify-between p-8">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Back Side</h2>
            <p className="text-white text-xl">decibel or dB</p>
          </div>
          <div className="flex justify-center mt-6">
            <button
              onClick={handleClick}
              className="bg-white text-red-500 px-6 py-3 rounded-lg hover:bg-red-100 transition-colors text-lg"
            >
              Show Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;