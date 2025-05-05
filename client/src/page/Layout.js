// Layout.jsx
import React from "react";
import { SideNav } from "../component/global";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex">
      <SideNav />
      <div className="flex-grow ">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
