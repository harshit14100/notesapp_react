import  { useEffect, useState, type ReactNode } from "react";
import { NotesContext } from "./Newcontext";
import type { Folder } from "../types/types";

export const UserContextProvider =({children}:{children:ReactNode})=>{
    const [refetchKey, setRefetchKey] = useState(0);
    const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
    const [selectedFolderName, setSelectedFolderName] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [folders, setFolders] = useState<Folder[]>([]);

    
    useEffect(() => {
    document.documentElement.classList.add("dark");
    }, []);

    const triggerRefetch = () => setRefetchKey((k) => k + 1);
    const setSelectedFolder = (id: string, name: string) => {
    setSelectedFolderId(id);
    setSelectedFolderName(name);
    };


    const clearSelectedFolder = () => {
      setSelectedFolderId(null);
      setSelectedFolderName(null);
    };

    const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  };

    const activeFolderName = selectedFolderName || folders?.find((f) => f.id === selectedFolderId)?.name || null;

    return(
        <NotesContext value={{
            refetchKey,
            triggerRefetch,
            folders,
            setFolders,
            selectedFolderName: activeFolderName,
            selectedFolderId,
            setSelectedFolder,
            clearSelectedFolder,
            searchQuery,
            setSearchQuery,
            isDarkMode,
            toggleTheme
        }}>
            {children}
        </NotesContext>
    )
}