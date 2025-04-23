import React, { useState } from "react";
import { SideNav, Tabs } from "../component/global";

const Home = () => {
  const tabs = ["Review", "Decks", "Folders", "Favourites", "Statistics"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [activeIndex, setActiveIndex] = useState(0);

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

        <div className="relative overflow-hidden h-32">
          {tabs.map((tab, i) => {
            const x = i === activeIndex ? 0 : i < activeIndex ? -100 : 100;

            return (
              <div
                key={tab}
                className="absolute inset-0 p-4 bg-white transition-all duration-500 ease-in-out"
                style={{
                  transform: `translateX(${x}%)`,
                  opacity: i === activeIndex ? 1 : 0,
                }}
              >
                {tab === "Review" && <div>Review content…</div>}
                {tab === "Decks" && <div>Decks content…</div>}
                {tab === "Folders" && <div>Folders content…</div>}
                {tab === "Favourites" && <div>Favourites content…</div>}
                {tab === "Statistics" && <div>Statistics content…</div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
