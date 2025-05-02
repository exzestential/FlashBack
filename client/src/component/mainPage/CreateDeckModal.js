import React, { useState, useEffect } from "react";
import { Modal } from "../../component/global";

const CreateDeckModal = ({
  isOpen,
  onClose,
  onCreateDeck,
  folders,
  defaultFolderId,
}) => {
  const [title, setTitle] = useState("");
  const [folder_id, setFolder_id] = useState("");

  // Reset form and set default folder when modal opens
  useEffect(() => {
    if (isOpen) {
      setTitle("");
      // Set the folder_id to the current folder by default
      setFolder_id(defaultFolderId || "");
    }
  }, [isOpen, defaultFolderId]);

  const handleCreateDeck = () => {
    // Validation
    if (!title.trim()) {
      alert("Please enter a deck name");
      return;
    }
    if (!folder_id) {
      alert("Please select a folder");
      return;
    }

    // Call parent component's handler with deck data
    onCreateDeck({
      title: title.trim(),
      folder_id,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      cancelText="Go Back"
      confirmText="Create"
      onConfirm={handleCreateDeck}
    >
      <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-semibold">Create New Deck</h2>
        <input
          type="text"
          id="deck_title"
          className="bg-gray-100 border border-gray-200 focus:ring-sky-700 focus:border-sky-700 focus:outline-none p-2.5 rounded-xl w-full placeholder:text-gray-600 text-gray-600"
          placeholder="Enter Name..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {defaultFolderId ? (
          <>
            <div className="bg-gray-100 border border-gray-200 p-2.5 rounded-xl w-full text-gray-600">
              {folders?.find(
                (f) => f.folder_id.toString() === defaultFolderId.toString()
              )?.name || "Current folder"}
            </div>
          </>
        ) : (
          <select
            id="folder"
            name="folder"
            value={folder_id}
            className="appearance-none bg-gray-100 border border-gray-200 focus:ring-sky-700 focus:border-sky-700 focus:outline-none p-2.5 rounded-xl w-full text-gray-600"
            onChange={(e) => setFolder_id(e.target.value)}
            required
          >
            <option value="" disabled>
              Select a folder
            </option>
            {folders &&
              folders.map((folder) => (
                <option key={folder.folder_id} value={folder.folder_id}>
                  {folder.name}
                </option>
              ))}
          </select>
        )}
      </div>
    </Modal>
  );
};

export default CreateDeckModal;
