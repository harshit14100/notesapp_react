import React from 'react';
// import { getFolders } from '../Api/GetApi'; 
import { PiFolderSimpleBold } from "react-icons/pi"; 

interface FoldersProps {
  folders: any[];
  onSelectFolder: (id: string, name: string) => void;
  selectedFolderId?: string | null;
  selectedFoldername?: string | null;
}


const Folders: React.FC<FoldersProps> = ({ folders, onSelectFolder, selectedFolderId }) => {

  return (
    <div>
      {folders.length === 0 ? (
        <p className='pl-8 text-sm text-text-muted'>No folders found.</p>
      ) : (
        folders.map((folderItem : any, index: number) => (
          <div key={folderItem.id || index}>
          <div 
          onClick={() => onSelectFolder(folderItem.id, folderItem.name)}
            className={`flex items-center gap-3.5 px-4 py-2.5 text-2xl cursor-pointer rounded-lg transition-colors ${
              selectedFolderId === folderItem.id
                ? 'bg-red-800 text-white'
                : 'text-text-dim hover:bg-red-800 hover:text-bg-popover'
            }`}>
            <PiFolderSimpleBold /> 
            <h2 className='text-sm font-bold'>{folderItem.name}</h2> 
          </div>
          </div>
      ))
      )}
    </div>
  );
};

export default Folders;