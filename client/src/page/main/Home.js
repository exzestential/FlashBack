import React, { useState } from "react";
import { motion } from "framer-motion";

import { SideNav, Modal } from "../../component/global";
import { AnimatedTabPanels, Tabs, UserInfo } from "../../component/mainPage";
import Review from "../../component/homeTabs/Review";
import { FloatingButton } from "../../component/cards";

const Home = () => {
  const tabs = ["Review", "Decks", "Folders", "Favourites", "Statistics"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);

  // prepare panels array for AnimatedTabPanels
  const panels = [
    {
      key: "Review",
      content: <Review />,
    },
    { key: "Decks", content: <div>Decks content…</div> },
    { key: "Folders", content: <div>Folders content…</div> },
    { key: "Favourites", content: <div>Favourites content…</div> },
    { key: "Statistics", content: <div>Statistics content…</div> },
  ];

  const handleCreate = () => {
    alert("Item created!");
    setModalOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="page-container flex min-h-screen">
        <SideNav />
        <div className="relative home w-full flex flex-col">
          <UserInfo />

          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={(tab) => {
              setActiveTab(tab);
              setActiveIndex(tabs.indexOf(tab));
            }}
          />
          <div className="bg-gray-100 grow overflow-auto">
            <AnimatedTabPanels
              panels={panels}
              activeIndex={activeIndex}
              height="h-full"
            />
          </div>
        </div>
        <FloatingButton onClick={() => setModalOpen(true)} />

        <Modal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          cancelText="Go Back"
          confirmText="Create"
          onConfirm={handleCreate}
        >
          <h2 className="text-xl font-semibold mb-4">Create New Deck</h2>

          <input
            type="text"
            id="first_name"
            className="bg-gray-100 border border-gray-200 focus:ring-sky-700 focus:border-sky-700 focus:outline-none p-2.5 rounded-xl w-full"
            placeholder="Enter Name..."
            required
          />
        </Modal>
      </div>
    </motion.div>
  );
};

export default Home;
