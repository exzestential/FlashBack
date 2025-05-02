import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { KebabMenu } from "../global";
import { Modal } from "../global";
import axios from "axios"; // Assuming you're using axios for API calls

const DeckCard = ({ deck, onDeckUpdated, onDeckDeleted, folders }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(deck.title);
  const [editDescription, setEditDescription] = useState(
    deck.description || ""
  );
  const [editFolderId, setEditFolderId] = useState(deck.folder_id || "");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Reset form state when modal opens
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
          ...data.deck, // in case backend returns updated values
        });
      }
    } catch (error) {
      console.error("Failed to update deck:", error);
      alert("Failed to update deck: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Stop event propagation for modal clicks
  const handleCardClick = (e) => {
    if (e.target.closest(".modal-content") || e.target.closest(".kebab-menu")) {
      // Don't navigate if clicking on modal or menu
    } else {
      navigate(`/deck/${deck.deck_id}`);
    }
  };

  const menuItems = [
    {
      label: "Edit",
      onClick: (e) => {
        setIsEditModalOpen(true);
      },
    },
    {
      label: "Delete",
      onClick: (e) => {
        setIsDeleteModalOpen(true);
      },
    },
  ];

  return (
    <>
      <motion.div
        className="deck-card relative h-36 rounded-2xl cursor-pointer"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={handleCardClick}
      >
        {/* Cards inside white jacket */}
        <motion.div
          className="absolute inset-0"
          animate={{ y: isHovered ? -6 : 0 }}
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
          animate={{ y: isHovered ? 6 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="absolute bottom-0 left-0 right-0 h-2/3 z-30 flex flex-col"
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
              <div className="px-1 py-2 kebab-menu">
                <KebabMenu items={menuItems} direction="vertical" />
              </div>
            </div>
          </div>
          {/* Shadow attached just above the white jacket */}
          <div className="absolute -top-1 left-0 right-0 h-4 bg-gradient-to-b from-transparent to-black/10 pointer-events-none z-0"></div>
        </motion.div>
      </motion.div>

      {/* Delete Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={(e) => {
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
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Deck Title"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
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
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Deck Description"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
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
          >
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
