import React, { useEffect } from "react";
import { SideNav } from "../component/global";
import { Outlet, useNavigate } from "react-router-dom";
import { useTransition } from "../component/utility/TransitionContext";

const Layout = () => {
  const navigate = useNavigate();
  const { completeTransition } = useTransition();

  useEffect(() => {
    const handlePageTransition = (event) => {
      const { path } = event.detail;
      if (path) {
        console.log("Layout received navigation event to path:", path);

        // Increased delay for navigation to allow animation to be visible
        setTimeout(() => {
          navigate(path);

          // Reset transition state after navigation
          setTimeout(() => {
            completeTransition();
            console.log("Navigation completed and transition reset");
          }, 800); // Increased delay
        }, 500); // Increased delay
      }
    };

    document.addEventListener("pageTransitionComplete", handlePageTransition);
    return () => {
      document.removeEventListener(
        "pageTransitionComplete",
        handlePageTransition
      );
    };
  }, [navigate, completeTransition]);

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <SideNav />
      <div className="flex-grow overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
