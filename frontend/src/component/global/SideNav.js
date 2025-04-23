import React from "react";
import { FaHome, FaBook, FaPlay, FaPlus, FaBell, FaUser} from "react-icons/fa";
import { FaEarthAmericas, FaGear } from "react-icons/fa6";

const SideNav = () => {
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
        <div className="side-nav flex h-screen">
            <div className="relative container w-64 border-e-2 p-4 flex flex-col">
                <div className="brand flex items-center mb-4">
                    <img src="http://placehold.co/50" className="pe-4" alt="Logo" />
                    <h1>FlashBack</h1>
                </div>
                <hr className="my-4" />
                <div className="options flex flex-col flex-grow">
                    <div className="space-y-4">
                        {tabs.map(({ label, icon: Icon, link }, index) => (
                            <a
                                key={index}
                                href={link}
                                className="flex items-center p-2 hover:bg-gray-200 rounded-lg"
                            >
                                <Icon className="w-5 h-5 me-3 text-gray-400" />
                                <span>{label}</span>
                            </a>
                        ))}
                    </div>
                    <a
                        href="#"
                        className="flex px-2 py-4 hover:bg-gray-200 rounded-lg mt-auto"
                    >
                        <FaGear className="w-5 h-5 me-3 text-gray-400" />
                        <span>Settings</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SideNav;
