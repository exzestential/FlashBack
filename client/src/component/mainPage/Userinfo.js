import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LightButton } from "../global";
import { Modal } from "../global";
import { UserIcon } from "../../assets";

const UserInfo = ({ user }) => {
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        localStorage.removeItem("token");
        navigate("/");
      } else {
        console.error("Logout failed:", response.status);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  return (
    <>
      <div className="user-welcome mb-3 pt-5 px-32 w-full flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={user.profilePicture || UserIcon}
            alt="Profile"
            className="rounded-full me-4 w-16 h-16"
          />
          <div>
            <p className="p-0">Welcome {user.username}</p>
            <p className="p-0 text-xs">
              {user.description || "Add a Description to yourself"}
            </p>
            <p className="p-0 text-xs">
              {user.school || "In a school? Join your school now!"}
            </p>
          </div>
        </div>

        <LightButton
          text="Logout"
          onClick={() => setIsLogoutModalOpen(true)}
          style="w-24"
        />
      </div>

      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
        confirmText="Logout"
        cancelText="Cancel"
      >
        <h2 className="text-xl font-semibold mb-4">Confirm Logout</h2>
        <p>Are you sure you want to logout?</p>
      </Modal>
    </>
  );
};

export default UserInfo;
