import React, { useState } from "react";
import { SideNav, Tabs } from "../component/global";
import AnimatedTabPanels from "../components/AnimatedTabPanels";

const Home = () => {
  const tabs = ["Review", "Decks", "Folders", "Favourites", "Statistics"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [activeIndex, setActiveIndex] = useState(0);

  // prepare panels array for AnimatedTabPanels
  const panels = [
    { key: "Review", content: <div>Review content…</div> },
    { key: "Decks", content: <div>Decks content…</div> },
    { key: "Folders", content: <div>Folders content…</div> },
    { key: "Favourites", content: <div>Favourites content…</div> },
    { key: "Statistics", content: <div>Statistics content…</div> },
  ];

  return (
    <div className="page-container flex min-h-screen">
      <SideNav />
      <div className="home w-full">
        <div className="user-welcome p-4 flex items-center">
          <img src="http://placehold.co/75?text=Profile" alt="Profile" />
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

        <AnimatedTabPanels
          panels={panels}
          activeIndex={activeIndex}
          height="h-32"
        />
      </div>
    </div>
  );
};

export default Home;
