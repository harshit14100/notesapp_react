// import Folders from './Folders';
// import NewFolder from "./NewFolder";
import React, { useEffect, useState } from "react";
// import noteslogo from "../../assets/logo.svg";
// import { IoSearch } from "react-icons/io5";
// import { TbStar } from "react-icons/tb";
// import { RiDeleteBin7Line } from "react-icons/ri";
// import { FiArchive } from "react-icons/fi";
// import { PiFolderSimplePlusBold } from "react-icons/pi";
// import { GoSun, GoMoon } from "react-icons/go";

import type { Folder } from "../../types/types";
// import AddNote from "../NewNote";
// import Recentnotes from "../Recentnotes";
// import Folders from "../Folders";
// import NewFolder from "../NewFolder";
import { getFolders } from "../../Api/FolderAPI";
import { searchNotes } from "../../Api/NoteAPI";
import "../../App.css";
// import { NavLink } from "react-router-dom";
import type { NotesType } from "../../types/types";
import { useNotes } from "../../context/Notescontext";
import AsideHeader from "./AsideHeader";
import AsideFolders from "./AsideFolders";
import AsideMore from "./AsideMore";

interface AsideProps {
  onSelectFolder: (id: string, name: string) => void;
  onClearFolder: () => void;
  selectedFolderId: string | null;
}

// interface Folder {
//   id: string;
//   name: string;
// }

const Aside: React.FC<AsideProps> = ({
  onSelectFolder,
  onClearFolder,
  selectedFolderId,
}) => {

  const {
    searchQuery,
    setSearchQuery,
    isDarkMode,
    toggleTheme,
    triggerRefetch,
    selectedFolderName,
    refetchKey
  } = useNotes();

  const [folders, setFolders] = useState<Folder[]>([]);
  const [searchResults, setSearchResults] = useState<NotesType[]>([]);
  const [showNewFolder, setShowNewFolder] = useState(false);

  const fetchFolders = async () => {
    try {
      const data = await getFolders();
      setFolders(data);
    } catch {
      setFolders([]);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, [refetchKey]);

  useEffect(() => {
    const fetchSearch = async () => {
      if (!searchQuery) {
        setSearchResults([]);
        return;
      }

      try {
        const res = await searchNotes(searchQuery);
        setSearchResults(res);
      } catch {
        setSearchResults([]);
      }
    };

    fetchSearch();
  }, [searchQuery]);

  const handleFolderCreated = (newFolder: { folder: Folder }) => {
    const folder: Folder = newFolder?.folder || newFolder;

    if (folder?.id && folder?.name) {
      setFolders((prev) => [...prev, folder]);
      onSelectFolder(folder.id, folder.name);
      triggerRefetch();
    }

    setShowNewFolder(false);
  };

  return (
    <>
      <div className={'bg-bg-aside min-w-1/5 h-screen text-text-main font-sans flex flex-col justify-between overflow-hidden border-r border-border-dark'}>

        <div>

          <AsideHeader
            isDarkMode={isDarkMode}
            toggleTheme={toggleTheme}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedFolderId={selectedFolderId}
            triggerRefetch={triggerRefetch}
          />

          <AsideFolders
            searchQuery={searchQuery}
            searchResults={searchResults}
            showNewFolder={showNewFolder}
            setShowNewFolder={setShowNewFolder}
            handleFolderCreated={handleFolderCreated}
            folders={folders}
            onSelectFolder={onSelectFolder}
            selectedFolderId={selectedFolderId}
            selectedFolderName={selectedFolderName}
            fetchFolders={fetchFolders}
          />

        </div>

        <div>
          <AsideMore onClearFolder={onClearFolder} />
        </div>

      </div>
    </>
  )
}

export default Aside