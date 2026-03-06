// import React, { useEffect, useState } from 'react';
// import { getFolders } from '../Api/GetApi'; 
import { PiFolderSimpleBold } from "react-icons/pi"; 
import { useNavigate } from "react-router-dom";
import { RiDeleteBin7Line } from "react-icons/ri";
import type { Folder } from "../types/types";
import { deleteFolder } from '../Api/FolderAPI';

interface FoldersProps {
  folders: Folder[];
  onSelectFolder: (id: string, name: string) => void;
  selectedFolderId?: string | null;
  selectedFoldername?: string | null;
  refreshFolders: () => void;
}

const Folders: React.FC<FoldersProps> = ({ folders, onSelectFolder, selectedFolderId, refreshFolders }) => {

  const navigate = useNavigate();
  const handleDelete = async (id: string) => {
  const success = await deleteFolder(id);

  if (success) {
    refreshFolders();
  }
};



  return (
    <div>
      {folders.length === 0 ? (
        <p className='pl-8 text-sm text-text-muted'>No folders found.</p>
      ) : (
        folders.map((folderItem : Folder, index: number) => (
          <div key={folderItem.id || index} className="group flex items-center justify-between">
           
            <div
              onClick={() => {
                onSelectFolder(folderItem.id, folderItem.name);
                navigate(`/notes/${folderItem.id}`);
                }}
                className={`flex items-center gap-3.5 px-4 py-2.5  cursor-pointer justify-between rounded-lg transition-colors flex-1 ${
                selectedFolderId === folderItem.id
                  ? 'bg-red-800 text-white'
                  : 'text-text-dim hover:bg-red-800 hover:text-white'
              }`}>
                <div className='flex items-center gap-3.5  text-2xl'>

              <PiFolderSimpleBold /> 
              <h2 className='text-sm font-bold'>{folderItem.name}</h2> 
                </div>
              
            <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(folderItem.id);
                }}
                className="opacity-0 group-hover:opacity-100 transition hover:text-red-500 hover:text-2xl cursor-pointer">
                <RiDeleteBin7Line />
            </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Folders;