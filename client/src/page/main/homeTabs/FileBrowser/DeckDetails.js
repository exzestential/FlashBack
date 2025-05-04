//deckdetail.js
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";

import { SideNav, Back, Loader } from "../../../../component/global";
import { LightFloatingButton } from "../../../../component/mainPage";
import { FlipCard } from "../../../../component/cards";

const DeckDetails = () => {
  const navigate = useNavigate();
  const { deckId } = useParams();

  const [cards, setCards] = useState([]);
  const [deckInfo, setDeckInfo] = useState({
    deck_name: "",
    folder_color: "gray",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCards = async () => {
      setIsLoading(true); // Set loading to true when the fetch starts
      try {
        const cardRes = await fetch(
          `http://localhost:5000/api/decks/${deckId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!cardRes.ok) {
          throw new Error(`Failed to fetch cards: ${cardRes.status}`);
        }

        const cardData = await cardRes.json();
        setCards(cardData); // Set the fetched cards into state

        // Extract deck info from the first card if available
        if (cardData.length > 0) {
          setDeckInfo({
            deck_name: cardData[0].deck_name,
            folder_color: cardData[0].folder_color,
          });
        }
      } catch (err) {
        console.error("Error fetching cards: ", err);
        setError("Failed to load cards"); // Handle error
      } finally {
        setIsLoading(false); // Set loading to false after the fetch finishes
      }
    };

    fetchCards(); // Actually call the function to fetch the cards
  }, [deckId]); // Run this effect when the `deckId` changes

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">
            Error loading folder data
          </h2>
          <p>{error}</p>
          <button
            onClick={() => navigate("/home")}
            className="mt-4 bg-sky-700 text-white px-4 py-2 rounded-lg"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="page-container flex min-h-screen">
        <div className="relative w-full flex flex-col">
          <div className="flex justify-between items-center p-4 shadow-sm border z-10 border-b-gray-200">
            <div className="flex items-center">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center space-x-4 mr-4 text-gray-600 "
              >
                <Back /> <p className="text-xl">Back</p>
              </button>
              <h1 className="text-2xl font-bold">
                <span
                  className={`inline-block w-4 h-4 rounded-full bg-${deckInfo.folder_color}-500 mr-2`}
                ></span>
                {deckInfo.deck_name}
              </h1>
            </div>
          </div>

          <div className="bg-gray-100 grow overflow-auto p-8 px-20">
            {cards.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {cards.map((card) => (
                  <div
                    key={card.card_id}
                    className={card.isLoading ? "opacity-50" : ""}
                  >
                    <FlipCard card={card} size="Thumbnail" />
                    {card.isLoading && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sky-700"></div>
                      </div>
                    )}
                  </div>
                ))}
                <div className="flex items-start mt-11 justify-start">
                  <LightFloatingButton onClick={null} />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64">
                <div className="text-gray-500 text-lg mb-4">
                  No cards in this folder yet
                </div>
                <button
                  onClick={null}
                  className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
                >
                  Create a Deck
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DeckDetails;
