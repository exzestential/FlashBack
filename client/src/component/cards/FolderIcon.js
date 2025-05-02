import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const FolderIcon = ({ folder }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleFolderClick = () => {
    navigate(`/folder/${folder.folder_id}`);
  };

  return (
    <div
      className="hover:bg-gray-200 rounded-xl w-48 h-44 ps-2 cursor-pointer"
      onClick={handleFolderClick}
    >
      <motion.div
        className="relative w-48 m-15 p-5 h-40 group"
        onHoverStart={() => setIsHovered(true)} // Track hover start
        onHoverEnd={() => setIsHovered(false)} // Track hover end
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
        <div className="text-center me-2">
          <p className="p-2 text-lg">{folder.name}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default FolderIcon;
