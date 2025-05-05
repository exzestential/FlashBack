// SimplePageWithTransition.jsx
import React from "react";
import {
  SimpleTransitionProvider,
  useSimpleTransition,
} from "./SimpleTransitionProvider";
import "./SimplePageWithTransition.css";

// Demo content component
const DemoContent = () => {
  const { startTransition } = useSimpleTransition();

  const handleButtonClick = (e, color) => {
    // Get click position
    const rect = e.currentTarget.getBoundingClientRect();
    const origin = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };

    // Start transition with the button's color
    startTransition(color, origin, `/fake-path-${color}`);
  };

  return (
    <div className="demo-content">
      <h1>Transition Context Demo</h1>
      <p>Click any button to trigger a transition with different colors</p>

      <div className="button-grid">
        <button
          className="transition-button blue"
          onClick={(e) => handleButtonClick(e, "#3b82f6")}
        >
          Blue Transition
        </button>

        <button
          className="transition-button red"
          onClick={(e) => handleButtonClick(e, "#ef4444")}
        >
          Red Transition
        </button>

        <button
          className="transition-button green"
          onClick={(e) => handleButtonClick(e, "#22c55e")}
        >
          Green Transition
        </button>

        <button
          className="transition-button purple"
          onClick={(e) => handleButtonClick(e, "#a855f7")}
        >
          Purple Transition
        </button>
      </div>

      <div className="info-box">
        <h3>How this works:</h3>
        <ol>
          <li>When a button is clicked, we get its position</li>
          <li>We start a transition with the button's color and position</li>
          <li>The SimpleTransitionProvider renders an overlay</li>
          <li>The overlay animates using CSS clip-path</li>
          <li>When animation completes, the transition is reset</li>
        </ol>
        <p>
          <strong>Note:</strong> In a real app, this would trigger navigation
          after the animation.
        </p>
      </div>
    </div>
  );
};

// Main component that wraps everything with the provider
const SimplePageWithTransition = () => {
  return (
    <SimpleTransitionProvider>
      <DemoContent />
    </SimpleTransitionProvider>
  );
};

export default SimplePageWithTransition;
