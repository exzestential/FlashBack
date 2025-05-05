import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../presets/Header";
import { Logo } from "../../assets";

const Nav = () => {
  const navigate = useNavigate();

  const handleBrandClick = () => {
    navigate("/");
  };

  return (
    <nav className="navbar-container fixed top-0 z-10 bg-white shadow-lg shadow-gray-100 w-full">
      <div className="mx-auto max-w-screen-xl grid grid-cols-2 py-3 px-6">
        <div className="brand flex">
          <a
            className="flex items-center cursor-pointer"
            onClick={handleBrandClick}
          >
            <img src={Logo} alt="" className="logo pe-5 w-20" />
            <h1 className="text-2xl font-semibold brand-name">FlashBack</h1>
          </a>
        </div>
        <div className="flex items-center justify-end">
          <button>About</button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
