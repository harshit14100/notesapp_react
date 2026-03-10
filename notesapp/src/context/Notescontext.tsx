import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Folder } from "../types/types";
import Folders from "../components/Folders";

interface NotesContextType {
  refetchKey: number;
  triggerRefetch: () => void;
  folders: Folder[];
  setFolders: (folders: Folder[]) => void;
  selectedFolderId: string | null;
  selectedFolderName: string | null;
  setSelectedFolder: (id: string, name: string) => void;
  clearSelectedFolder: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const NotesContext = createContext<NotesContextType | null>(null);

export const NotesProvider = ({ children }: { children: ReactNode }) => {
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

  return (
    <NotesContext.Provider
      value={{
        refetchKey,
        triggerRefetch,
        folders,
        setFolders,
        selectedFolderName,
        selectedFolderId,
        setSelectedFolder,
        clearSelectedFolder,
        searchQuery,
        setSearchQuery,
        isDarkMode,
        toggleTheme,
      }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const ctx = useContext(NotesContext);
  if (!ctx) {
    throw new Error("useNotes must be used inside NotesProvider");
  }
  return ctx;
};