import React, { useState } from "react";

import { SideNav, Tabs, AnimatedTabPanels } from "../component/global";
import { DeckCard } from "../component/flashcard";

const Home = () => {
  const tabs = ["Review", "Decks", "Folders", "Favourites", "Statistics"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [activeIndex, setActiveIndex] = useState(0);

  // prepare panels array for AnimatedTabPanels
  const panels = [
    {
      key: "Review",
      content: (
        <div className="mx-40">
          <div class="grid grid-cols-1 my-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 110:grid-cols-5 gap-10">
            <DeckCard />
            <DeckCard />
            <DeckCard />
            <DeckCard />
            <DeckCard />
            <DeckCard />
            <DeckCard />
            <DeckCard />
            <DeckCard />
            <DeckCard />
            <DeckCard />
            <DeckCard />
            <DeckCard />
            <DeckCard />
            <DeckCard />
          </div>
        </div>
      ),
    },
    { key: "Decks", content: <div>Decks content…</div> },
    { key: "Folders", content: <div>Folders content…</div> },
    { key: "Favourites", content: <div>Favourites content…</div> },
    { key: "Statistics", content: <div>Statistics content…</div> },
  ];

  return (
    <div className="page-container flex min-h-screen">
      <SideNav />
      <div className="home w-full flex flex-col">
        <div className="user-welcome p-3 flex items-center">
          <img src="http://placehold.co/65?text=Profile" alt="Profile" />
          <div>
            <p>Welcome {"{user}"}</p>
            <p>gay</p>
          </div>
        </div>

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
    </div>
  );
};

export default Home;
