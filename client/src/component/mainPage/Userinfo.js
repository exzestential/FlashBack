// UserInfo.js
import React from "react";

const UserInfo = ({ user }) => {
  return (
    <div className="user-welcome mb-3 pt-5 px-32 w-full flex items-center">
      <img
        src={user.profilePicture || "http://placehold.co/65?text=Profile"} // Use dynamic profile picture
        alt="Profile"
        className="rounded-full me-4"
      />
      <div>
        <p className="p-0">Welcome {user.username}</p> {/* Display user name */}
        <p className="p-0 text-xs">
          {user.description || "Add a Description to yourself"}
        </p>
        <p className="p-0 text-xs">
          {user.school || "In a school? Join your school now!"}
        </p>
      </div>
    </div>
  );
};

export default UserInfo;
