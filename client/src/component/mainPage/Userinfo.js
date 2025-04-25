import React from "react";

const UserInfo = () => {
  return (
    <div className="user-welcome mb-3 mt-5 mx-32 w-full flex items-center">
      <img
        src="http://placehold.co/65?text=Profile"
        alt="Profile"
        className="rounded-full me-4"
      />
      <div>
        <p className="p-0">Welcome {"{user}"}</p>
        <p className="p-0 text-xs">User description</p>
        <p className="p-0 text-xs">School Description</p>
      </div>
    </div>
  );
};

export default UserInfo;
