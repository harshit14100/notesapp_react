import axios from 'axios'
import { useEffect, useState } from 'react'
// import Card from './Card'
import type { NotesType } from '../types/types'
import { TbFileText } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';

interface RecentnotesProps {
  searchResults?: NotesType[];
  searchQuery?: string;
}

const Recentnotes: React.FC<RecentnotesProps> = ({ searchResults, searchQuery }) => {
  const API = 'https://nowted-server.remotestate.com/notes/recent' 
  // const API = 'https://nowted-server.remotestate.com/folders' 
  
  const [rec, setRec] = useState<NotesType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate();
  
  
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

  
  const isSearching = searchQuery && searchQuery.length > 0;
  const displayList = isSearching ? searchResults || [] : rec;

  const recent = displayList.map((elem) => (
        <div key={elem.id} className="mb-2">
          
          <div className='flex px-6 gap-3.5 text-2xl items-center cursor-pointer py-2.5 text-text-dim hover:bg-red-800 hover:text-primary-hover transition-colors rounded mx-2'>
            <TbFileText /> 
            <button className='text-sm font-bold truncate cursor-pointer'>
              {elem.title}
            </button>
          </div>
        </div>
      ))

  return (
    <div className="mt-2">
      {isLoading && !isSearching && <p className="px-8 text-xs text-text-muted">Loading...</p>}
      {error && <p className="px-8 text-xs text-text-delete">{error}</p>}
      {isSearching && displayList.length === 0 && (
        <p className="px-8 text-xs text-text-muted">No results found...</p>
      )}
      {!isLoading || isSearching ? recent : null}
    </div>
  )
}

export default Recentnotes