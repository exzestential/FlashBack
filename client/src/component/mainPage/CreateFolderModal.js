import React, { useState, useEffect } from "react";
import { Modal, ColorSelect } from "../../component/global";

const CreateFolderModal = ({ isOpen, onClose, onCreateFolder }) => {
  const [name, setName] = useState("");
  const [folderColor, setFolderColor] = useState("");

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setName("");
      setFolderColor("");
    }
  }, [isOpen]);

  const handleCreateFolder = () => {
    onCreateFolder({ name, color: folderColor });
    setName("");
    setFolderColor("");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      cancelText="Go Back"
      confirmText="Create"
      onConfirm={handleCreateFolder}
    >
      <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-semibold">Create New Folder</h2>
        <input
          type="text"
          id="folder_name"
          className="bg-gray-100 border border-gray-200 focus:ring-sky-700 focus:border-sky-700 focus:outline-none p-2.5 rounded-xl w-full placeholder:text-gray-600 text-gray-600"
          placeholder="Enter Name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <ColorSelect setFolderColor={setFolderColor} />
      </div>
    </Modal>
  );
};

export default CreateFolderModal;
