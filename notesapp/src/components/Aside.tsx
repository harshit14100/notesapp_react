import React, { useEffect, useState } from 'react'
import noteslogo from '../assets/logo.svg'
import { IoSearch } from "react-icons/io5";
import { TbStar } from "react-icons/tb";
import { RiDeleteBin7Line } from "react-icons/ri";
import { FiArchive } from "react-icons/fi";
import { PiFolderSimplePlusBold } from "react-icons/pi";
import AddNote from './NewNote';
import Recentnotes from './Recentnotes';
import Folders from './Folders';
import NewFolder from "./NewFolder";
import { getFolders } from "../Api/GetApi";
import '../App.css'
import { GoSun, GoMoon } from "react-icons/go"; 
import { searchbar } from '../Api/GetApi';
import { NavLink } from 'react-router-dom';
import type { NotesType } from '../types/types';


interface AsideProps {
  onSelectFolder: (id: string, name: string) => void;
  selectedFolderId: string | null;
  selectedFolderName: string | null;
  setSearchQuery: (query: string) => void; 
  searchQuery: string; 
  isDarkMode: boolean;
  toggleTheme: () => void;
  onNoteAdded?: () => void;
}

interface Folder {
  id: string;
  name: string;
}

const Aside: React.FC<AsideProps> = ({
  onSelectFolder,
  selectedFolderId,
  selectedFolderName,
  setSearchQuery,
  isDarkMode,
  toggleTheme,
  onNoteAdded,
  searchQuery = "" }) => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [searchResults, setSearchResults] = useState<NotesType[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [showNewFolder, setShowNewFolder] = useState(false);

  const fetchFolders = async () => {
    try {
      const data = await getFolders();
      setFolders(data || []);
    } catch (error) {
      console.error("couldn't fetch folders:", error);
    }
  };

  useEffect(() => {
    const delay = setTimeout(async () => {
      if (searchQuery.trim().length > 0) {
        try {
          const data = await searchbar(searchQuery);
          setSearchResults(data?.data || data || []);
        } catch (err) {
          console.error(err);
        }
      } else {
        setSearchResults([]);
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [searchQuery]);

  useEffect(() => {
    fetchFolders();
  }, []);

  const handleSearch = () => {
    setShowSearch(prev => !prev);
    if (showSearch) setSearchQuery("");
  };

  const handleFolderCreated = (newFolder: any) => {
    const folder: Folder = newFolder?.folder || newFolder;
    if (folder?.id && folder?.name) {
      setFolders((prev) => [...prev, folder]);
      onSelectFolder(folder.id, folder.name);
    }
    setShowNewFolder(false);
  };

  return (
    <>
      <div className={'bg-bg-aside min-w-1/5 h-screen text-text-main font-sans flex flex-col justify-between overflow-hidden border-r border-border-dark '}>
        <div>
          <div className='flex justify-between items-center px-5 pt-[7%]'>
            <img
              src={noteslogo}
              className={`${isDarkMode ? 'invert-0' : 'invert'}`}
            />
            <div className='flex items-center gap-4 text-text-main text-2xl'>
              <button onClick={toggleTheme} className="cursor-pointer">
                {isDarkMode ? <GoMoon /> : <GoSun />}
              </button>
              <button onClick={handleSearch} className='text-2xl'>
                <IoSearch />
              </button>
            </div>
          </div>

          {showSearch && (
            <div className="px-5 pt-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes..."
                autoFocus
                className='w-full p-2 rounded bg-bg-popover border border-border-input text-text-main text-sm focus:outline-none focus:border-primary-hover transition-colors'
              />
            </div>
          )}

          <div className='py-8 relative pl-8 font-bold'>
            <div className='rounded w-[90%] gap-2'>
              <AddNote folderId={selectedFolderId} onNoteAdded={onNoteAdded} />
            </div>
          </div>

          <div>
            <h4 className='text-text-dim px-8 text-sm font-bold pt-5'>
              {searchQuery?.length > 0 ? "Search Results" : "Recents"}
            </h4>
            <Recentnotes searchResults={searchResults} searchQuery={searchQuery} />
          </div>

          <div className="flex flex-col flex-1 overflow-hidden h-87">
            <div className="flex justify-between items-center">
              <h4 className="text-text-dim px-8 text-sm font-bold pt-1">
                Folders
              </h4>
              <div className="px-6">
                <button
                  className="cursor-pointer text-2xl"
                  onClick={() => setShowNewFolder(prev => !prev)}
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

            <div className="flex-1 overflow-y-auto px-4 scrollbar-hide">
              <Folders
                folders={folders}
                onSelectFolder={onSelectFolder}
                selectedFolderId={selectedFolderId}
                selectedFoldername={selectedFolderName}
              />
            </div>
          </div>
        </div>

        <div>
          <div className='pb-20'>
            <h4 className='text-text-dim px-8 text-sm font-bold pt-5'>More</h4>

            <NavLink
              to={'/type/favorite'}
              className={({ isActive }) =>
                `flex px-6 gap-3.5 text-2xl items-center cursor-pointer text-text-muted py-2.5 hover:bg-red-800 hover:text-white ${isActive ? 'bg-red-800 text-white' : ''}`
              }>
              <TbStar /> <span className='text-sm font-bold'>Favorites</span>
            </NavLink>

            <NavLink
              to={'/type/trash'}
              className={({ isActive }) =>
                `flex px-6 gap-3.5 text-2xl text-text-muted cursor-pointer items-center py-2.5 hover:bg-red-800 hover:text-white ${isActive ? 'bg-red-800 text-white' : ''}`
              }>
              <RiDeleteBin7Line /> <span className='text-sm font-bold'>Trash</span>
            </NavLink>

            <NavLink
              to={'/type/archive'}
              className={({ isActive }) =>
                `flex px-6 gap-3.5 text-2xl items-center cursor-pointer py-2.5 text-text-muted hover:bg-red-800 hover:text-white ${isActive ? 'bg-red-800 text-white' : ''}`
              }>
              <FiArchive /> <span className='text-sm font-bold'>Archived Notes</span>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  )
}

export default Aside