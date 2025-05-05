import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { KebabMenu } from "../global";
import { Modal } from "../global";
import { useTransition } from "../utility/TransitionContext";
import { useNavigate } from "react-router-dom";

const DeckCard = ({ deck, onDeckUpdated, onDeckDeleted, folders }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(deck.title);
  const [editDescription, setEditDescription] = useState(
    deck.description || ""
  );
  const [editFolderId, setEditFolderId] = useState(deck.folder_id || "");
  const [isLoading, setIsLoading] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { startTransition } = useTransition();

  useEffect(() => {
    if (isEditModalOpen) {
      setEditTitle(deck.title);
      setEditDescription(deck.description || "");
      setEditFolderId(deck.folder_id || "");
    }
  }, [isEditModalOpen, deck]);

  // Handle delete functionality
  const handleDelete = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/decks/${deck.deck_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setIsDeleteModalOpen(false);

      if (onDeckDeleted) {
        onDeckDeleted(deck.deck_id);
      }
    } catch (error) {
      console.error("Failed to delete deck:", error);
      alert("Failed to delete deck: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle edit functionality
  const handleEdit = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/decks/${deck.deck_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            title: editTitle,
            description: editDescription,
            folder_id: editFolderId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      setIsEditModalOpen(false);

      if (onDeckUpdated) {
        onDeckUpdated({
          ...deck,
          title: editTitle,
          description: editDescription,
          folder_id: editFolderId,
          ...data.deck,
        });
      }
    } catch (error) {
      console.error("Failed to update deck:", error);
      alert("Failed to update deck: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getTailwindColor = (colorName) => {
    const colors = {
      slate: "rgb(100, 116, 139)",
      gray: "rgb(107, 114, 128)",
      zinc: "rgb(113, 113, 122)",
      neutral: "rgb(115, 115, 115)",
      stone: "rgb(120, 113, 108)",
      red: "rgb(239, 68, 68)",
      orange: "rgb(249, 115, 22)",
      amber: "rgb(245, 158, 11)",
      yellow: "rgb(234, 179, 8)",
      lime: "rgb(132, 204, 22)",
      green: "rgb(34, 197, 94)",
      emerald: "rgb(16, 185, 129)",
      teal: "rgb(20, 184, 166)",
      cyan: "rgb(6, 182, 212)",
      sky: "rgb(14, 165, 233)",
      blue: "rgb(59, 130, 246)",
      indigo: "rgb(99, 102, 241)",
      violet: "rgb(139, 92, 246)",
      purple: "rgb(168, 85, 247)",
      fuchsia: "rgb(217, 70, 239)",
      pink: "rgb(236, 72, 153)",
      rose: "rgb(244, 63, 94)",
    };
    return colors[colorName] || "rgb(255, 255, 255)"; // white as default
  };

  const handleCardClick = (e) => {
    console.log("Card clicked");

    // Prevent triggering when clicking on menu or modal
    if (e.target.closest(".modal-content") || e.target.closest(".kebab-menu")) {
      console.log("Click ignored - clicked on modal or menu");
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    // Use clientX/Y directly from the event
    const originX = e.clientX;
    const originY = e.clientY;

    console.log("Click position:", { originX, originY });

    // Get the folder color for transition using hardcoded values
    const color = deck.folder_color
      ? getTailwindColor(deck.folder_color)
      : "white";

    console.log("Using color:", color);

    // Set animation state
    setIsAnimating(true);

    // Start transition with the captured position
    startTransition(
      color,
      { x: originX, y: originY },
      `/study/${deck.deck_id}`
    );
  };

  const menuItems = [
    {
      label: "Edit",
      onClick: () => {
        setIsEditModalOpen(true);
      },
    },
    {
      label: "Delete",
      onClick: () => {
        setIsDeleteModalOpen(true);
      },
    },
    {
      label: "Browse Cards",
      onClick: () => {
        navigate(`/deck/${deck.deck_id}`);
      },
    },
  ];

  // Animation variants for the cards
  const cardStackVariants = {
    initial: { y: 0 },
    hover: { y: -6 },
    animate: {
      y: -40,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const whiteJacketVariants = {
    initial: { y: 0 },
    hover: { y: 6 },
    animate: {
      y: 20,
      opacity: 0.6,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const cardAnimationVariants = {
    initial: {
      zIndex: 1,
    },
    animate: {
      scale: 1.1,
      zIndex: 2,
      transition: {
        scale: { duration: 0.3, ease: "easeOut" },
      },
    },
    menuOpen: {
      zIndex: 3,
    },
  };

  return (
    <>
      <motion.div
        className="deck-card relative h-36 rounded-2xl cursor-pointer"
        onHoverStart={() => !isAnimating && setIsHovered(true)}
        onHoverEnd={() => !isAnimating && setIsHovered(false)}
        onClick={handleCardClick}
        animate={isMenuOpen ? "menuOpen" : isAnimating ? "animate" : "initial"}
      >
        {/* Main card animation container */}
        <motion.div
          className="absolute inset-0 origin-center"
          variants={cardAnimationVariants}
          initial="initial"
          style={{
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
          }}
        >
          {/* Cards inside white jacket */}
          <motion.div
            className="absolute inset-0"
            variants={cardStackVariants}
            initial="initial"
            animate={isAnimating ? "animate" : isHovered ? "hover" : "initial"}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <div
              className={`absolute inset-0 bg-${
                deck.folder_color || "gray"
              }-600 z-0 rounded-2xl`}
            />
            <div
              className={`absolute inset-0 bg-${
                deck.folder_color || "gray"
              }-500 left-2 z-10 rounded-2xl`}
            />
            <div
              className={`absolute inset-0 bg-${
                deck.folder_color || "gray"
              }-400 left-4 z-20 rounded-2xl`}
            />
          </motion.div>

          {/* White jacket in front, positioned at bottom */}
          <motion.div
            variants={whiteJacketVariants}
            initial="initial"
            animate={isAnimating ? "animate" : isHovered ? "hover" : "initial"}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="absolute bottom-0 left-0 right-0 h-2/3 z-40 flex flex-col"
          >
            <div className="relative bg-white shadow-sm rounded-b-2xl flex flex-col h-full z-30 ps-2">
              <div className="flex flex-grow">
                <div className="px-1 py-1 flex flex-col w-full text-gray-700">
                  <p className="p-0 text-lg">{deck.title}</p>
                  <p className="p-0 text-sm">{deck.description}</p>
                  <p className="p-0 text-sm mt-auto mb-1">
                    {deck.card_count} cards
                  </p>
                </div>
                <div
                  className="px-1 py-2 kebab-menu"
                  onClick={(e) => e.stopPropagation()}
                >
                  <KebabMenu
                    items={menuItems}
                    direction="vertical"
                    onOpenChange={setIsMenuOpen}
                  />
                </div>
              </div>
            </div>
            {/* Shadow attached just above the white jacket */}
            <div className="absolute -top-1 left-0 right-0 h-4 bg-gradient-to-b from-transparent to-black/10 pointer-events-none z-0"></div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Delete Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={(e) => {
          e.stopPropagation();
          setIsDeleteModalOpen(false);
        }}
        onConfirm={handleDelete}
        confirmText="Delete"
        confirmDisabled={isLoading}
        className="modal-content"
      >
        <h2 className="text-xl font-semibold mb-3">Delete Deck</h2>
        <p>Are you sure you want to delete "{deck.title}"?</p>
        <p className="text-red-600 text-sm pt-0 pb-2">
          This action cannot be undone.
        </p>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={(e) => {
          e.stopPropagation();
          setIsEditModalOpen(false);
        }}
        onConfirm={handleEdit}
        confirmText="Save"
        confirmDisabled={isLoading || !editTitle.trim()}
        className="modal-content"
      >
        <h2 className="text-xl font-semibold mb-4">Edit Deck</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="appearance-none bg-gray-100 border border-gray-200 focus:ring-sky-700 focus:border-sky-700 focus:outline-none p-2.5 rounded-xl w-full text-gray-600"
            id="title"
            type="text"
            placeholder="Deck Title"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description (optional)
          </label>
          <textarea
            className="appearance-none bg-gray-100 border border-gray-200 focus:ring-sky-700 focus:border-sky-700 focus:outline-none p-2.5 rounded-xl w-full text-gray-600"
            id="description"
            placeholder="Deck Description"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            rows="3"
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="folder"
          >
            Folder
          </label>
          <select
            id="folder"
            name="folder"
            value={editFolderId}
            className="appearance-none bg-gray-100 border border-gray-200 focus:ring-sky-700 focus:border-sky-700 focus:outline-none p-2.5 rounded-xl w-full text-gray-600"
            onChange={(e) => setEditFolderId(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          >
            <option value="">No Folder</option>
            {folders &&
              folders.map((folder) => (
                <option key={folder.folder_id} value={folder.folder_id}>
                  {folder.name}
                </option>
              ))}
          </select>
        </div>
      </Modal>
    </>
  );
};

export default DeckCard;
