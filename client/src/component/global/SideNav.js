import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { FaHome, FaBook, FaPlay, FaPlus, FaBell, FaUser } from "react-icons/fa";
import { FaEarthAmericas, FaGear } from "react-icons/fa6";
import { BiSidebar } from "react-icons/bi";

const SideNav = () => {
  const [collapsed, setCollapsed] = useState(false);

  const tabs = [
    { label: "Home", icon: FaHome, link: "/home" },
    { label: "Explore", icon: FaEarthAmericas, link: "/discover" },
    { label: "Study", icon: FaPlay, link: "#" },
    { label: "Create", icon: FaPlus, link: "#" },
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
        {/* Brand + Collapse button */}
        <div className={`brand flex items-center`}>
          <Link
            className={`flex items-center cursor-pointer transition-all duration-300 ${
              collapsed
                ? "opacity-0 translate-x-[-10px] pointer-events-none"
                : "opacity-100 translate-x-0"
            }`}
            to={"/"}
          >
            <img src="http://placehold.co/50" className="pe-4" alt="Logo" />
            <h1 className="text-xl font-bold">FlashBack</h1>
          </Link>

          <div className="flex items-center h-14">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className={`absolute right-6 ${
                collapsed ? "mx-auto" : "ms-auto"
              }`}
            >
              <BiSidebar className="h-8 w-8 text-gray-400" />
            </button>
          </div>
        </div>

        <hr className="my-4" />

        {/* Tabs */}
        <div className="options flex flex-col flex-grow">
          <div className="space-y-2 flex-grow">
            {tabs.map((tab, index) => (
              <SidebarTab
                key={index}
                icon={tab.icon}
                label={tab.label}
                link={tab.link}
                collapsed={collapsed}
                className=""
              />
            ))}
          </div>

          <SidebarTab
            icon={FaGear}
            label="Settings"
            collapsed={collapsed}
            className="mt-auto"
          />
        </div>
      </div>
    </div>
  );
};

const SidebarTab = ({ icon: Icon, label, link, collapsed, className = "" }) => {
  const location = useLocation();
  const isActive = location.pathname === link;

  return (
    <Link
      className={`relative h-10 px-3 flex items-center rounded-lg hover:bg-gray-200 transition-colors duration-300 cursor-pointer ${className}  
     ${isActive ? "bg-sky-500 text-white pointer-events-none" : ""} `}
      to={link}
    >
      {/* Icon: Keep it consistent size, no shrinking */}
      <div className="w-5 h-5 flex justify-center items-center z-10">
        <Icon
          className={`w-full h-full      ${
            location.pathname === link ? " text-white" : "text-gray-400 "
          } text-gray-400`}
        />
      </div>

      {/* Label: absolutely positioned, fading out */}
      <span
        className={`absolute left-12 transition-all duration-300 whitespace-nowrap text-sm z-0 ${
          collapsed
            ? "opacity-0 translate-x-[-10px] pointer-events-none"
            : "opacity-100 translate-x-0"
        }`}
      >
        {label}
      </span>
    </Link>
  );
};

export default SideNav;
