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

// import { useNavigate } from "react-router-dom";
import type { Folder } from "../../types/types";
// import AddNote from "../NewNote";
// import Recentnotes from "../Recentnotes";
// import Folders from "../Folders";
// import NewFolder from "../NewFolder";
import { getFolders } from "../../Api/FolderAPI";
// import { createNote} from "../../Api/NoteAPI";
import "../../App.css";
// import { NavLink } from "react-router-dom";
// import type { NotesType } from "../../types/types";
import { useNotes } from "../../context/Notescontext";
import AsideHeader from "./AsideHeader";
import AsideFolders from "./AsideFolders";
import AsideMore from "./AsideMore";
import type { NotesType } from "../../types/types";
// import toast from "react-hot-toast";

interface AsideProps {
  folders: Folder[];
  selectedFolderId: string | null;
  onSelectFolder: (id: string, name: string) => void;
  onClearFolder: () => void;
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
  // const navigate = useNavigate();

  const {
    searchQuery,
    setSearchQuery,
    isDarkMode,
    toggleTheme,
    triggerRefetch,
    selectedFolderName,
    refetchKey,
    setFolders: setContextFolders 
  } = useNotes();

  const [folders, setFolders] = useState<Folder[]>([]);
  const [showNewFolder, setShowNewFolder] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchResults] = useState<NotesType[]>([]);

  const fetchFolders = async () => {
    try {
      const data = await getFolders();
      setFolders(data);
      setContextFolders(data); 
    } catch {
      setFolders([]);
      setContextFolders([]); 
    }
  };


// const handleNewNote = async () => {
//   if (!selectedFolderId) {
//     toast.error("Select a folder first!");
//     return;
//   }
//   try {
//     const newNote = await createNote(selectedFolderId,"Untitled","",new Date());

//     triggerRefetch();
//     navigate(`/notes/${selectedFolderId}/${newNote.id}`);
//   } catch (e) {
//     console.error(e);
//     toast.error("Failed to create note");
//   }
// };

  useEffect(() => {
    fetchFolders();
  }, [refetchKey]);


const handleFolderCreated = (folder: Folder) => {
  if (folder?.id && folder?.name) {
    setFolders(prev => [...prev, folder]);
    setContextFolders(prev => [...prev, folder]);
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
            handleSearch={() => setShowSearch(prev => !prev)}
            showSearch={showSearch}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedFolderId={selectedFolderId}
            triggerRefetch={triggerRefetch}/>

          <AsideFolders
            searchQuery={searchQuery}
            searchResults={searchResults}
            showNewFolder={showNewFolder}
            setShowNewFolder={setShowNewFolder}
            handleFolderCreated={handleFolderCreated}
            folders={folders}
            onSelectFolder={onSelectFolder}
            selectedFolderId={selectedFolderId}
            selectedFolderName={selectedFolderName || ""}
            fetchFolders={fetchFolders}/>

        </div>

        <div>
          <AsideMore onClearFolder={onClearFolder} />
        </div>

      </div>
    </>
  )
}

export default Aside;