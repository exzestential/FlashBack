import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaSort,
  FaSortAlphaDown,
  FaSortAlphaUp,
  FaCalendarAlt,
} from "react-icons/fa";

import { SideNav, Back, Loader } from "../../../../component/global";
import {
  LightFloatingButton,
  CreateDeckModal,
} from "../../../../component/mainPage";
import DeckCard from "../../../../component/cards/DeckCard";

const FolderDetails = () => {
  const navigate = useNavigate();
  const { folderId } = useParams();

  // UI States
  const [isDeckModalOpen, setDeckModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreatingDeck, setIsCreatingDeck] = useState(false);

  // Data States
  const [folder, setFolder] = useState(null);
  const [decks, setDecks] = useState([]);
  const [user, setUser] = useState(null);
  const [folders, setFolders] = useState([]); // For the dropdown in CreateDeckModal

  // Sorting States
  const [sortBy, setSortBy] = useState("last_modified");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [showSortMenu, setShowSortMenu] = useState(false);

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

        const res = await fetch(
          `http://localhost:5000/api/user/home/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await res.json();

        if (data?.user) {
          setUser(data.user);
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
      }
    };

    fetchUserData();
  }, [navigate]);

  // Function to fetch decks
  const fetchDecks = async () => {
    try {
      const decksRes = await fetch(
        `http://localhost:5000/api/folders/${folderId}/decks?sortBy=${sortBy}&sortOrder=${sortOrder}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!decksRes.ok) {
        throw new Error(`Failed to fetch decks: ${decksRes.status}`);
      }

      const decksData = await decksRes.json();
      setDecks(decksData);
      return decksData;
    } catch (err) {
      console.error("Error fetching decks:", err);
      setError("Failed to load decks");
      throw err;
    }
  };

  // Fetch folder and its decks
  useEffect(() => {
    const fetchFolderData = async () => {
      setIsLoading(true);
      try {
        // Fetch folder details
        const folderRes = await fetch("http://localhost:5000/api/folders", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!folderRes.ok) {
          throw new Error(`Failed to fetch folders: ${folderRes.status}`);
        }

        const foldersData = await folderRes.json();
        setFolders(foldersData); // Save all folders for the dropdown

        const currentFolder = foldersData.find(
          (f) => f.folder_id.toString() === folderId
        );

        if (!currentFolder) {
          setError("Folder not found");
          setIsLoading(false);
          return;
        }

        setFolder(currentFolder);

        // Fetch decks
        await fetchDecks();
      } catch (err) {
        console.error("Error fetching folder data:", err);
        setError("Failed to load folder data");
      } finally {
        setIsLoading(false);
      }
    };

    if (folderId) {
      fetchFolderData();
    }
  }, [folderId, sortBy, sortOrder]);

  // Handle sort change
  const handleSortChange = (sortField) => {
    if (sortBy === sortField) {
      // Toggle order if same field
      setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
    } else {
      // New field, set default order
      setSortBy(sortField);
      setSortOrder(sortField === "title" ? "ASC" : "DESC");
    }
    setShowSortMenu(false);
  };

  // Handle create deck with optimistic update
  const handleCreateDeck = (deckData) => {
    // Create a temporary deck with loading state
    const tempDeck = {
      ...deckData,
      deck_id: `temp-${Date.now()}`, // Temporary ID
      folder_id: folderId,
      title: deckData.title,
      card_count: 0,
      isLoading: true,
    };

    // Add the temporary deck to the UI immediately
    setDecks((prevDecks) => [...prevDecks, tempDeck]);

    // Show loading state
    setIsCreatingDeck(true);

    // Close the modal right away
    setDeckModalOpen(false);

    fetch("http://localhost:5000/api/create-deck", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        ...deckData,
        folder_id: deckData.folder_id || folderId, // Use provided folder_id or default to current
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Deck created:", data);

        // Fetch all decks to ensure we have the correct data
        return fetchDecks();
      })
      .catch((err) => {
        console.error("Error creating deck:", err);
        alert("Failed to create deck: " + err.message);

        // Remove the temporary deck on error
        setDecks((prevDecks) =>
          prevDecks.filter((deck) => deck.deck_id !== tempDeck.deck_id)
        );
      })
      .finally(() => {
        setIsCreatingDeck(false);
      });
  };

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
            Error loading folder data
          </h2>
          <p>{error}</p>
          <button
            onClick={() => navigate("/home")}
            className="mt-4 bg-sky-700 text-white px-4 py-2 rounded-lg"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="page-container flex min-h-screen">
        <SideNav />
        <div className="relative w-full flex flex-col">
          <div className="flex justify-between items-center p-4 shadow-sm border z-10 border-b-gray-200">
            <div className="flex items-center">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center space-x-4 mr-4 text-gray-600 "
              >
                <Back /> <p className="text-xl">Back</p>
              </button>
              <h1 className="text-2xl  font-bold">
                <span
                  className={`inline-block w-4 h-4 rounded-full bg-${folder?.color}-500 mr-2`}
                ></span>
                {folder?.name}
              </h1>
            </div>

            {/* Sort dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
              >
                <FaSort className="mr-2" />
                Sort by {sortBy === "title" ? "Name" : "Date"}
                {sortBy === "title" ? (
                  sortOrder === "ASC" ? (
                    <FaSortAlphaDown className="ml-2" />
                  ) : (
                    <FaSortAlphaUp className="ml-2" />
                  )
                ) : (
                  <FaCalendarAlt className="ml-2" />
                )}
              </button>

              {showSortMenu && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg z-10 w-48">
                  <button
                    onClick={() => handleSortChange("title")}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                  >
                    <FaSortAlphaDown className="mr-2" />
                    Sort by Name
                  </button>
                  <button
                    onClick={() => handleSortChange("last_modified")}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                  >
                    <FaCalendarAlt className="mr-2" />
                    Sort by Date Modified
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-100 grow overflow-auto p-8 px-20">
            {isCreatingDeck && (
              <div className="fixed top-4 right-4 bg-white p-4 rounded-lg shadow-lg z-20 flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-sky-700 mr-3"></div>
                Creating deck...
              </div>
            )}

            {decks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {decks.map((deck) => (
                  <div
                    key={deck.deck_id}
                    className={deck.isLoading ? "opacity-50" : ""}
                  >
                    <DeckCard
                      deck={{
                        ...deck,
                        folder_color: folder?.color || "gray",
                        title: deck.title || deck.name,
                        card_count: deck.card_count || 0,
                      }}
                    />
                    {deck.isLoading && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sky-700"></div>
                      </div>
                    )}
                  </div>
                ))}
                <div className="flex items-start m-6 justify-start">
                  <LightFloatingButton onClick={() => setDeckModalOpen(true)} />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64">
                <div className="text-gray-500 text-lg mb-4">
                  No decks in this folder yet
                </div>
                <button
                  onClick={() => setDeckModalOpen(true)}
                  className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
                >
                  Create a Deck
                </button>
              </div>
            )}
          </div>

          <CreateDeckModal
            isOpen={isDeckModalOpen}
            onClose={() => setDeckModalOpen(false)}
            onCreateDeck={handleCreateDeck}
            folders={folders}
            defaultFolderId={folderId}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default FolderDetails;
