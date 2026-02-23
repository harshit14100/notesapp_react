import { useState } from "react";
// import { createFolder } from "../Api/API";

interface Props {
  onFolderCreated: (folder: any) => void;
}

function NewFolder({ onFolderCreated }: Props) {
  const [name, setName] = useState("");

  const handleCreate = async () => {
    if (!name.trim()) return;

    try {
      const newFolder = await createFolder({ name });

      onFolderCreated(newFolder); 
      setName(""); 

    } catch (err) {
      console.error("Error creating folder", err);
    }
  };

  return (
    <div className="flex gap-2 mt-2">
      <input
        type="text"
        placeholder="New folder..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="flex-1 p-2 rounded bg-gray-800 border border-gray-700 text-white"
      />

      <button
        onClick={handleCreate}
        className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
      >
        Add
      </button>
    </div>
  );
}

export default NewFolder;