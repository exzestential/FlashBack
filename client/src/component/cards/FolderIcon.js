import React, { useState } from "react";
import { color, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { KebabMenu, ColorSelect, Modal, Loader } from "../global";

const FolderIcon = ({ folder, onFolderDeleted, onFolderUpdated }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editName, setEditName] = useState(folder.name);
  const [EditFolderColor, setEditFolderColor] = useState(folder.color);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Stop event propagation for modal clicks
  const handleFolderClick = (e) => {
    if (e.target.closest(".modal-content") || e.target.closest(".kebab-menu")) {
    } else {
      navigate(`/folder/${folder.folder_id}`);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/folders/${folder.folder_id}`,
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

      if (onFolderDeleted) {
        onFolderDeleted(folder.folder_id);
      }
    } catch (error) {
      console.error("Failed to delete folder:", error);
      alert("Failed to delete Folder: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle edit functionality
  const handleEdit = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/folders/${folder.folder_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            name: editName,
            color: EditFolderColor,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      setIsEditModalOpen(false);
      if (onFolderUpdated) {
        onFolderUpdated({
          ...folder,
          name: editName,
          color: EditFolderColor,
          ...data.folder, // in case backend returns updated values
        });
      }
    } catch (error) {
      console.error("Failed to update Folder:", error);
      alert("Failed to update Folder: " + error.message);
    } finally {
      setIsLoading(false);
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
    <div className="hover:bg-gray-200 rounded-xl w-48 h-44 ps-2 cursor-pointer">
      <motion.div
        className="relative w-48 m-15 p-5 h-40 group"
        onHoverStart={() => setIsHovered(true)} // Track hover start
        onHoverEnd={() => setIsHovered(false)} // Track hover end
        onClick={handleFolderClick}
      >
        {/* First Layer */}
        <motion.div
          className="relative z-0"
          initial={{ scaleY: 1, rotate: 0, skewX: 0 }}
          animate={{
            scaleY: isHovered ? 1.01 : 1,
            rotate: isHovered ? -1 : 0,
            skewX: isHovered ? 4 : 0,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <div
            className={`relative w-11 h-4 bg-${folder.color}-600 rounded-tl-3xl`}
          >
            <div
              className={`absolute top-0 right-[-16px] w-0 h-0 border-t-[16px] border-l-[16px] border-t-transparent border-l-${folder.color}-600`}
            ></div>
          </div>

          <div
            className={`w-32 h-[100px] bg-${folder.color}-600 rounded-3xl rounded-tl-none`}
          ></div>
        </motion.div>

        {/* Second Layer (on top) */}
        <motion.div
          className="absolute bottom-5 z-10 w-36 origin-bottom-right"
          initial={{ y: 0, skewX: 0 }}
          animate={{
            y: isHovered ? 4 : 0,
            scaleY: isHovered ? 0.9 : 1,
            skewX: isHovered ? -16 : 0,
            rotate: isHovered ? 2 : 0,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <div className={`h-[90px] bg-${folder.color}-400 rounded-3xl`}></div>
          <div className={`absolute bottom-4 right-4 z-10 w-10`}>
            <div className={`h-4 bg-${folder.color}-500 rounded-3xl`}></div>
          </div>
        </motion.div>

        {/* Folder Details */}
        <div className="flex relative items-center text-center me-2">
          <p className="p-2 text-lg">{folder.name}</p>{" "}
          <div className=" absolute right-0 kebab-menu">
            <KebabMenu
              items={menuItems}
              direction="horizontal"
              color="black/30"
            />
          </div>
        </div>
      </motion.div>

      {/* Delete Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={(e) => {
          setIsDeleteModalOpen(false);
        }}
        onConfirm={handleDelete}
        confirmText="Delete"
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-3">Delete Folder</h2>
        <p>Are you sure you want to delete "{folder.name}"?</p>
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
        cancelText="Cancel"
        confirmText="Edit"
        onConfirm={handleEdit}
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col space-y-4">
          <h2 className="text-xl font-semibold">Edit Folder</h2>
          <input
            type="text"
            id="folder_name"
            className="bg-gray-100 border border-gray-200 focus:ring-sky-700 focus:border-sky-700 focus:outline-none p-2.5 rounded-xl w-full placeholder:text-gray-600 text-gray-600"
            placeholder="Enter Name..."
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            required
          />

          <ColorSelect setFolderColor={setEditFolderColor} />
        </div>
      </Modal>
      <Loader isLoadinng={isLoading} />
    </div>
  );
};

export default FolderIcon;
