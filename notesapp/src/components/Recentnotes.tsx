import { useEffect, useState } from 'react'
import type { NotesType } from '../types/types'
import { TbFileText } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import { useNotes } from '../context/Notescontext';
import { getRecentNotes } from '../Api/NoteAPI';

interface RecentnotesProps {
  searchResults?: NotesType[];
  searchQuery?: string;
}

const Recentnotes: React.FC<RecentnotesProps> = ({ searchResults, searchQuery }) => {

  const [rec, setRec] = useState<NotesType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate();

  const { refetchKey } = useNotes();
  const getnotes = async () => {

    try {
      setIsLoading(true);
      const data = await getRecentNotes();
      setRec(data);

    } catch {
      setError('Failed to load notes.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getnotes();
  }, [refetchKey])

  const isSearching = searchQuery && searchQuery.length > 0;
  const displayList = isSearching ? (searchResults || []) : rec;
  const recent = displayList.map((elem) => (

        <div key={elem.id} className="mb-2">
          <div
            onClick={() => navigate(`/recent/${elem.id}`)}
            className='flex px-6 gap-3.5 text-2xl items-center cursor-pointer py-2.5 text-text-dim hover:bg-red-800 hover:text-white transition-colors rounded mx-2'>
            <TbFileText /> 
            <button className='text-sm font-bold truncate cursor-pointer'>
              {elem.title}
            </button>
          </div>
        </div>
      ))

  return (
    <div className="mt-2">
      {isLoading && !isSearching && (
        <p className="px-8 text-xs text-text-muted">Loading...</p>
      )}
      {error && (
        <p className="px-8 text-xs text-text-delete">{error}</p>
      )}
      {isSearching && displayList.length === 0 && (
        <p className="px-8 text-xs text-text-muted">No results found...</p>
      )}
      {!isLoading && recent}
    </div>
  )
}

export default Recentnotes