import React from 'react';
import { motion } from 'framer-motion';

const RepetitionButton = ({ 
  type = 'again', 
  onClick, 
  isActive = false,
  className = '' 
}) => {
  // Define button properties based on type
  const buttonConfig = {
    again: {
      bgColor: 'bg-purple-600',
      ringColor: 'ring-purple-300',
      time: '<1m',
      label: 'Again'
    },
    hard: {
      bgColor: 'bg-blue-600',
      ringColor: 'ring-blue-300',
      time: '<6m',
      label: 'Hard'
    },
    good: {
      bgColor: 'bg-green-600',
      ringColor: 'ring-green-300',
      time: '<10m',
      label: 'Good'
    },
    easy: {
      bgColor: 'bg-yellow-600',
      ringColor: 'ring-yellow-300',
      time: '5d',
      label: 'Easy'
    }
  };

  const { bgColor, ringColor, time, label } = buttonConfig[type];

  return (
    <motion.div
      className={`${bgColor} bg-opacity-90 py-2 rounded cursor-pointer text-center text-white text-sm ${
        isActive ? `ring-2 ${ringColor}` : ''
      } ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <div>{time}</div>
      <div className="font-bold">{label}</div>
    </motion.div>
  );
};

export default RepetitionButton;