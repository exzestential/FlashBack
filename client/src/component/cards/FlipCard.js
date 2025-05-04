import { useState, useEffect } from "react";
import { FaXmark } from "react-icons/fa6";
import "./FlipCard.css";

const FlipCard = ({ card, size = "Full", isNew = false, onFlip }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    side: "front",
    content: "",
    imageUrl: "",
  });
  const [clickTimeout, setClickTimeout] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const [slideIn, setSlideIn] = useState(isNew);
  const [displayCard, setDisplayCard] = useState(card); // Store the current card for display

  // Clear timeouts when component unmounts
  useEffect(() => {
    return () => {
      if (clickTimeout) clearTimeout(clickTimeout);
      if (hoverTimeout) clearTimeout(hoverTimeout);
    };
  }, [clickTimeout, hoverTimeout]);

  useEffect(() => {
    if (displayCard !== card && isFlipped) {
    } else if (displayCard !== card) {
      setDisplayCard(card);
    }
  }, [card, displayCard, isFlipped]);

  useEffect(() => {
    setIsFlipped(false);

    if (isNew) {
      setSlideIn(true);
      const timeout = setTimeout(() => {
        setSlideIn(false);
      }, 500); // Animation duration

      return () => clearTimeout(timeout);
    }
  }, [card, isNew]);

  const handleClick = () => {
    if (clickTimeout) {
      clearTimeout(clickTimeout);
      setClickTimeout(null);
      return;
    }

    const timeout = setTimeout(() => {
      handleFlip();
      setClickTimeout(null);
    }, 200); // 200ms delay

    setClickTimeout(timeout);
  };

  // Handle the flipping logic
  const handleFlip = () => {
    const newFlippedState = !isFlipped;
    setIsFlipped(newFlippedState);

    if (!newFlippedState && displayCard !== card) {
      setTimeout(() => {
        setDisplayCard(card);
      }, 150); // Half the flip animation time
    }

    // Call the onFlip callback if provided
    if (onFlip) {
      onFlip(newFlippedState);
    }
  };

  // Handle mouse enter - toggles the flipped state only for Thumbnail size
  const handleMouseEnter = () => {
    // Only apply hover effect for Thumbnail size
    if (size !== "Thumbnail") return;

    const hoverDelayMs = 500; // 500ms delay before hover triggers flip

    // Add delay to hover effect to allow for clicking first
    const timeout = setTimeout(() => {
      handleFlip(); // Use the handleFlip function instead of directly setting state
    }, hoverDelayMs);

    setHoverTimeout(timeout);
  };

  const handleMouseLeave = () => {
    // Only apply hover effect for Thumbnail size
    if (size !== "Thumbnail") return;

    // Clear any pending hover timeout
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
      return; // Don't toggle if we're just clearing a pending hover
    }

    handleFlip(); // Use the handleFlip function instead of directly setting state
  };

  const handleDoubleClick = (e, side) => {
    e.stopPropagation(); // Prevent triggering flip
    e.preventDefault(); // Prevent default behavior

    // Clear any pending flip timeout
    if (clickTimeout) {
      clearTimeout(clickTimeout);
      setClickTimeout(null);
    }

    // Clear any pending hover timeout
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }

    // Open modal for both Full and Thumbnail sizes
    setModalContent({
      side,
      content: side === "front" ? card.front_content : card.back_content,
      imageUrl: side === "front" ? card.front_image_url : card.back_image_url,
    });
    setShowModal(true);
  };

  // Close modal when clicking outside
  const handleModalBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowModal(false);
    }
  };

  // Define size-specific classes
  const sizeClasses = {
    Thumbnail: {
      container: "w-40 h-56",
      textSize: "text-xs",
      padding: "p-3",
      imageHeight: "h-20",
    },
    Full: {
      container: "w-80 h-[500px]",
      textSize: "text-xl",
      padding: "p-4",
      imageHeight: "h-40",
    },
  };

  // Use the appropriate size classes or default to Full
  const { container, textSize, padding, imageHeight } =
    sizeClasses[size] || sizeClasses.Full;

  return (
    <>
      <div
        className={`${container} relative perspective-1000 cursor-pointer ${
          slideIn ? "slide-in-right" : ""
        }`}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={`relative w-full h-full duration-700 transform-style-preserve-3d ${
            isFlipped ? "rotate-y-180" : ""
          }`}
        >
          {/* Front of card */}
          <div
            className={`absolute w-full h-full backface-hidden bg-${displayCard.folder_color}-500 rounded-lg shadow-lg flex flex-col ${padding} overflow-hidden`}
            onDoubleClick={(e) => handleDoubleClick(e, "front")}
          >
            {/* Front image */}
            {displayCard.front_image_url && (
              <div className="w-full mb-2">
                <img
                  src={displayCard.front_image_url}
                  alt="Front visual"
                  className={`w-full ${imageHeight} object-cover rounded-lg`}
                />
              </div>
            )}

            {/* Front content with overflow hidden */}
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div
                className={`w-full h-full overflow-hidden flex items-center justify-center ${textSize} text-white`}
              >
                {displayCard.front_content}
              </div>
            </div>

            <div
              className={`pointer-events-none absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-${displayCard.folder_color}-500 to-transparent rounded-b`}
            />
          </div>

          {/* Back of card */}
          <div
            className={`absolute w-full h-full backface-hidden bg-${displayCard.folder_color}-600 rounded-lg shadow-lg rotate-y-180 flex flex-col overflow-hidden ${padding}`}
            onDoubleClick={(e) => handleDoubleClick(e, "back")}
          >
            {/* Back image */}
            {displayCard.back_image_url && (
              <div className="w-full mb-2">
                <img
                  src={displayCard.back_image_url}
                  alt="Back visual"
                  className={`w-full ${imageHeight} object-cover rounded-lg`}
                />
              </div>
            )}

            {/* Back content with overflow hidden */}
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div
                className={`w-full h-full overflow-hidden flex items-center justify-center ${textSize} text-white`}
              >
                {displayCard.back_content}
              </div>
            </div>

            <div
              className={`pointer-events-none absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-${displayCard.folder_color}-600 to-transparent rounded-b`}
            />
          </div>
        </div>
      </div>

      {/* Modal for expanded view */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={handleModalBackdropClick}
        >
          <div
            className={`bg-${card.folder_color}-${
              modalContent.side === "front" ? "500" : "600"
            } rounded-xl max-w-2xl w-11/12 max-h-[90vh] overflow-hidden relative`}
          >
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-white/80 hover:text-white z-10"
            >
              <FaXmark size={24} />
            </button>

            {/* Modal content */}
            <div className="p-6 flex flex-col h-full max-h-[90vh]">
              {/* Image if available */}
              {modalContent.imageUrl && (
                <div className="mb-4">
                  <img
                    src={modalContent.imageUrl}
                    alt="Card visual"
                    className="w-full max-h-80 object-contain rounded-lg"
                  />
                </div>
              )}

              {/* Text content */}
              <div className="text-white text-lg overflow-y-auto pr-2">
                {modalContent.content}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FlipCard;
