import React from "react";
import Recentnotes from "../Recentnotes";
import { PiFolderSimplePlusBold } from "react-icons/pi";
import NewFolder from "../NewFolder";
import Folders from "../Folders";
import type { NotesType, Folder } from "../../types/types";

interface AsideFoldersProps {
  searchQuery: string;
  searchResults: NotesType[];
  showNewFolder: boolean;
  setShowNewFolder: React.Dispatch<React.SetStateAction<boolean>>;
  handleFolderCreated: (folder: Folder) => void;
  folders: Folder[];
  onSelectFolder: (id: string, name: string) => void;
  selectedFolderId: string | null;
  selectedFolderName: string;
  fetchFolders: () => void;
}

const AsideFolders: React.FC<AsideFoldersProps> = ({
  searchQuery,
  searchResults,
  showNewFolder,
  setShowNewFolder,
  handleFolderCreated,
  folders,
  onSelectFolder,
  selectedFolderId,
  selectedFolderName,
  fetchFolders,
}) => {
  return (
    <div>
      <div>
        <h4 className="text-text-dim px-8 text-sm font-bold pt-5">
          {searchQuery?.length > 0 ? "Search Results" : "Recents"}
        </h4>

        <Recentnotes
          searchResults={searchResults}
          searchQuery={searchQuery}
        />
      </div>

      <div className="flex flex-col flex-1 overflow-hidden h-87">
        <div className="flex justify-between items-center">
          <h4 className="text-text-dim px-8 text-sm font-bold pt-1">
            Folders
          </h4>

          <div className="px-6">
            <button
              className="cursor-pointer text-2xl"
              onClick={() => setShowNewFolder((prev) => !prev)}
            >
              <PiFolderSimplePlusBold />
            </button>
          </div>
        </div>

        {showNewFolder && (
          <div className="px-6">
            <NewFolder onFolderCreated={handleFolderCreated} />
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-4 scrollbar-hide truncate">
          <Folders
            folders={folders}
            onSelectFolder={onSelectFolder}
            selectedFolderId={selectedFolderId}
            selectedFoldername={selectedFolderName}
            refreshFolders={fetchFolders}
          />
        </div>
      </div>
    </div>
  );
};

export default AsideFolders;