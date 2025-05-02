import React, { useEffect, useState } from "react";
import { FolderIcon } from "../../../component/cards";

const FoldersTab = ({ folders }) => {
  return (
    <div className="mx-40">
      <div className="grid grid-cols-1 my-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 110:grid-cols-5 gap-10">
        {folders.map((folder) => (
          <FolderIcon key={folder.folder_id} folder={folder} />
        ))}
      </div>
    </div>
  );
};

export default FoldersTab;
