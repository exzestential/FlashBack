import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Back,
  Options,
  Save,
  SideNav,
  Notification,
  ColoredButton,
  Forward,
} from "../../component/global";
import { TextFormatting, SingleCard } from "../../component/cards";
import { SelectDeckModal } from "../../component/mainPage";

const CreateCard = () => {
  const navigate = useNavigate();
  const { cardId, deckId } = useParams(); // For editing existing cards or creating within a specific deck

  // States
  const [notifications, setNotifications] = useState([]);
  const [activeCard, setActiveCard] = useState("front");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [decks, setDecks] = useState([]);
  const [selectedDeckId, setSelectedDeckId] = useState("");
  const [isSelectDeckModalOpen, setIsSelectDeckModalOpen] = useState(false);
  const [cardData, setCardData] = useState({
    front_content: "",
    back_content: "",
    front_image_url: null,
    back_image_url: null,
    notes: "",
  });
  const [deckColor, setDeckColor] = useState("sky"); // Default color
  const [isNewCard, setIsNewCard] = useState(!cardId); // Track if we're creating a new card

  const [formatStates, setFormatStates] = useState({
    bold: false,
    italic: false,
    underline: false,
    hyperlink: false,
    textAlignLeft: true, // Default to left alignment
    textAlignCenter: false,
    textAlignRight: false,
    highlight: false,
  });

  // Refs to access the contentEditable elements
  const frontCardRef = useRef(null);
  const backCardRef = useRef(null);

  // Fetch decks when component mounts
  useEffect(() => {
    fetchDecks();

    // If editing an existing card, fetch its data
    if (cardId) {
      console.log("Editing existing card with ID:", cardId);
      setIsNewCard(false);
      fetchCardData(cardId);
    }
    // If creating a card in a specific deck
    else if (deckId) {
      console.log("Creating card in deck with ID:", deckId);
      setIsNewCard(true);
      setSelectedDeckId(deckId);
      fetchDeckDetails(deckId);
    }
    // If neither, show deck selection modal when component mounts
    else {
      console.log("No card or deck ID provided, showing deck selection modal");
      setIsNewCard(true);
      setIsSelectDeckModalOpen(true);
    }
  }, []);

  // Fetch user's decks
  const fetchDecks = async () => {
    try {
      console.log("🔄 Fetching decks...");
      console.log("🔄 Current selectedDeckId:", selectedDeckId);
      console.log("🔄 Current deckColor:", deckColor);

      const response = await fetch("http://localhost:5000/api/decks", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch decks");

      const data = await response.json();
      console.log("🔄 Fetched decks:", data);
      setDecks(data);

      // Only set the default deck if we don't already have one selected
      if (data.length > 0 && !deckId && !selectedDeckId) {
        console.log("🔄 Setting default deck:", data[0]);
        console.log("🔄 deckId from params:", deckId);
        console.log("🔄 selectedDeckId state:", selectedDeckId);

        setSelectedDeckId(data[0].deck_id);
        // Set the deck color from the first deck
        setDeckColor(data[0].folder_color || "sky");
        console.log(
          "🔄 Set default deck color to:",
          data[0].folder_color || "sky"
        );
      } else {
        console.log(
          "🔄 Not setting default deck - already have selection or params"
        );
      }
    } catch (error) {
      console.error("Error fetching decks:", error);
      showNotification("Failed to load decks. Please try again.");
    }
  };

  // Fetch specific deck details to get its color
  const fetchDeckDetails = async (deckId) => {
    const requestTime = Date.now();
    console.log(
      `⏱️ [${requestTime}] Starting fetchDeckDetails for deck:`,
      deckId
    );

    try {
      console.log(`⏱️ [${requestTime}] Fetching details for deck:`, deckId);
      console.log(
        `⏱️ [${requestTime}] API URL:`,
        `http://localhost:5000/api/decks/${deckId}`
      );

      const token = localStorage.getItem("token");
      console.log(`⏱️ [${requestTime}] Auth token available:`, !!token);

      const response = await fetch(
        `http://localhost:5000/api/decks/${deckId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(`⏱️ [${requestTime}] Response status:`, response.status);

      if (!response.ok) {
        console.error(
          `⏱️ [${requestTime}] Failed to fetch deck info, status:`,
          response.status
        );
        throw new Error("Failed to fetch deck info");
      }

      const deckInfo = await response.json();
      console.log(`⏱️ [${requestTime}] Fetched deck details:`, deckInfo);
      console.log(
        `⏱️ [${requestTime}] Folder color from API:`,
        deckInfo.folder_color
      );

      // Check if the returned data has the expected structure
      if (!deckInfo.folder_color) {
        console.warn(
          `⏱️ [${requestTime}] API response doesn't contain folder_color! Full response:`,
          deckInfo
        );
      }

      console.log(
        `⏱️ [${requestTime}] Before setting color - current state:`,
        deckColor
      );
      setDeckColor(deckInfo.folder_color || "sky");
      console.log(
        `⏱️ [${requestTime}] Set deck color to:`,
        deckInfo.folder_color || "sky"
      );

      // Create a timeout to check if the color persists
      setTimeout(() => {
        console.log(
          `⏱️ [${requestTime}] Checking color 1 second after fetch:`,
          deckColor
        );
      }, 1000);
    } catch (error) {
      console.error(`⏱️ [${requestTime}] Error fetching deck info:`, error);
      // Use default color if we can't fetch the deck color
      console.log(`⏱️ [${requestTime}] Using default 'sky' color due to error`);
      setDeckColor("sky");
    }
  };

  const fetchCardData = async (id) => {
    setIsLoading(true);
    try {
      console.log("Fetching card data for ID:", id);
      const response = await fetch(`http://localhost:5000/api/cards/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch card");

      const card = await response.json();
      console.log("Fetched card data:", card);
      setCardData(card);
      setSelectedDeckId(card.deck_id);
      console.log("Card belongs to deck:", card.deck_id);

      // Set the deck color from the card data
      if (card.folder_color) {
        console.log("Setting color from card data:", card.folder_color);
        setDeckColor(card.folder_color);
      } else {
        console.log("Card doesn't have folder_color, fetching from deck");
        // If card doesn't have folder_color, fetch it from the deck
        fetchDeckDetails(card.deck_id);
      }

      if (frontCardRef.current && card.front_content) {
        frontCardRef.current.setContent(card.front_content);
      }

      if (backCardRef.current && card.back_content) {
        backCardRef.current.setContent(card.back_content);
      }
    } catch (error) {
      console.error("Error fetching card:", error);
      showNotification("Failed to load card data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Check formatting status when selection changes
  useEffect(() => {
    const checkFormatting = () => {
      // Check text alignment
      const isLeftAligned = document.queryCommandState("justifyLeft");
      const isCenterAligned = document.queryCommandState("justifyCenter");
      const isRightAligned = document.queryCommandState("justifyRight");

      // If none are explicitly set, default to left alignment
      const effectiveLeftAlign =
        isLeftAligned || (!isCenterAligned && !isRightAligned);

      setFormatStates({
        bold: document.queryCommandState("bold"),
        italic: document.queryCommandState("italic"),
        underline: document.queryCommandState("underline"),
        textAlignLeft: effectiveLeftAlign,
        textAlignCenter: isCenterAligned,
        textAlignRight: isRightAligned,
        // Cannot easily check highlight and hyperlink states
        highlight: false,
        hyperlink: false,
      });
    };

    // Add event listener for selection changes
    document.addEventListener("selectionchange", checkFormatting);

    // Clean up
    return () => {
      document.removeEventListener("selectionchange", checkFormatting);
    };
  }, []);

  // Update deck color when selecting a new deck
  useEffect(() => {
    if (selectedDeckId) {
      console.log("📌 Selected deck ID changed to:", selectedDeckId);
      console.log("📌 Current decks array:", decks);

      const selectedDeck = decks.find(
        (deck) => deck.deck_id.toString() === selectedDeckId.toString()
      );

      console.log("📌 Found deck in array?", !!selectedDeck);

      if (selectedDeck && selectedDeck.folder_color) {
        console.log(
          "📌 Found deck color in local data:",
          selectedDeck.folder_color
        );
        console.log("📌 Previous color was:", deckColor);
        setDeckColor(selectedDeck.folder_color);
      } else {
        console.log(
          "📌 Could not find deck color in local data, fetching from API"
        );
        // If we can't find the color in our local decks, fetch it
        fetchDeckDetails(selectedDeckId);
      }
    }
  }, [selectedDeckId, decks]);

  // Log when deckColor changes
  useEffect(() => {
    console.log("⭐ Deck color changed to:", deckColor);
    console.log("⭐ Timestamp:", new Date().toISOString());
    console.log("⭐ Current selected deck ID:", selectedDeckId);

    // Add a timeout to check if the color changes back
    const timeoutId = setTimeout(() => {
      console.log("🔍 Checking color after 500ms:", deckColor);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [deckColor, selectedDeckId]);

  const showNotification = (message) => {
    setNotifications((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), message },
    ]);
  };

  // Handle deck selection
  const handleSelectDeck = (deckId) => {
    console.log("User selected deck:", deckId);
    console.log("Current decks array:", decks);

    setSelectedDeckId(deckId);
    setIsSelectDeckModalOpen(false);

    // Get the color for the selected deck
    const selectedDeck = decks.find(
      (deck) => deck.deck_id.toString() === deckId.toString()
    );
    console.log("Found selected deck:", selectedDeck);

    if (selectedDeck && selectedDeck.folder_color) {
      console.log(
        "Setting color from selected deck:",
        selectedDeck.folder_color
      );
      setDeckColor(selectedDeck.folder_color);
    } else {
      console.log(
        "Selected deck not found in local data or has no color, fetching details"
      );
      console.log("Type of deckId:", typeof deckId);
      console.log(
        "Type of deck.deck_id for first deck:",
        decks.length > 0 ? typeof decks[0].deck_id : "no decks"
      );
      fetchDeckDetails(deckId);
    }
  };

  // Get the active card ref
  const getActiveCardRef = () => {
    return activeCard === "front" ? frontCardRef : backCardRef;
  };

  // Formatting actions with toggle functionality
  const toggleFormat = (command, value = null) => {
    // Focus the active card first
    const activeRef = getActiveCardRef();
    if (activeRef.current) {
      activeRef.current.focus();

      // Apply formatting using document.execCommand
      document.execCommand("styleWithCSS", false, true); // Use CSS for styling
      document.execCommand(command, false, value);

      // Update format states after applying format
      setFormatStates((prevStates) => ({
        ...prevStates,
        [command]: document.queryCommandState(command),
      }));
    }
  };

  const handleBold = () => toggleFormat("bold");
  const handleItalic = () => toggleFormat("italic");
  const handleUnderline = () => toggleFormat("underline");

  const handleHyperlink = () => {
    const isLink = document.queryCommandState("createLink");

    if (isLink) {
      // Remove link
      document.execCommand("unlink", false, null);
    } else {
      // Add link
      const url = prompt("Enter URL:");
      if (url) toggleFormat("createLink", url);
    }

    // Update hyperlink state
    setFormatStates((prev) => ({
      ...prev,
      hyperlink: !isLink && document.queryCommandState("createLink"),
    }));
  };

  const handleTextAlignLeft = () => {
    toggleFormat("justifyLeft");
    setFormatStates((prev) => ({
      ...prev,
      textAlignLeft: true,
      textAlignCenter: false,
      textAlignRight: false,
    }));
  };

  const handleTextAlignCenter = () => {
    toggleFormat("justifyCenter");
    setFormatStates((prev) => ({
      ...prev,
      textAlignLeft: false,
      textAlignCenter: true,
      textAlignRight: false,
    }));
  };

  const handleTextAlignRight = () => {
    toggleFormat("justifyRight");
    setFormatStates((prev) => ({
      ...prev,
      textAlignLeft: false,
      textAlignCenter: false,
      textAlignRight: true,
    }));
  };

  const handleHighlight = () => {
    const isHighlighted = document.queryCommandValue("backColor") === "yellow";
    toggleFormat("backColor", isHighlighted ? "transparent" : "yellow");

    // Update highlight state
    setFormatStates((prev) => ({
      ...prev,
      highlight: !isHighlighted,
    }));
  };

  // Handle card switching
  const setActive = (cardSide) => {
    setActiveCard(cardSide);
    setTimeout(() => {
      const ref = cardSide === "front" ? frontCardRef : backCardRef;
      if (ref.current) {
        ref.current.focus();
      }
    }, 0);
  };

  const saveCard = async () => {
    if (!selectedDeckId) {
      showNotification("Please select a deck first");
      setIsSelectDeckModalOpen(true);
      return;
    }

    if (!frontCardRef.current || !backCardRef.current) {
      showNotification("Card content cannot be accessed");
      return;
    }

    const frontContent = frontCardRef.current.getContent();
    const backContent = backCardRef.current.getContent();

    if (!frontContent.trim() && !backContent.trim()) {
      showNotification(
        "Card cannot be empty. Please add content to at least one side."
      );
      return;
    }

    setIsSaving(true);

    const cardPayload = {
      deck_id: selectedDeckId,
      front_content: frontContent,
      back_content: backContent,
      front_image_url: cardData.front_image_url || null,
      back_image_url: cardData.back_image_url || null,
      notes: cardData.notes || "",
    };

    try {
      const method = cardId ? "PUT" : "POST";
      const url = cardId
        ? `http://localhost:5000/api/cards/${cardId}`
        : "http://localhost:5000/api/cards";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(cardPayload),
      });

      if (!response.ok) throw new Error("Failed to save card");

      const savedCard = await response.json();

      if (cardId) {
        showNotification("Card updated successfully!");
      } else {
        showNotification("Card created successfully!");
        navigate(`/card/${savedCard.card_id}`, { replace: true });
        setIsNewCard(false); // Now we're editing an existing card
      }

      // Update our card data with the saved data
      setCardData(savedCard);
    } catch (error) {
      console.error("Error saving card:", error);
      showNotification("Failed to save card. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleNewCard = () => {
    if (frontCardRef.current) frontCardRef.current.setContent("");
    if (backCardRef.current) backCardRef.current.setContent("");

    // Reset image URLs
    setCardData({
      ...cardData,
      front_image_url: null,
      back_image_url: null,
      notes: "",
    });

    setActive("front");

    setIsNewCard(true);

    if (selectedDeckId) {
      navigate(`/create/deck/${selectedDeckId}`);
    } else {
      navigate(`/create`);
    }
  };

  // Find current deck name
  const currentDeckName =
    decks.find((d) => d.deck_id.toString() === selectedDeckId?.toString())
      ?.title || "Deck";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="edit-card flex min-h-screen">
        <div className="page-container flex flex-col w-full ">
          <div
            className={`flex items-center justify-between p-4 shadow-sm z-10 border-b-gray-200`}
          >
            <div
              className="flex items-center space-x-4 py-2"
              onClick={() => navigate(-1)}
            >
              <Back />
              <p className="p-0 flex items-center">
                <span
                  className={`inline-block w-4 h-4 rounded-full bg-${deckColor}-500 mr-2`}
                ></span>
                {currentDeckName}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                className="flex items-center space-x-2"
                onClick={() => setIsSelectDeckModalOpen(true)}
              >
                <span>Change Deck</span>
              </button>
              <button
                className="flex items-center space-x-2"
                onClick={saveCard}
                disabled={isSaving}
              >
                <Save />
                <span>{isSaving ? "Saving..." : "Save"}</span>
              </button>
              <Options />
            </div>
          </div>

          <div className="card-holder flex items-start mt-4 h-full justify-center space-x-20">
            <div className="front-card flex flex-col items-center">
              <p>Front Card</p>
              <div onClick={() => setActive("front")}>
                <SingleCard
                  ref={frontCardRef}
                  showNotification={showNotification}
                  isActive={activeCard === "front"}
                  cardColor={deckColor}
                  side="front"
                />
              </div>
            </div>
            <div className="back-card flex flex-col items-center">
              <p>Back Card</p>
              <div onClick={() => setActive("back")}>
                <SingleCard
                  ref={backCardRef}
                  showNotification={showNotification}
                  isActive={activeCard === "back"}
                  cardColor={deckColor}
                  side="back"
                />
              </div>
            </div>
          </div>

          <TextFormatting
            onBold={handleBold}
            onItalic={handleItalic}
            onUnderline={handleUnderline}
            onHyperlink={handleHyperlink}
            onTextAlignLeft={handleTextAlignLeft}
            onTextAlignCenter={handleTextAlignCenter}
            onTextAlignRight={handleTextAlignRight}
            onHighlight={handleHighlight}
            formatStates={formatStates}
          />

          <div className="grid grid-cols-3 py-4">
            <div className="flex items-center space-x-4 justify-center">
              <Back />
              <p>Previous</p>
            </div>
            <div className="flex items-center justify-center">
              <ColoredButton text={"+ New Card"} onClick={handleNewCard} />
            </div>
            <div className="flex items-center space-x-4 justify-center">
              <Forward />
              <p>Next</p>
            </div>
          </div>
        </div>

        {/* Select Deck Modal */}
        <SelectDeckModal
          isOpen={isSelectDeckModalOpen}
          onClose={() => setIsSelectDeckModalOpen(false)}
          onSelectDeck={handleSelectDeck}
          decks={decks}
        />

        <Notification
          notification={notifications}
          setNotification={setNotifications}
        />
      </div>
    </motion.div>
  );
};

export default CreateCard;
