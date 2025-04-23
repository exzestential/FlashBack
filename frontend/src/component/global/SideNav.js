import React, { useState } from "react";
import { FaHome, FaBook, FaPlay, FaPlus, FaBell, FaUser } from "react-icons/fa";
import { FaEarthAmericas, FaGear } from "react-icons/fa6";
import { BiSidebar } from "react-icons/bi";

const SideNav = () => {
  const [collapsed, setCollapsed] = useState(false);

  const tabs = [
    { label: "Home", icon: FaHome, link: "#" },
    { label: "My decks", icon: FaBook, link: "#" },
    { label: "Study", icon: FaPlay, link: "#" },
    { label: "Create", icon: FaPlus, link: "#" },
    { label: "Explore", icon: FaEarthAmericas, link: "#" },
    { label: "Notifications", icon: FaBell, link: "#" },
    { label: "Profile", icon: FaUser, link: "#" },
  ];

  return (
    <div className="side-nav flex">
      <div
        className={`relative border-e-2 p-4 flex flex-col h-screen overflow-hidden
        transition-[width] duration-300 ease-in-out
        ${collapsed ? "w-20" : "w-64"}`}
      >
        <div
          className={`brand flex items-center ${
            collapsed ? "justify-center" : ""
          }`}
        >
          {!collapsed && (
            <div className="flex items-center">
              <img src="http://placehold.co/50" className="pe-4" alt="Logo" />
              <h1>FlashBack</h1>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`${collapsed ? "h-[50px]" : "ms-auto"}`}
          >
            <BiSidebar className="h-8 w-8 text-gray-400" />
          </button>
        </div>

        <hr className="my-4"></hr>

        <div className="options flex flex-col flex-grow">
          <div className="space-y-4 flex-grow">
            {tabs.map((tab, index) => (
              <SidebarTab
                key={index}
                icon={tab.icon}
                label={tab.label}
                collapsed={collapsed}
              />
            ))}
          </div>

          <SidebarTab
            icon={FaGear}
            label={"Settings"}
            collapsed={collapsed}
            className="mt-auto"
          />
        </div>
      </div>
    </div>
  );
};

const SidebarTab = ({ icon: Icon, label, collapsed, className = "" }) => (
  <div
    className={`flex items-center p-2 hover:bg-gray-200 rounded-lg h-10 ${
      collapsed ? "justify-center" : ""
    }`}
  >
    <Icon className="w-5 h-5 text-gray-400" />
    {!collapsed && (
      <span
        className={`ms-3 transition-opacity duration-300 whitespace-nowrap ${
          collapsed ? "opacity-0 invisible w-0" : "opacity-100 visible"
        }`}
      >
        {label}
      </span>
    )}
  </div>
);

export default SideNav;
