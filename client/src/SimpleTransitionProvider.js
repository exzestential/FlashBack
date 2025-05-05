// SimpleTransitionProvider.jsx - A simplified version of your transition context
import React, { createContext, useState, useContext } from "react";
import "./SimpleTransition.css";

// Create context
const SimpleTransitionContext = createContext();

// Provider component
export const SimpleTransitionProvider = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionColor, setTransitionColor] = useState("#3b82f6");
  const [transitionOrigin, setTransitionOrigin] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  const [targetPath, setTargetPath] = useState(null);

  // Start a transition
  const startTransition = (
    color = "#3b82f6",
    origin = { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    path = null
  ) => {
    console.log("Starting transition:", { color, origin, path });

    setTransitionColor(color);
    setTransitionOrigin(origin);
    setTargetPath(path);
    setIsTransitioning(true);

    // The transition overlay will handle the animation
  };

  // Called when animation is complete
  const completeTransition = () => {
    console.log("Transition complete");
    setIsTransitioning(false);

    // This is where you'd navigate in a real app
    if (targetPath) {
      console.log("Would navigate to:", targetPath);
      setTargetPath(null);
    }
  };

  return (
    <SimpleTransitionContext.Provider
      value={{
        isTransitioning,
        transitionColor,
        transitionOrigin,
        targetPath,
        startTransition,
        completeTransition,
      }}
    >
      {children}
      <TransitionOverlay />
    </SimpleTransitionContext.Provider>
  );
};

// The actual overlay that displays the circle wipe animation
const TransitionOverlay = () => {
  const {
    isTransitioning,
    transitionColor,
    transitionOrigin,
    completeTransition,
  } = useContext(SimpleTransitionContext);

  // Handle animation end
  const handleAnimationEnd = () => {
    completeTransition();
  };

  return (
    <div
      className={`simple-transition-overlay ${isTransitioning ? "active" : ""}`}
      style={{
        backgroundColor: transitionColor,
        "--origin-x": `${transitionOrigin.x}px`,
        "--origin-y": `${transitionOrigin.y}px`,
      }}
      onAnimationEnd={handleAnimationEnd}
    />
  );
};

// Custom hook to use the transition context
export const useSimpleTransition = () => {
  const context = useContext(SimpleTransitionContext);
  if (!context) {
    throw new Error(
      "useSimpleTransition must be used within a SimpleTransitionProvider"
    );
  }
  return context;
};
