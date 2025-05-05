import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import api from "../../utils/axios";

import { ComingSoon, Loader } from "../../component/global";
import {
  AnimatedTabPanels,
  Tabs,
  UserInfo,
  CreateDeckModal,
  CreateFolderModal,
} from "../../component/mainPage";
import { FloatingButton } from "../../component/mainPage";
import { FaFolderOpen } from "react-icons/fa";
import { PiCardsThreeFill } from "react-icons/pi";
import { TbCardsFilled } from "react-icons/tb";

import DecksTab from "./homeTabs/DecksTab";
import FoldersTab from "./homeTabs/FoldersTab";

const Home = () => {
  const navigate = useNavigate();

  // UI States
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Decks");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFolderModalOpen, setFolderModalOpen] = useState(false);
  const [isDeckModalOpen, setDeckModalOpen] = useState(false);

  // Data States
  const [decks, setDecks] = useState([]);
  const [folders, setFolders] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Deck update and delete handlers
  const handleDeckUpdated = (updatedDeck) => {
    setDecks((prevDecks) =>
      prevDecks.map((deck) =>
        deck.deck_id === updatedDeck.deck_id
          ? { ...deck, ...updatedDeck }
          : deck
      )
    );
  };

  const handleDeckDeleted = (deckId) => {
    setDecks((prevDecks) =>
      prevDecks.filter((deck) => deck.deck_id !== deckId)
    );
  };

  const handleFolderDeleted = (deletedId) => {
    setFolders((prev) =>
      prev.filter((folder) => folder.folder_id !== deletedId)
    );
  };

  const handleFolderUpdated = (updatedFolder) => {
    setFolders((prev) =>
      prev.map((folder) =>
        folder.folder_id === updatedFolder.folder_id ? updatedFolder : folder
      )
    );
  };

  // Panels (after folders state is available)
  const panels = [
    {
      key: "Decks",
      content: (
        <DecksTab
          decks={decks}
          onDeckUpdated={handleDeckUpdated}
          onDeckDeleted={handleDeckDeleted}
          folders={folders}
        />
      ),
    },
    {
      key: "Folders",
      content: (
        <FoldersTab
          folders={folders}
          onFolderDeleted={handleFolderDeleted}
          onFolderUpdated={handleFolderUpdated}
        />
      ),
    },
    { key: "Favourites", content: <ComingSoon /> },
    { key: "Statistics", content: <ComingSoon /> },
  ];

  const tabs = panels.map((panel) => panel.key);

  // Fetch user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        if (!userId || !token) {
          setError("Authentication required");
          setIsLoading(false);
          return;
        }

        const res = await api.get(`/api/user/home/${userId}`);
        if (res.data?.user) {
          setUser(res.data.user);
        } else {
          setError("Invalid user data received");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err.response?.data?.message || "Failed to load user data");

        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          setTimeout(() => navigate("/?isLoggingIn=true"), 1500);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const fetchDecks = () => {
    fetch("http://localhost:5000/api/decks", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setDecks(data))
      .catch((err) => console.error("Failed to fetch decks:", err));
  };

  const fetchFolders = () => {
    fetch("http://localhost:5000/api/folders", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setFolders(data))
      .catch((err) => console.error("Failed to fetch folders:", err));
  };

  useEffect(() => {
    fetchFolders();
    fetchDecks();
  }, []);

  // Loading screen
  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  // Error screen
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">
            Error loading user data
          </h2>
          <p>{error}</p>
          <button
            onClick={() => navigate("/?isLoggingIn=true")}
            className="mt-4 bg-sky-700 text-white px-4 py-2 rounded-lg"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  const handleCreateDeck = (deckData) => {
    fetch("http://localhost:5000/api/create-deck", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(deckData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Deck created:", data);
        setDeckModalOpen(false);
        fetchDecks();
      })
      .catch((err) => {
        console.error("Error creating deck:", err);
      });
  };

  const handleCreateFolder = (folderData) => {
    fetch("http://localhost:5000/api/create-folder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(folderData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Folder created:", data);
        setFolderModalOpen(false);
        fetchFolders();
      })
      .catch((err) => {
        console.error("Error creating Folder:", err);
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="page-container flex min-h-screen">
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

        <div className="relative">
          <FloatingButton setOpen={setOpen} />

          <div
            className={`absolute bottom-[150px] right-2 mr-10 w-48 flex flex-col items-end space-y-4 transition-all duration-300 ${
              open ? "pointer-events-auto" : "pointer-events-none"
            }`}
          >
            <button
              className={`bg-sky-500 w-full text-white flex py-1 px-4 items-center justify-between rounded-md shadow transition-all duration-300 hover:bg-sky-400  ${
                open
                  ? "opacity-100 translate-y-0 delay-300" // Option 3 comes up first with delay 300ms
                  : "opacity-0 translate-y-4"
              }`}
              onClick={() => {
                setFolderModalOpen(true);
                setOpen(false);
              }}
            >
              Create Folder
              <FaFolderOpen className="text-white text-5xl ms-3 " />
            </button>
            <button
              className={`bg-sky-500 w-full text-white flex py-1 px-4 items-center justify-between rounded-md shadow transition-all duration-300 hover:bg-sky-400  ${
                open
                  ? "opacity-100 translate-y-0 delay-200" // Option 3 comes up first with delay 300ms
                  : "opacity-0 translate-y-4"
              }`}
              onClick={() => {
                setDeckModalOpen(true);
                setOpen(false);
              }}
            >
              Create Deck
              <PiCardsThreeFill className="text-white text-5xl ms-" />
            </button>
            <button
              className={`bg-sky-500 w-full text-white flex py-1 px-4 items-center justify-between rounded-md shadow transition-all duration-300 hover:bg-sky-400  ${
                open
                  ? "opacity-100 translate-y-0 delay-100" // Option 3 comes up first with delay 300ms
                  : "opacity-0 translate-y-4"
              }`}
              onClick={() => navigate("/create")}
            >
              Create Card
              <TbCardsFilled className="text-white text-5xl ms-3" />
            </button>
          </div>
        </div>

        {/* Use the new modular components */}
        <CreateDeckModal
          isOpen={isDeckModalOpen}
          onClose={() => setDeckModalOpen(false)}
          onCreateDeck={handleCreateDeck}
          folders={folders}
        />

        <CreateFolderModal
          isOpen={isFolderModalOpen}
          onClose={() => setFolderModalOpen(false)}
          onCreateFolder={handleCreateFolder}
        />
      </div>
    </motion.div>
  );
};

export default Home;
