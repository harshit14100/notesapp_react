import React, { useEffect, useState } from 'react'
import noteslogo from '../assets/logo.svg'
import { IoSearch } from "react-icons/io5";
import { TbStar } from "react-icons/tb";
import { RiDeleteBin7Line } from "react-icons/ri";
import { FiArchive } from "react-icons/fi";
import { PiFolderSimplePlusBold } from "react-icons/pi";
// import type { NotesType } from '../types/types';
// import axios from 'axios';
import AddNote from './NewNote';
import Recentnotes from './Recentnotes';
import Folders from './Folders';
import NewFolder from "./NewFolder";
import { getFolders } from "../Api/API";
import '../App.css'
import { GoSun, GoMoon } from "react-icons/go"; 
import { searchbar } from '../Api/GetApi';
import { NavLink } from 'react-router-dom';


interface AsideProps {
  onSelectFolder: (id: string, name: string) => void;
  selectedFolderId: string | null;
  selectedFolderName: string | null;
  setSearchQuery: (query: string) => void; 
  searchQuery: string; 
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
  searchQuery = "" 
}) => {
   const [folders, setFolders] = useState<Folder[]>([]);
   const [isDarkMode, setIsDarkMode] = useState(true);
   const [searchResults, setSearchResults] = useState([]);
   const [showSearch, setShowSearch] = useState(false);

   const fetchFolders = async () => {
  try {
    const data = await getFolders();
    setFolders(data || []);
  } catch (error) {
    console.error("Error fetching folders:", error);
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
      const fetchSearch = async () => {
        console.log(searchQuery);

    if (searchQuery?.length > 0) {
      const data = await searchbar(searchQuery);
      setSearchResults(data);
    } else {
      setSearchResults([]);
    }
  };
  fetchSearch();
}, [searchQuery]);
    
    useEffect(() => {

    fetchFolders();
    document.documentElement.classList.add('dark');
  }, []);

  const handleSearch = () => {
  setShowSearch(prev => !prev);
};

  const handleFolderCreated = (newFolder: Folder) => {
  setFolders((prev) => [...prev, newFolder]);
  onSelectFolder(newFolder.id, newFolder.name);
};
 
  
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <>
  
    <div className='bg-bg-aside min-w-1/5 h-screen text-text-main font-sans flex flex-col justify-between overflow-hidden border-r border-border-dark'>
        <div>
      <div className='flex justify-between '>

        <img src={noteslogo} className="px-5 pt-[7%] text-black dark:invert-0 invert-100" />
        <div className='px-5 pt-[7%] flex items-center gap-4 text-text-main text-2xl'>
        <button onClick={toggleTheme} className="cursor-pointer">
          {isDarkMode ? <GoSun /> : <GoMoon />} 
        </button>
        
        <button onClick={handleSearch} className='text-2xl'>
          <IoSearch />
        </button>

        {showSearch && (
          <div className="absolute top-5 left-150 z-50">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Write note name..."
              className='flex-1 p-2 w-180 rounded bg-text-dim border border-border-input text-bg-main text-sm focus:outline-none focus:border-primary-hover transition-colors '/> 
          </div>
        )}
        </div>
      </div>
      <div className='py-8 relative pl-8 font-bold '>
      
      <div className='rounded w-[90%] gap-2 '>
        <AddNote folderId={selectedFolderId} />
        
        
         </div>
      </div>
      <div>
      
      <h4 className='text-text-dim px-8 text-sm font-bold pt-5 '>
  {searchQuery?.length > 0 ? "Search Results" : "Recents"}
</h4>
      <Recentnotes searchResults={searchResults} searchQuery={searchQuery} />
    </div>
      <div className="flex flex-col flex-1 overflow-hidden h-87">
  <div className="flex justify-between items-center ">
    <h4 className="text-text-dim px-8 text-sm font-bold pt-1">
      Folders
    </h4>
    <div className="px-6">
      <button className="cursor-pointer text-2xl">
        <PiFolderSimplePlusBold />
      </button>
    </div>
  </div>

  <div className="px-6">
    <NewFolder onFolderCreated={handleFolderCreated} />
  </div>

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
        <h4 className='text-text-dim px-8 text-sm font-bold  pt-5'>More</h4>
        
        <NavLink
        to={'/favorites'}
         className='flex px-6 gap-3.5 text-2xl items-center cursor-pointer text-text-muted py-2.5 hover:bg-red-800 hover:text-white'>
        <TbStar /> <span className='text-sm font-bold '>Favorites</span>
      </NavLink>

      <NavLink
      to={'/delete'}
       className='flex px-6 gap-3.5 text-2xl text-text-muted cursor-pointer items-center py-2.5 hover:bg-red-800 hover:text-white '>
        <RiDeleteBin7Line /> <span className='text-sm font-bold   '>Trash</span>
      </NavLink>

      <NavLink
      to={'/archive'}
       className='flex px-6 gap-3.5 text-2xl items-center cursor-pointer py-2.5 text-text-muted hover:bg-red-800 hover:text-white'>
        <FiArchive /> <span className='text-sm font-bold '>Archived Notes</span>
      </NavLink>
          </div>
      </div>
    </div>
    </>
  )
}

export default Aside
