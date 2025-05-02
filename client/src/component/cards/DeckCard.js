import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const DeckCard = ({ deck }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.div
      className="deck-card relative h-36 rounded-2xl"
      onHoverStart={() => setIsHovered(true)} // Track hover start
      onHoverEnd={() => setIsHovered(false)} // Track hover end
    >
      {/* Cards inside white jacket */}
      <motion.div
        className="absolute inset-0" // Key: absolute so the movement reflects visually
        animate={{ y: isHovered ? -6 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <div
          className={`absolute inset-0 bg-${deck.folder_color}-600 z-0 rounded-2xl`}
        />
        <div
          className={`absolute inset-0 bg-${deck.folder_color}-500 left-2 z-10 rounded-2xl`}
        />
        <div
          className={`absolute inset-0 bg-${deck.folder_color}-400 left-4 z-20 rounded-2xl`}
        />
      </motion.div>

      {/* White jacket in front, positioned at bottom */}
      <motion.div
        animate={{ y: isHovered ? 6 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="absolute bottom-0 left-0 right-0 h-3/4 z-30 flex flex-col"
      >
        <div className="relative bg-white shadow-sm rounded-b-2xl flex flex-col h-full z-30 ps-2">
          <div className="px-1 py-1 flex flex-col flex-grow text-gray-700">
            <p className="p-0 text-lg">{deck.title}</p>
            <p className="p-0 text-sm">{deck.description}</p>
            <p className="p-0 text-sm mt-auto mb-1">{deck.card_count} cards</p>
          </div>
        </div>

        {/* Shadow attached just above the white jacket */}
        <div className="absolute -top-1 left-0 right-0 h-4 bg-gradient-to-b from-transparent to-black/10 pointer-events-none z-0"></div>
      </motion.div>
    </motion.div>
  );
};

export default DeckCard;
