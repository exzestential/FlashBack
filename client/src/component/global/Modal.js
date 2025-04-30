import React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

import LightButton from "./LightButton";
import ColoredButton from "./ColoredButton";
import Close from "./Close";

const Modal = ({
  isOpen,
  onClose,
  children,
  cancelText = "Cancel",
  confirmText = "Confirm",
  onConfirm,
  confirmDisabled = false,
}) => {
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative"
          >
            {/* Close Icon */}
            <button
              onClick={onClose}
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-800"
            >
              <Close />
            </button>

            {/* Modal content */}
            <div className="mb-4">{children}</div>

            {/* Button actions */}
            <div className="flex justify-end gap-3">
              <LightButton text={cancelText} onClick={onClose} style="w-24" />
              <ColoredButton
                text={confirmText}
                onClick={onConfirm}
                disabled={confirmDisabled}
                style="w-24"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Modal;
