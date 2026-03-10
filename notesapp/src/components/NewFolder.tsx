import { useState } from "react";
import { createFolder } from "../Api/PostApi"; 

import type { Folder } from "../types/types";

interface Props {
  onFolderCreated: (folder: Folder) => void;
}

const NewFolder= ({ onFolderCreated }: Props)=> {
  const [name, setName] = useState("");

  const handleCreate = async () => {
  if (!name.trim()) return;

  try {
    const newFolder = await createFolder(name);

    // console.log("created:", newFolder); 

    onFolderCreated(newFolder);
    setName("");
  } catch (err) {
    // console.error(err);
  }
};


  return (
    <div className="flex gap-2 p-4">
      <input
        type="text"
        placeholder="New folder..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        
        className="flex-1 p-2 rounded bg-transparent border border-border-input text-text-main text-sm focus:outline-none focus:border-primary-hover transition-colors"
      />
      <button
        onClick={handleCreate} 
        className="bg-button px-3 py-1 rounded hover:bg-button-hover text-text-main text-sm transition-all hover:shadow-lg hover:shadow-primary-hover/40 active:scale-95 cursor-pointer" 
      >
        Add
      </button>
    </div>
  );
}

export default NewFolder;