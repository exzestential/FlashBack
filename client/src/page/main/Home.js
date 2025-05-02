import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import api from "../../utils/axios";

import { SideNav, Modal, ColorSelect } from "../../component/global";
import { AnimatedTabPanels, Tabs, UserInfo } from "../../component/mainPage";
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
  const [title, setTitle] = useState("");
  const [folder_id, setFolder_id] = useState(1);

  const [folders, setFolders] = useState([]);
  const [name, setName] = useState("");
  const [folderColor, setFolderColor] = useState("");

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Panels (after folders state is available)
  const panels = [
    { key: "Decks", content: <DecksTab decks={decks} /> },
    { key: "Folders", content: <FoldersTab folders={folders} /> },
    { key: "Favourites", content: <div>Favourites content...</div> },
    { key: "Statistics", content: <div>Statistics content...</div> },
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
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-700"></div>
      </div>
    );
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

  const handleCreateDeck = (e) => {
    fetch("http://localhost:5000/api/create-deck", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        title: title,
        folder_id: folder_id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Deck created:", data);
        setDeckModalOpen(false); // ✅ Close the modal
        setTitle(""); // Optional: reset form
        setFolder_id(""); // Optional: reset folder selection
        fetchDecks(); // ✅ Refresh deck tab content
      })
      .catch((err) => {
        console.error("Error creating deck:", err);
      });
  };

  const handleCreateFolder = (e) => {
    fetch("http://localhost:5000/api/create-folder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        name: name,
        color: folderColor,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Folder created:", data);
        setFolderModalOpen(false); // ✅ Close the modal
        setName(""); // Optional: reset input
        setFolderColor(""); // Optional: reset color picker
        fetchFolders(); // ✅ Refresh folder tab content
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
            >
              Create Card
              <TbCardsFilled className="text-white text-5xl ms-3" />
            </button>
          </div>
        </div>

        <Modal
          isOpen={isDeckModalOpen}
          onClose={() => setDeckModalOpen(false)}
          cancelText="Go Back"
          confirmText="Create"
          onConfirm={handleCreateDeck}
        >
          <div className="flex flex-col space-y-4">
            <h2 className="text-xl font-semibold">Create New Deck</h2>
            <input
              type="text"
              id="first_name"
              className="bg-gray-100 border border-gray-200 focus:ring-sky-700 focus:border-sky-700 focus:outline-none p-2.5 rounded-xl w-full placeholder:text-gray-600 text-gray-600"
              placeholder="Enter Name..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <select
              id="folder"
              name="folder"
              value={folder_id}
              className="appearance-none bg-gray-100 border border-gray-200 focus:ring-sky-700 focus:border-sky-700 focus:outline-none p-2.5 rounded-xl w-full text-gray-600"
              onChange={(e) => setFolder_id(e.target.value)}
              required
            >
              <option value="">Select a folder</option>
              {folders.map((folder) => (
                <option key={folder.folder_id} value={folder.folder_id}>
                  {folder.name}
                </option>
              ))}
            </select>
          </div>
        </Modal>

        <Modal
          isOpen={isFolderModalOpen}
          onClose={() => setFolderModalOpen(false)}
          cancelText="Go Back"
          confirmText="Create"
          onConfirm={handleCreateFolder}
        >
          <div className="flex flex-col space-y-4">
            <h2 className="text-xl font-semibold">Create New Folder</h2>
            <input
              type="text"
              id="first_name"
              className="bg-gray-100 border border-gray-200 focus:ring-sky-700 focus:border-sky-700 focus:outline-none p-2.5 rounded-xl w-full placeholder:text-gray-600 text-gray-600"
              placeholder="Enter Name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <ColorSelect setFolderColor={setFolderColor} />
          </div>
        </Modal>
      </div>
    </motion.div>
  );
};

export default Home;
