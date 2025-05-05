import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { FaEllipsisVertical, FaEllipsis } from "react-icons/fa6";

const KebabMenu = ({
  items = [],
  direction = "vertical",
  color = "gray-400",
  onOpenChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [portalContainer, setPortalContainer] = useState(null);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const itemClickedRef = useRef(false);

  // Create portal container on mount
  useEffect(() => {
    // Create a dedicated container for this specific menu
    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.top = "0";
    container.style.left = "0";
    container.style.zIndex = "9999";
    container.setAttribute("data-kebab-menu", "true");
    document.body.appendChild(container);
    setPortalContainer(container);

    // Cleanup on unmount
    return () => {
      document.body.removeChild(container);
    };
  }, []);

  // Toggle menu and update position
  const toggleMenu = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (!isOpen && buttonRef.current) {
      // Get exact button position
      const rect = buttonRef.current.getBoundingClientRect();

      // Calculate position relative to viewport
      setMenuPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX - 120,
      });
    }

    setIsOpen((prev) => !prev);
  };

  // Notify parent about open state changes
  useEffect(() => {
    if (onOpenChange) {
      onOpenChange(isOpen);
    }
  }, [isOpen, onOpenChange]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      // Skip if an item was just clicked
      if (itemClickedRef.current) {
        itemClickedRef.current = false;
        return;
      }

      // Check if click is outside both button and menu
      const clickedOnButton =
        buttonRef.current && buttonRef.current.contains(e.target);
      const clickedOnMenu =
        menuRef.current && menuRef.current.contains(e.target);

      if (isOpen && !clickedOnButton && !clickedOnMenu) {
        setIsOpen(false);
      }
    };

    // Use capture phase to catch events early
    document.addEventListener("mousedown", handleClickOutside, true);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside, true);
  }, [isOpen]);

  // Handle menu item click
  const handleItemClick = (onClick) => {
    // Mark as clicked to prevent double-handling
    itemClickedRef.current = true;

    // Close menu
    setIsOpen(false);

    // Execute callback
    if (onClick && typeof onClick === "function") {
      // Delay slightly to ensure menu is closed first
      setTimeout(onClick, 10);
    }
  };

  const Icon = direction === "horizontal" ? FaEllipsis : FaEllipsisVertical;

  return (
    <div className="relative inline-block text-left">
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className={`text-xl text-${color} cursor-pointer px-2 py-1 hover:bg-black/10 rounded-xl`}
      >
        <Icon />
      </button>

      {isOpen &&
        portalContainer &&
        createPortal(
          <div
            ref={menuRef}
            className="fixed w-40 bg-white border border-gray-200 rounded-xl shadow-lg"
            style={{
              position: "fixed",
              top: `${menuPosition.top}px`,
              left: `${menuPosition.left}px`,
              zIndex: 9999,
            }}
          >
            {items.map((item, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  handleItemClick(item.onClick);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm first:rounded-t-xl last:rounded-b-xl"
              >
                {item.label}
              </button>
            ))}
          </div>,
          portalContainer
        )}
    </div>
  );
};

export default KebabMenu;
