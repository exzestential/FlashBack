import React from "react";

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="border-b-2 border-gray-200">
      <div className="tabs mx-44 flex justify-center items-center relative">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(tab)}
            className={`p-4 flex-grow bg-white`}
            style={{ width: `calc(100% / ${tabs.length})` }}
          >
            {tab}
          </button>
        ))}

        {/* Animated Bottom Border */}
        <div
          className="absolute bottom-0 left-0 h-1 bg-midnight transition-all duration-300 ease-in-out"
          style={{
            width: `calc(100% / ${tabs.length})`,
            left: `calc(${(tabs.indexOf(activeTab) / tabs.length) * 100}%)`,
          }}
        />
      </div>
    </div>
  );
};

export default Tabs;
