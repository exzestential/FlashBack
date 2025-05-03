// src/component/cards/EditCard.js
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
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

// =======================================
// Main EditCard component
// =======================================
const EditCard = () => {
  const [notifications, setNotifications] = useState([]);
  const [activeCard, setActiveCard] = useState("front");
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

  const showNotification = (message) => {
    setNotifications((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), message },
    ]);
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="edit-card flex min-h-screen">
        <div className="page-container flex flex-col w-full py-4 px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Back />
              <p>Deck Name</p>
            </div>
            <div className="flex items-center space-x-4">
              <Save />
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
              <ColoredButton text={"+ New Card"} />
            </div>
            <div className="flex items-center space-x-4 justify-center">
              <Forward />
              <p>Next</p>
            </div>
          </div>
        </div>

        <Notification
          notification={notifications}
          setNotification={setNotifications}
        />
      </div>
    </motion.div>
  );
};

export default EditCard;
