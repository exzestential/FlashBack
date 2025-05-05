import React from "react";
import { motion } from "framer-motion";

const Loader = ({ isLoading }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className={`fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 ${
          isLoading ? "block" : "hidden"
        }`}
      >
        <div className="flex items-center justify-center bg-white py-10 px-14 rounded-md shadow-lg">
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-t-4 border-t-sky-500 rounded-full animate-spin"></div>
            <span className="ml-3 text-lg text-gray-700">Loading...</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Loader;
