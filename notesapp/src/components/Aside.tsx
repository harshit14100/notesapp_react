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

interface AsideProps {
  onSelectFolder: (id: string, name: string) => void;
  selectedFolderId: string | null;
  selectedFolderName: string | null;
}



const Aside: React.FC<AsideProps> = ({
  onSelectFolder,
  selectedFolderId,
  selectedFolderName
}) => {
   const [folders, setFolders] = useState<any[]>([]);

   const fetchFolders = async () => {
    const data = await getFolders();
    setFolders(data || []);
  };
    
    useEffect(() => {
    fetchFolders();
  }, []);

  const handleFolderCreated = async (newFolder: any) => {
    setFolders((prev) => [...prev, newFolder]);
    onSelectFolder(newFolder.id,newFolder.name); 
    await fetchFolders();
  };
  return (
    <>

    <div className='bg-[#181818] min-w-1/5 h-screen text-white  font-sans flex flex-col justify-between overflow-hidden'>
        <div>
      <div className='flex justify-between '>

        <img src={noteslogo} className="px-5 pt-[7%]" />
        <button className='px-5 rounded-4xl pt-[7%] cursor-pointer text-zinc-400 text-2xl'>
        <IoSearch />
        </button>
      </div>
      <div className='py-8 relative pl-8 font-bold '>
      <button className='px-6 py-3 rounded w-[90%] bg-zinc-600 hover:bg-zinc-700 gap-2 '>
        <AddNote folderId={selectedFolderId} />
        
        
         </button>
      </div>
      <div>
      <h4 className='text-zinc-300 px-8 text-sm font-bold pt-5 '>Recents</h4>
      <Recentnotes />
      </div>
      <div className="flex flex-col flex-1 overflow-hidden h-87">
  <div className="flex justify-between items-center ">
    <h4 className="text-zinc-300 px-8 text-sm font-bold pt-1">
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
        <h4 className='text-zinc-300 px-8 text-sm font-bold  pt-5'>More</h4>
        <div className='flex px-6 gap-3.5 text-2xl items-center cursor-pointer  text-zinc-300 py-2.5 hover:bg-primary-hover hover:text-amber-50'>
        <TbStar /> <button className='text-sm font-bold '>Favorites</button>
      </div>
      <div className='flex px-6 gap-3.5 text-2xl text-zinc-300 cursor-pointer items-center  py-2.5 hover:bg-primary-hover hover:text-amber-50 '>
        <RiDeleteBin7Line /> <button className='text-sm font-bold   '>Trash</button>
      </div>
      <div className='flex px-6 gap-3.5 text-2xl items-center cursor-pointer  py-2.5 text-zinc-300 hover:bg-primary-hover hover:text-amber-50'>
        <FiArchive /> <button className='text-sm font-bold '>Archived Notes</button>
      </div>
          </div>
      </div>
    </div>
    </>
  )
}

export default Aside


