import React, { useEffect, useState } from "react";
import { FolderIcon } from "../../../component/cards";

const FoldersTab = () => {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/folders", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Pass JWT token
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setFolders(data);
      })
      .catch((err) => console.error("Failed to fetch folders:", err));
  }, []);

  return (
    <div className="mx-40">
      <div className="grid grid-cols-1 my-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 110:grid-cols-5 gap-10">
        {folders.map((folder) => (
          <FolderIcon key={folder.deck_id} folder={folder} />
        ))}
      </div>
    </div>
  );
};

export default FoldersTab;
