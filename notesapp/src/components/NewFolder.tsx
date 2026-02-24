import { useState } from "react";
import { createFolder } from "../Api/PostApi"; 

interface Props {
  onFolderCreated: (folder: any) => void;
}

function NewFolder({ onFolderCreated }: Props) {
  const [name, setName] = useState("");

  const handleCreate = async () => {
    if (!name.trim()) return;

    try {
      const newFolder = await createFolder(name); 
      onFolderCreated(newFolder); 
      setName(""); 
    } catch (err) {
      console.error("Error creating folder", err);
    }
  };

  return (
    <div className="flex gap-2 p-4">
      <input
        type="text"
        placeholder="New folder..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="flex-1 p-2 rounded bg-gray-800 border border-gray-700 text-white text-sm"
      />
      <button
        onClick={handleCreate}
        className="bg-zinc-600 px-3 py-1 rounded hover:bg-zinc-500 text-sm"
      >
        Add
      </button>
    </div>
  );
}

export default NewFolder;