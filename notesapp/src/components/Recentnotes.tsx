import axios from 'axios'
import { useEffect, useState } from 'react'
import Card from './Card'
import type { NotesType } from '../types/types'

const Recentnotes = () => {
  const API = 'https://nowted-server.remotestate.com/notes/recent' 
  // const API = 'https://nowted-server.remotestate.com/notes' 

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

  return (
    <div className='bg-[#1C1C1C] w-[25%] flex flex-col p-4 text-white overflow-y-auto'>
      <h2 className='text-xl font-bold mb-4 px-3 text-zinc-300'>Recent Notes</h2>
      
      {/* skeleton ui as per saksham */}
      {isLoading && <p className="px-3 text-zinc-400">Loading notes...</p>}
      
      {error && <p className="px-3 text-red-500">{error}</p>}
      
      {!isLoading && rec.length === 0 && (
        <p className="px-3 text-zinc-400">No notes found in the database.</p>
      )}

      {!isLoading && rec.map((elem) => (
        <div key={elem.id} className="mb-2">
          <Card 
            title={elem.title} 
            preview={elem.preview} 
            updateddate={elem.updatedAt} 
            notesdata = {elem}
          />
        </div>
      ))}
    </div>
  )
}

export default Recentnotes