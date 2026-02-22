import React, { useEffect, useState } from 'react'
import noteslogo from '../assets/logo.svg'
import { IoSearch } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { TbFileText } from "react-icons/tb";
import { TbStar } from "react-icons/tb";
import { RiDeleteBin7Line } from "react-icons/ri";
import { FiArchive } from "react-icons/fi";
import { PiFolderSimplePlusBold } from "react-icons/pi";
// import type { NotesType } from '../types/types';
// import axios from 'axios';
import Recentnotes from './Recentnotes';


const Aside = () => {
  return (
    <>

    <div className='bg-[#181818] min-w-1/5 h-screen text-white  font-sans'>
      <div className='flex justify-between '>

        <img src={noteslogo} className="px-5 pt-[7%]" />
        <button className='px-5 rounded-4xl pt-[7%] cursor-pointer text-zinc-400 text-2xl'>
        <IoSearch />
        </button>
      </div>
      <div className='py-8 relative pl-8 font-bold '>
      <button className='px-6 py-3 rounded w-[90%] bg-zinc-600 hover:bg-zinc-700 flex justify-center items-center gap-2 cursor-pointer'>
        <div className='text-2xl '>
        <IoMdAdd />
        </div>
         <h3 className='font-bold'>New Note</h3>
         </button>
      </div>
      <div>
      <h4 className='text-zinc-300 px-8 text-sm font-bold pt-5 '>Recents</h4>
      {/* {recent} */}
      <Recentnotes />
      </div>
      <div className='flex justify-between items-center text-2xl'>
        <h4 className='text-zinc-300 px-8 text-sm font-bold  pt-5'>Folders</h4>
        <div className='text-2xl px-6'>
          <button className='cursor-pointer'>
         <PiFolderSimplePlusBold />
          </button>
      </div>
        </div>
        <div className='flex px-6 gap-3.5 text-2xl items-center cursor-pointer  py-2.5 text-zinc-300 hover:bg-red-800 hover:text-amber-50'>
        <TbFileText /> <h2 className='text-sm font-bold '>Reflection</h2>
      </div>
      <div>
        <h4 className='text-zinc-300 px-8 text-sm font-bold  pt-5'>More</h4>
        <div className='flex px-6 gap-3.5 text-2xl items-center cursor-pointer  text-zinc-300 py-2.5 hover:bg-red-800 hover:text-amber-50'>
        <TbStar /> <button className='text-sm font-bold '>Favorites</button>
      </div>
      <div className='flex px-6 gap-3.5 text-2xl text-zinc-300 cursor-pointer items-center  py-2.5 hover:bg-red-800 hover:text-amber-50 '>
        <RiDeleteBin7Line /> <button className='text-sm font-bold   '>Trash</button>
      </div>
      <div className='flex px-6 gap-3.5 text-2xl items-center cursor-pointer  py-2.5 text-zinc-300 hover:bg-red-800 hover:text-amber-50'>
        <FiArchive /> <button className='text-sm font-bold '>Archived Notes</button>
      </div>
      </div>
    </div>
    </>
  )
}

export default Aside
