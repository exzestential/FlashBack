import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import api from "../../utils/axios";

import { SideNav, Modal } from "../../component/global";
import { AnimatedTabPanels, Tabs, UserInfo } from "../../component/mainPage";
import Review from "../../component/homeTabs/Review";
import { FloatingButton } from "../../component/cards";

const Home = () => {
  const tabs = ["Review", "Decks", "Folders", "Favourites", "Statistics"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get userId from localStorage
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        if (!userId || !token) {
          console.error("No userId or token found in localStorage");
          setError("Authentication required");
          setIsLoading(false);
          return;
        }

        console.log("Fetching user data for ID:", userId);
        console.log("Token available:", !!token);

        // Make API request to get user data - notice the updated path
        const res = await api.get(`/api/user/home/${userId}`);

        console.log("User data response:", res.data);

        if (res.data && res.data.user) {
          setUser(res.data.user);
          setIsLoading(false);
        } else {
          setError("Invalid user data received");
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err.response?.data?.message || "Failed to load user data");
        setIsLoading(false);

        // If unauthorized, redirect to login
        if (
          err.response &&
          (err.response.status === 401 || err.response.status === 403)
        ) {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          // Redirect to login after a short delay
          setTimeout(() => navigate("/login"), 1500);
        }
      }
    };

    fetchUserData();
  }, [navigate]);

  // Show loading state while data is being fetched
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-700"></div>
      </div>
    );
  }

  // If error occurred after loading completes
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">
            Error loading user data
          </h2>
          <p>{error}</p>
          <button
            onClick={() => navigate("/login")}
            className="mt-4 bg-sky-700 text-white px-4 py-2 rounded-lg"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  // prepare panels array for AnimatedTabPanels
  const panels = [
    {
      key: "Review",
      content: <Review />,
    },
    { key: "Decks", content: <div>Decks content…</div> },
    { key: "Folders", content: <div>Folders content…</div> },
    { key: "Favourites", content: <div>Favourites content…</div> },
    { key: "Statistics", content: <div>Statistics content…</div> },
  ];

  const handleCreate = () => {
    alert("Item created!");
    setModalOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="page-container flex min-h-screen">
        <SideNav />
        <div className="relative home w-full flex flex-col">
          <UserInfo user={user} />

          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={(tab) => {
              setActiveTab(tab);
              setActiveIndex(tabs.indexOf(tab));
            }}
          />
          <div className="bg-gray-100 grow overflow-auto">
            <AnimatedTabPanels
              panels={panels}
              activeIndex={activeIndex}
              height="h-full"
            />
          </div>
        </div>
        <FloatingButton onClick={() => setModalOpen(true)} />

        <Modal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          cancelText="Go Back"
          confirmText="Create"
          onConfirm={handleCreate}
        >
          <h2 className="text-xl font-semibold mb-4">Create New Deck</h2>

          <input
            type="text"
            id="first_name"
            className="bg-gray-100 border border-gray-200 focus:ring-sky-700 focus:border-sky-700 focus:outline-none p-2.5 rounded-xl w-full"
            placeholder="Enter Name..."
            required
          />
        </Modal>
      </div>
    </motion.div>
  );
};

export default Home;
