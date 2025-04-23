import React from "react";
import { useNavigate } from "react-router-dom";

const DeckCard = ({ deck }) => {
  const navigate = useNavigate();

  return (
    <div className="deck-card h-36 rounded-2xl bg-white shadow-sm flex flex-col">
      <div className="h-1/3 bg-slate-500 rounded-t-2xl"></div>
      <div className="px-2 pb-1 flex flex-col flex-grow">
        <p className="p-0 text-lg">Title</p>
        <p className="p-0 text-sm">GAy</p>
        <p className="p-0 text-sm mt-auto">123 Cards</p>
      </div>
    </div>
  );
};

export default DeckCard;
