import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";

import { SideNav, Back, Loader } from "../../../../component/global";
import { LightFloatingButton } from "../../../../component/mainPage";
import { FlipCard } from "../../../../component/cards";
import { Notification } from "../../../../component/global";

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
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchDeckAndCards();
  }, [deckId]);

  const fetchDeckAndCards = async () => {
    setIsLoading(true);
    try {
      // Fetch deck details and cards in one request
      const cardRes = await fetch(`http://localhost:5000/api/decks/${deckId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!cardRes.ok) {
        throw new Error(`Failed to fetch deck data: ${cardRes.status}`);
      }

      const cardData = await cardRes.json();
      setCards(cardData);

      // Extract deck info from the first card if available
      if (cardData.length > 0) {
        setDeckInfo({
          deck_name: cardData[0].deck_name,
          folder_color: cardData[0].folder_color,
        });
      }
    } catch (err) {
      console.error("Error fetching data: ", err);
      setError("Failed to load deck data");
      showNotification("Failed to load deck data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const showNotification = (message) => {
    setNotifications((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), message },
    ]);
  };

  const handleCreateCard = () => {
    navigate(`/create/deck/${deckId}`);
  };

  // Handle card deletion
  const handleDeleteCard = async (deletedCardId) => {
    try {
      const deleteResponse = await fetch(
        `http://localhost:5000/api/cards/${deletedCardId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!deleteResponse.ok) {
        throw new Error("Failed to delete card");
      }

      setCards(cards.filter((card) => card.card_id !== deletedCardId));
      showNotification("Card deleted successfully");
    } catch (error) {
      console.error("Error deleting card:", error);
      showNotification("Failed to delete card. Please try again.");
    }
  };

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
                className="flex items-center space-x-4 mr-4 text-gray-600"
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
            <div className="flex items-center space-x-4"></div>
          </div>

          <div className="bg-gray-100 grow overflow-auto p-8 px-20">
            <h2 className="text-lg font-medium mb-4">Cards ({cards.length})</h2>

            {cards.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {cards.map((card) => (
                  <div
                    key={card.card_id}
                    className={card.isLoading ? "opacity-50" : ""}
                  >
                    <FlipCard
                      card={card}
                      size="Thumbnail"
                      onDelete={() => handleDeleteCard(card.card_id)}
                    />
                    {card.isLoading && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sky-700"></div>
                      </div>
                    )}
                  </div>
                ))}
                <div className="flex items-start mt-11 justify-start">
                  <LightFloatingButton onClick={handleCreateCard} />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64">
                <div className="text-gray-500 text-lg mb-4">
                  No cards in this folder yet
                </div>
                <button
                  onClick={handleCreateCard}
                  className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
                >
                  Create a Card
                </button>
              </div>
            )}
          </div>

          {/* Notifications */}
          <Notification
            notification={notifications}
            setNotification={setNotifications}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default DeckDetails;
