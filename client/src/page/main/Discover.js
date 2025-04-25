import React from "react";
import { motion } from "framer-motion";

import { SideNav } from "../../component/global";

const Discover = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <SideNav />
      </div>
    </motion.div>
  );
};

export default Discover;
