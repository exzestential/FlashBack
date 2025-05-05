import React, { useState, useRef, useEffect } from "react";
import { FaEllipsisVertical, FaEllipsis } from "react-icons/fa6";

const KebabMenu = ({
  items = [],
  direction = "vertical",
  color = "gray-400",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Close menu if clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const Icon = direction === "horizontal" ? FaEllipsis : FaEllipsisVertical;

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className={`text-xl text-${color} cursor-pointer px-2 py-1 hover:bg-black/10 rounded-xl`}
      >
        <Icon />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-md z-10">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.onClick();
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default KebabMenu;
