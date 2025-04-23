import React from "react";
import { motion } from "framer-motion";

import { SideNav } from "../component/global";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="page-container flex min-h-scnreen">
        <SideNav />
        <div className="home p-4">
          <div className="user-welcome flex items-center">
            <img src="http://placehold.co/75?text=Profile" alt="" />
            <div>
              <p>Welcome {"{user}"}</p>
              <p>gay</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
