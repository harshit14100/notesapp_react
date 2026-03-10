import Aside from "../components/sidebar/Aside";
import Middle from "../components/middle/Mid";
import RightSide from "../components/editor/Rightsectionbase";
import { NotesProvider, useNotes } from "../context/Notescontext";
import { useNavigate } from "react-router-dom";
import { getFolders } from "../Api/FolderAPI";
import { useEffect, useState } from "react";
import type { Folder } from "../types/types";

const HomeLayout = () => {
  const { selectedFolderId, setSelectedFolder, clearSelectedFolder } = useNotes();
  const navigate = useNavigate();


  const handleSelectFolder = (id: string, name: string) => {
    setSelectedFolder(id, name);
    navigate(`/${id}`)
  };

  const [folders, setFolders] = useState<Folder[]>([]);

  useEffect(() => {
  const fetchFolders = async () => {
    const data = await getFolders();
    setFolders(data);
  };

  fetchFolders();
}, []);

  return (
    <div className="flex w-full h-full bg-bg-main overflow-hidden">
      <div className="w-[20%] h-full border-r border-border-dark">
        <Aside
          folders={folders}
          onSelectFolder={handleSelectFolder}
          onClearFolder={clearSelectedFolder}
          selectedFolderId={selectedFolderId}
        />
      </div>
      <div className="w-[25%] h-full border-r border-white/5">
        <Middle />
      </div>
      <div className="w-[55%] h-full">
        <RightSide />
      </div>
    </div>
  );
};

function Home() {
  return (
    <NotesProvider>
      <HomeLayout />
    </NotesProvider>
  );
}

export default Home;