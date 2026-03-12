import React from "react";
import noteslogo from "../../assets/logo.svg";
import { IoSearch } from "react-icons/io5";
import { GoSun, GoMoon } from "react-icons/go";
import AddNote from "../NewNote";

interface AsideHeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  handleSearch: () => void;
  showSearch: boolean;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedFolderId: string | null;
  triggerRefetch: () => void;
}

const AsideHeader: React.FC<AsideHeaderProps> = ({
  isDarkMode,
  toggleTheme,
  handleSearch,
  showSearch,
  searchQuery,
  setSearchQuery,
  selectedFolderId,
  triggerRefetch,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center px-5 pt-[7%]">
        <img
          src={noteslogo}
          className={`${isDarkMode ? "invert-0" : "invert"}`}
        />

        <div className="flex items-center gap-4 text-text-main text-2xl">
          <button onClick={toggleTheme} className="cursor-pointer">
            {isDarkMode ? <GoSun /> : <GoMoon />}
          </button>

          <button onClick={handleSearch} className="text-2xl">
            <IoSearch />
          </button>
        </div>
      </div>

      {showSearch && (
        <div className="px-5 pt-3 absolute top-21 left-3 z-20">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes..."
            autoFocus
            className="w-76 h-12 p-2 rounded bg-button border border-border-input text-text-main text-sm focus:outline-none focus:border-primary-hover transition-colors"
          />
        </div>
      )}

      <div className="py-8 relative pl-8 font-bold">
        <div className="rounded w-[90%] gap-2">
          <AddNote folderId={selectedFolderId} onNoteAdded={triggerRefetch} />
        </div>
      </div>
    </div>
  );
};

export default AsideHeader;