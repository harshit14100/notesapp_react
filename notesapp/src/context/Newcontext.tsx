import { createContext} from "react";
import type { Folder } from "../types/types";


interface NotesContextType {
  refetchKey: number;
  triggerRefetch: () => void;
  folders: Folder[];
  setFolders: React.Dispatch<React.SetStateAction<Folder[]>>;
  selectedFolderId: string | null;
  selectedFolderName: string | null;
  setSelectedFolder: (id: string, name: string) => void;
  clearSelectedFolder: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const NotesContext = createContext<NotesContextType|undefined>(undefined)