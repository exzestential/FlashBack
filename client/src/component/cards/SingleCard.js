import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { FaCamera } from "react-icons/fa";

const SingleCard = forwardRef(function RichTextCard(
  { showNotification, isActive, cardColor = "sky", side = "front" },
  ref
) {
  const [imageSrc, setImageSrc] = useState(null);
  const contentEditableRef = useRef(null);
  const fileInputRef = useRef(null);
  const [textContent, setTextContent] = useState("");

  // Make card back slightly darker, just like in FlipCard
  const bgColorClass =
    side === "front" ? `bg-${cardColor}-500` : `bg-${cardColor}-600`;

  useImperativeHandle(ref, () => ({
    // Expose methods to parent
    focus: () => {
      if (contentEditableRef.current) {
        contentEditableRef.current.focus();
      }
    },
    getContent: () => {
      return contentEditableRef.current?.innerHTML || "";
    },
    setContent: (html) => {
      if (contentEditableRef.current) {
        contentEditableRef.current.innerHTML = html;
        // Update textContent state when setting content
        setTextContent(contentEditableRef.current.textContent);
      }
    },
  }));

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageSrc(URL.createObjectURL(file));
    }
  };

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  const handleKeyDown = (e) => {
    // Check character limit (approximately)
    if (
      contentEditableRef.current &&
      contentEditableRef.current.innerText.length >= 500 &&
      !e.ctrlKey &&
      !e.metaKey &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight" &&
      e.key !== "ArrowUp" &&
      e.key !== "ArrowDown"
    ) {
      showNotification("You've reached the 500 character limit!");
      e.preventDefault();
    }
  };

  const handlePaste = (e) => {
    // Allow default paste behavior when we want to keep formatting
  };

  return (
    <div
      className={`w-[275px] h-[450px] p-4 ${bgColorClass} rounded-2xl relative shadow-lg`}
    >
      <div className="flex flex-col items-center h-full">
        <div className="relative flex flex-col items-center w-full h-full">
          {/* Image Preview */}
          {imageSrc && (
            <img
              src={imageSrc}
              alt="Uploaded"
              className="w-full h-[150px] object-cover rounded-lg"
            />
          )}

          {/* Rich Text Editor - Using contentEditable instead of textarea */}
          <div className="relative w-full h-full">
            {!textContent && (
              <span className="absolute top-2 left-2 text-white/50 pointer-events-none">
                Enter text...
              </span>
            )}
            <div
              ref={contentEditableRef}
              contentEditable={isActive}
              suppressContentEditableWarning={true}
              onInput={(e) => setTextContent(e.currentTarget.textContent)}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              spellCheck={false}
              className={`${bgColorClass} text-white rounded w-full h-full outline-none resize-none p-2 overflow-y-auto`}
              style={{
                minHeight: "200px",
                cursor: isActive ? "text" : "default",
              }}
            ></div>
          </div>

          {/* Gradient at the bottom of the text area */}
          <div
            className={`pointer-events-none absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-${cardColor}-${
              side === "front" ? "500" : "600"
            } to-transparent rounded-b`}
          />
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />

        {/* Camera Icon (at the bottom of the card) */}
        <FaCamera
          onClick={handleIconClick}
          className="absolute bottom-4 right-4 text-white/30 text-3xl cursor-pointer hover:text-white/70"
        />
      </div>
    </div>
  );
});

export default SingleCard;
