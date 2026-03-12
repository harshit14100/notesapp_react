
import React, { useCallback, useEffect, useState } from "react";
import type { Folder } from "../../types/types";
import { getFolders } from "../../Api/FolderAPI";
import "../../App.css";
import { useNotes } from "../../context/Notescontext";
import AsideHeader from "./AsideHeader";
import AsideFolders from "./AsideFolders";
import AsideMore from "./AsideMore";
import type { NotesType } from "../../types/types";

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

  const {
    searchQuery,
    setSearchQuery,
    isDarkMode,
    toggleTheme,
    triggerRefetch,
    selectedFolderName,
    setFolders: setContextFolders ,
  } = useNotes();

  const [folders, setFolders] = useState<Folder[]>([]);
  const [showNewFolder, setShowNewFolder] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchResults] = useState<NotesType[]>([]);

  const fetchFolders =  useCallback( async () => {
    try {
      const data = await getFolders();
      setFolders(data);
      setContextFolders(data); 
    } catch {
      setFolders([]);
      setContextFolders([]); 
      
    }
  },[setContextFolders, setFolders]);
  
  
  // useEffect(()=>{
  //     fetchFolders()
  //   },[])
    

    useEffect(() => {
    fetchFolders();
  }, [ fetchFolders]);


const handleFolderCreated = (folder: Folder) => {
  if (folder?.id && folder?.name) {
    const updated = [...folders, folder];
      setFolders(updated);
      setContextFolders(updated);
      onSelectFolder(folder.id, folder.name);
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