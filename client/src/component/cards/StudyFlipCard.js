// src/pages/StudyPage.js
import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import FlipCard from "../components/FlipCard"; // Using your existing FlipCard component
import { FaArrowLeft } from "react-icons/fa";

const StudyPage = () => {
  const { deckId } = useParams();
  const navigate = useNavigate();

  // State variables
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const [reviewInProgress, setReviewInProgress] = useState(false);
  const [cardsInQueue, setCardsInQueue] = useState([]); // Queue for delayed cards
  const [reviewing, setReviewing] = useState(false); // Are we actively reviewing?
  const [stats, setStats] = useState({
    again: 0,
    hard: 0,
    easy: 0,
    total: 0,
  });
  const [deckInfo, setDeckInfo] = useState(null);

  // Fetch cards when component mounts
  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);

        // Get the JWT token from localStorage
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        // Fetch cards for the deck
        const response = await axios.get(
          `http://localhost:5000/api/study/${deckId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data && response.data.length > 0) {
          setCards(response.data);
          setDeckInfo({
            title: response.data[0].deck_name,
            color: response.data[0].folder_color,
          });
        } else {
          setError("No cards found in this deck.");
        }
      } catch (err) {
        console.error("Error fetching cards:", err);
        setError("Failed to load cards. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [deckId, navigate]);

  // Handle card flip
  const handleCardFlip = () => {
    setShowButtons(true);
  };

  // Submit a review and handle card reappearance
  const handleReview = async (rating) => {
    if (!cards[currentCardIndex]) return;

    setReviewInProgress(true);
    setReviewing(true);

    try {
      // Calculate delay based on rating
      let delayInSeconds;
      switch (rating.toLowerCase()) {
        case "again":
          delayInSeconds = 10;
          setStats((prev) => ({
            ...prev,
            again: prev.again + 1,
            total: prev.total + 1,
          }));
          break;
        case "hard":
          delayInSeconds = 30;
          setStats((prev) => ({
            ...prev,
            hard: prev.hard + 1,
            total: prev.total + 1,
          }));
          break;
        case "easy":
          delayInSeconds = 60;
          setStats((prev) => ({
            ...prev,
            easy: prev.easy + 1,
            total: prev.total + 1,
          }));
          break;
        default:
          delayInSeconds = 10;
      }

      // Update stats locally

      // Create a timestamp for when this card should reappear
      const currentCard = cards[currentCardIndex];
      const reappearTime = new Date(Date.now() + delayInSeconds * 1000);

      // Add to queue with reappear time
      setCardsInQueue((prev) => [
        ...prev,
        {
          card: currentCard,
          reappearTime: reappearTime,
          rating: rating,
        },
      ]);

      // Submit the review to the API
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/review",
        {
          cardId: currentCard.card_id,
          deckId: deckId,
          rating: rating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Move to the next card if available
      if (currentCardIndex < cards.length - 1) {
        setCurrentCardIndex(currentCardIndex + 1);
      } else {
        // If we've reached the end of the original deck and still have cards in queue
        if (cardsInQueue.length > 0) {
          // Just wait for queued cards
        } else {
          // Completely done with the deck
          setReviewing(false);
        }
      }
    } catch (err) {
      console.error("Error submitting review:", err);
      // Continue anyway to not block the user
    } finally {
      setShowButtons(false);
      setReviewInProgress(false);
    }
  };

  // Check for cards that should reappear
  useEffect(() => {
    if (cardsInQueue.length === 0) return;

    const timer = setInterval(() => {
      const now = new Date();
      const readyCards = [];
      const remainingCards = [];

      // Check each card in the queue
      cardsInQueue.forEach((queueItem) => {
        if (now >= queueItem.reappearTime) {
          readyCards.push(queueItem.card);
        } else {
          remainingCards.push(queueItem);
        }
      });

      // If we found cards ready to reappear
      if (readyCards.length > 0) {
        setCards((prevCards) => [...prevCards, ...readyCards]);
        setCardsInQueue(remainingCards);
      }
    }, 1000); // Check every second

    return () => clearInterval(timer);
  }, [cardsInQueue]);

  // When no more cards and reviewing is done
  useEffect(() => {
    if (
      !reviewing &&
      currentCardIndex >= cards.length &&
      cardsInQueue.length === 0
    ) {
      // Study session completed
      console.log("Study session completed!");
    }
  }, [reviewing, currentCardIndex, cards.length, cardsInQueue.length]);

  // Calculate remaining time for each card in queue
  const getQueueStatus = useCallback(() => {
    if (cardsInQueue.length === 0) return [];

    const now = new Date();
    return cardsInQueue.map((item) => {
      const secondsRemaining = Math.max(
        0,
        Math.floor((item.reappearTime - now) / 1000)
      );
      return {
        rating: item.rating,
        secondsRemaining,
      };
    });
  }, [cardsInQueue]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-red-500">
        <p>{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  // If no cards are available and none in queue, show completion
  if (
    cards.length === 0 ||
    (currentCardIndex >= cards.length && cardsInQueue.length === 0)
  ) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-bold mb-4">Study Session Complete!</h2>
        <div className="mb-6 p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Session Statistics</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-2 bg-red-100 rounded">
              <p className="text-sm">Again</p>
              <p className="text-xl font-bold">{stats.again}</p>
            </div>
            <div className="p-2 bg-yellow-100 rounded">
              <p className="text-sm">Hard</p>
              <p className="text-xl font-bold">{stats.hard}</p>
            </div>
            <div className="p-2 bg-green-100 rounded">
              <p className="text-sm">Easy</p>
              <p className="text-xl font-bold">{stats.easy}</p>
            </div>
          </div>
          <p className="mt-4 text-center">
            Total reviews: <span className="font-bold">{stats.total}</span>
          </p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Back to Decks
        </button>
      </div>
    );
  }

  const queueStatus = getQueueStatus();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header with back button and deck title */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 p-2 rounded-full hover:bg-gray-100"
          >
            <FaArrowLeft className="text-gray-600" />
          </button>
          <h1 className="text-xl font-semibold">
            {deckInfo?.title || "Study Deck"}
          </h1>
        </div>
      </header>

      {/* Main study area */}
      <div className="flex-grow flex flex-col items-center justify-center p-4">
        {/* Current card */}
        <div
          className="mb-4 transform transition-transform duration-300"
          onClick={handleCardFlip}
        >
          {cards[currentCardIndex] && (
            <FlipCard card={cards[currentCardIndex]} size="Full" />
          )}
        </div>

        {/* Review buttons */}
        <div
          className={`flex space-x-4 mt-4 transition-opacity duration-300 ${
            showButtons ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            disabled={reviewInProgress}
            onClick={() => handleReview("again")}
            className="px-6 py-2 bg-red-500 text-white rounded-lg disabled:opacity-50"
          >
            Again (10s)
          </button>
          <button
            disabled={reviewInProgress}
            onClick={() => handleReview("hard")}
            className="px-6 py-2 bg-yellow-500 text-white rounded-lg disabled:opacity-50"
          >
            Hard (30s)
          </button>
          <button
            disabled={reviewInProgress}
            onClick={() => handleReview("easy")}
            className="px-6 py-2 bg-green-500 text-white rounded-lg disabled:opacity-50"
          >
            Easy (60s)
          </button>
        </div>
      </div>

      {/* Queue status and stats */}
      <div className="bg-white shadow-sm p-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="stats flex space-x-3">
              <span className="text-red-500">Again: {stats.again}</span>
              <span className="text-yellow-500">Hard: {stats.hard}</span>
              <span className="text-green-500">Easy: {stats.easy}</span>
            </div>
            <div className="queue-info">
              <span>Cards in queue: {queueStatus.length}</span>
              {queueStatus.length > 0 && (
                <span className="ml-2 text-sm text-gray-500">
                  (Next: {queueStatus[0].secondsRemaining}s)
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyPage;
