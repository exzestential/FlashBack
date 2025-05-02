import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Back,
  Settings,
  SideNav,
  Notification,
  ColoredButton,
  Forward,
  RepetitionButton
} from "../../component/global";
import { FlipCard } from "../../component/cards";


const DecktoCard = () => {
  const [notifications, setNotifications] = useState([]);
  const [activeRepetition, setActiveRepetition] = useState(null);
  
  // Mock data - replace with your actual card counts
  const cardStats = {
    new: 5,    // Blue
    hard: 3,    // Red
    easy: 12    // Green
  };

  const showNotification = (message) => {
    setNotifications((prev) => [
      ...prev,
      { id: Date.now(), message },
    ]);
  };

  const handleRepetitionClick = (type) => {
    setActiveRepetition(type);
    showNotification(`Card marked as: ${type}`);
    // Add your actual repetition logic here
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="edit-card flex min-h-screen">
        <SideNav />
        <div className="page-container flex flex-col w-full py-4 px-8">
          {/* Header Section */}
          <div className="flex items-center justify-between relative">
            <Back />
            
            {/* Centered Deck Title */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <h1 className="text-xl font-bold text-center">Deck Title</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Card Status Indicators */}
              <div className="flex space-x-2">
                <div className="flex items-center space-x-1 bg-blue-100 px-2 py-1 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-xs">{cardStats.new} New</span>
                </div>
                <div className="flex items-center space-x-1 bg-red-100 px-2 py-1 rounded-lg">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-xs">{cardStats.hard} Hard</span>
                </div>
                <div className="flex items-center space-x-1 bg-green-100 px-2 py-1 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs">{cardStats.easy} Easy</span>
                </div>
              </div>
              <Settings />
            </div>
          </div>
           
          {/* Main Card Area */}
          <div className="card-holder flex items-start mt-4 h-full justify-center space-x-20">
            <FlipCard />
          </div>

          {/* Bottom Section */}
          <div className="mt-auto w-full">
            {/* Spaced Repetition Buttons */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              <RepetitionButton 
                type="again" 
                isActive={activeRepetition === 'again'}
                onClick={() => handleRepetitionClick('again')}
              />
              <RepetitionButton 
                type="hard"
                isActive={activeRepetition === 'hard'}
                onClick={() => handleRepetitionClick('hard')}
              />
              <RepetitionButton 
                type="good"
                isActive={activeRepetition === 'good'}
                onClick={() => handleRepetitionClick('good')}
              />
              <RepetitionButton 
                type="easy"
                isActive={activeRepetition === 'easy'}
                onClick={() => handleRepetitionClick('easy')}
              />
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center py-4">
  <div className="flex items-center space-x-4">
    <Back />
    <p>Previous</p>
  </div>
  
  <div className="flex items-center space-x-4">
    <Forward />
    <p>Next</p>
  </div>
</div>
          </div>
        </div>

        <Notification
          notification={notifications}
          setNotification={setNotifications}
        />
      </div>
    </motion.div>
  );
};

export default DecktoCard;