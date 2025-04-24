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
                <div className="home-container min-h-scnreen">
                    <SideNav />
                </div>
            </motion.div>
    )
}

export default Home;