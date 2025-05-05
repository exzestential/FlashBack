import React, { useState, useEffect } from "react";
import { Modal } from "../global";

const SelectDeckModal = ({ isOpen, onClose, onSelectDeck, decks }) => {
  const [selectedDeckId, setSelectedDeckId] = useState("");

  // Reset selection when modal opens
  useEffect(() => {
    if (isOpen && decks?.length > 0) {
      setSelectedDeckId(decks[0].deck_id.toString());
    } else {
      setSelectedDeckId("");
    }
  }, [isOpen, decks]);

  const handleSelectDeck = () => {
    // Validation
    if (!selectedDeckId) {
      alert("Please select a deck");
      return;
    }

    // Find the selected deck object to get its color
    const selectedDeck = decks.find(
      (deck) => deck.deck_id.toString() === selectedDeckId.toString()
    );

    console.log("Selected deck in modal:", selectedDeck);

    // Call parent component's handler with selected deck ID
    // The parent component will handle fetching the color if needed
    onSelectDeck(selectedDeckId);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      cancelText="Cancel"
      confirmText="Select"
      onConfirm={handleSelectDeck}
    >
      <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-semibold">Select Deck</h2>
        <p className="text-gray-600">Choose which deck to add your card to:</p>

        <select
          id="deck"
          name="deck"
          value={selectedDeckId}
          className="appearance-none bg-gray-100 border border-gray-200 focus:ring-sky-700 focus:border-sky-700 focus:outline-none p-2.5 rounded-xl w-full text-gray-600"
          onChange={(e) => setSelectedDeckId(e.target.value)}
          required
        >
          <option value="" disabled>
            Select a deck
          </option>
          {decks &&
            decks.map((deck) => (
              <option key={deck.deck_id} value={deck.deck_id}>
                {deck.title}
              </option>
            ))}
        </select>
      </div>
    </Modal>
  );
};

export default SelectDeckModal;
