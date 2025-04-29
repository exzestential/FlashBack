import React, { useEffect, useState } from "react";
import "./Notification.css";

const Notification = ({ notification, setNotification }) => {
  const [fadingNotifications, setFadingNotifications] = useState([]);

  useEffect(() => {
    if (notification.length === 0) return;

    const firstFadeTimer = setTimeout(() => {
      if (notification.length > 0) {
        startFadeSequence();
      }
    }, 2000);

    return () => {
      clearTimeout(firstFadeTimer);
    };
  }, [notification.length]); // Only reset the first timer when the length changes

  const startFadeSequence = () => {
    let currentIndex = 0;

    const fadeNext = () => {
      if (currentIndex >= notification.length) return;

      const item = notification[currentIndex];

      // Add this notification to the fading list
      setFadingNotifications((prev) => [...prev, item.id]);

      setTimeout(() => {
        setNotification((prev) => prev.filter((n) => n.id !== item.id));
        setFadingNotifications((prev) => prev.filter((id) => id !== item.id));
      }, 3000);

      // Start fading the next notification after a delay
      currentIndex++;
      if (currentIndex < notification.length) {
        setTimeout(fadeNext, 500);
      }
    };

    // Start the sequence
    fadeNext();
  };

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2">
      {notification.map((item) => (
        <div
          key={item.id}
          className={`notification-item bg-blue-700 text-white px-5 py-2.5 rounded shadow-md text-sm max-w-[300px] ${
            fadingNotifications.includes(item.id) ? "fade-out-active" : ""
          }`}
        >
          {item.message}
        </div>
      ))}
    </div>
  );
};

export default Notification;
