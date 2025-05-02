import React, { useState, useEffect } from "react";
import { DeckCard } from "../../../component/cards";

const DecksTab = () => {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/decks", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Pass JWT token
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setDecks(data);
      })
      .catch((err) => console.error("Failed to fetch decks:", err));
  }, []);

  return (
    <div className="mx-40">
      <div className="grid grid-cols-1 my-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 110:grid-cols-5 gap-10">
        {decks.map((deck) => (
          <DeckCard key={deck.deck_id} deck={deck} />
        ))}
      </div>
    </div>
  );
};

export default DecksTab;
