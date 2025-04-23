import React from "react";

const AnimatedTabPanels = ({ panels, activeIndex, height = "h-32" }) => {
  return (
    <div className={`relative overflow-hidden ${height}`}>
      {panels.map((panel, i) => {
        // determine transform X position
        const x = i === activeIndex ? 0 : i < activeIndex ? -100 : 100;
        return (
          <div
            key={panel.key}
            className="absolute inset-0 p-4 bg-white transition-all duration-500 ease-in-out"
            style={{
              transform: `translateX(${x}%)`,
              opacity: i === activeIndex ? 1 : 0,
            }}
          >
            {panel.content}
          </div>
        );
      })}
    </div>
  );
};

export default AnimatedTabPanels;
