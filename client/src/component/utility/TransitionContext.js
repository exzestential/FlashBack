import React, { createContext, useState, useContext, useCallback } from "react";
import "./transition.css";

// Create context
const TransitionContext = createContext();

// Provider component
export const TransitionProvider = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionColor, setTransitionColor] = useState("#ffffff");
  const [transitionOrigin, setTransitionOrigin] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  const startTransition = useCallback(
    (
      color = "#ffffff",
      origin = { x: window.innerWidth / 2, y: window.innerHeight / 2 },
      path = null
    ) => {
      console.log("Starting transition with:", { color, origin, path });
      setTransitionColor(color);
      setTransitionOrigin(origin);
      setIsTransitioning(true);

      if (path) {
        document.dispatchEvent(
          new CustomEvent("pageTransitionComplete", {
            detail: { path },
          })
        );
      }
    },
    []
  );

  const completeTransition = useCallback(() => {
    setIsTransitioning(false);
    console.log("Transition complete");
  }, []);

  return (
    <TransitionContext.Provider
      value={{
        isTransitioning,
        transitionColor,
        transitionOrigin,
        startTransition,
        completeTransition,
      }}
    >
      {children}
      <TransitionOverlay /> {/* Make sure this is rendered */}
    </TransitionContext.Provider>
  );
};

// Update the TransitionOverlay component to log when it renders
const TransitionOverlay = () => {
  const { isTransitioning, transitionColor, transitionOrigin } =
    useContext(TransitionContext);

  console.log("Overlay rendering:", {
    isTransitioning,
    transitionColor,
    transitionOrigin,
  });

  return (
    <div
      className={`transition-overlay ${isTransitioning ? "active" : ""}`}
      style={{
        backgroundColor: transitionColor,
        "--origin-x": `${transitionOrigin.x}px`,
        "--origin-y": `${transitionOrigin.y}px`,
      }}
    />
  );
};

// Custom hook to use the transition context
export const useTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("useTransition must be used within a TransitionProvider");
  }
  return context;
};
