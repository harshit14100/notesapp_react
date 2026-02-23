import axios from 'axios'
import { useEffect, useState } from 'react'
import Card from './Card'
import type { NotesType } from '../types/types'
import { TbFileText } from "react-icons/tb";

const Recentnotes = () => {
  const API = 'https://nowted-server.remotestate.com/notes/recent' 
  // const API = 'https://nowted-server.remotestate.com/folders' 

  const [rec, setRec] = useState<NotesType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  
  const getnotes = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(API);
      const notesData = response.data.recentNotes || response.data;

      console.log((response.data.recentNotes));
      // console.log("getnotes is running");
      
      if (Array.isArray(notesData)) {
        setRec(notesData);
      } else {
        setRec([]);
        console.error("Expected an array, but received:", notesData);
      }
    } catch (err) {
      console.error("Failed to fetch notes:", err);
      setError('Failed to load notes.')
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    getnotes();
  }, [])

  const recent = rec.map((elem) => (
        <div key={elem.id} className="mb-2">
          <div className='flex px-6 gap-3.5 text-2xl items-center cursor-pointer  py-2.5 text-zinc-300 hover:bg-red-800 hover:text-amber-50'>
          <TbFileText /> <button className='text-sm font-bold '>{elem.title}</button>
          </div>
        </div>
      ))

  return (
    
    <>{recent}</>
  )
}

export default Recentnotes