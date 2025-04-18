import React from "react";
import "../../styles/component/global/notification.css";

const Notification = ({ notification }) => {
  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2">
      {notification.map((notification) => (
        <div
          key={notification.id}
          className="bg-cyan-400 text-white px-5 py-2.5 rounded shadow-md text-sm max-w-[300px] slide-up fade-out"
        >
          {notification.message}
        </div>
      ))}
    </div>
  );
};

export default Notification;
