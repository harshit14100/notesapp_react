import { useState, useEffect } from "react";
import { getRecentNotes, getNotesByFolder, getDeletedNotes, getFavoriteNotes, getArchiveNotes, searchbar } from "../Api/GetApi";
import { RiDeleteBin7Line } from "react-icons/ri";
import { DeleteNote } from "../Api/Delete";
import { useNavigate, useParams } from "react-router-dom";
// import AddNote from "./NewNote";
// import { IoMdAdd } from "react-icons/io";
// import { createNote } from '../Api/PostApi';

export type MiddleProps = {
  selectedfolderId?: string | null;
  selectedFoldername?: string | null;
  type?:string 
  refetchKey?: number;
}

interface Note {
  id: string;
  title: string;
  preview?: string;
  createdAt: string;
}

const Middle= ({ selectedfolderId, selectedFoldername, type, refetchKey }: MiddleProps) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Note[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { folderId, noteId, type: routeType } = useParams();
  const navigate = useNavigate();

  


  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNotes = async () => {
  try {
    setIsLoading(true);
    setError("");

    let data;

    if (routeType === "trash") {
      data = await getDeletedNotes();
    } 
    else if (routeType === "favorite") {
      data = await getFavoriteNotes();
    } 
    else if (routeType === "archive") {
      data = await getArchiveNotes();
    } 
    else if (!folderId && !routeType){
      data = await getRecentNotes();
    } 
    else {
      const activeFolder = selectedfolderId || folderId;
      data = await getNotesByFolder(activeFolder!);
    }

    setNotes((data || []).filter((note: any) => routeType === "trash" || !note.deleted));
    } catch (err) {
      console.error(err);
      setError("Failed to load notes.");
    } finally {
      setIsLoading(false);
  }
};
  useEffect(() => {
    fetchNotes();
    setSearchQuery("");
    setSearchResults([]);
  }, [selectedfolderId, folderId, routeType, refetchKey]);


  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const delay = setTimeout(async () => {
      // console.log(searchQuery);
      try {
        const data = await searchbar(searchQuery);
        setSearchResults(data || []);
      } catch (err) {
        console.error("Search failed:", err);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 400);
    

    return () => clearTimeout(delay);
  }, [searchQuery]);

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();

    const success = await DeleteNote(id);

    if (success) {
      setNotes(prev => prev.filter(note => note.id !== id));
      setSearchResults(prev => prev.filter(note => note.id !== id));
    }
  };
  // console.log(selectedFoldername);
  
  const handleNoteClick = (id: string) => {
    const activeFolder = selectedfolderId || folderId || "recent";
    navigate(`/notes/${activeFolder}/${id}`);
  };

  const skeletonArray = [1, 2, 3];

  const displayNotes = searchQuery.trim().length > 0 ? searchResults : notes;

  const sectionTitle = routeType === "trash"
    ? "Trash"
    : routeType === "favorite"
    ? "Favorite"
    : routeType === "archive"
    ? "Archive"
    : selectedFoldername || "Recents";
  return (

    <div className="h-full bg-bg-main flex flex-col transition-colors duration-200">
      <div className="w-full p-[3%] pb-[4%]">
        <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold text-text-main">
          {sectionTitle}
        </h2>

          {!isLoading && (
            <p className="text-text-muted text-sm">{displayNotes.length} Notes</p>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-[8%] flex flex-col gap-3.75 pb-7.5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        
        {error && (
          <div className="p-4 bg-text-delete/10 border border-text-delete/50 rounded text-text-delete">
            {error}
          </div>

        )}

        {!isLoading && !error && notes.length === 0 && (
          <p className="text-text-muted text-center mt-10">No notes found.</p>
        )}

        {isLoading ? (
          skeletonArray.map((item) => (
            <div
              key={item}
              className="w-full p-5 bg-bg-aside border border-border-dark animate-pulse rounded-lg">
              <div className="h-5 bg-button-hover w-3/4 mb-3 rounded"></div>
              <div className="flex justify-between items-center mt-2">
                <div className="h-3 bg-button-hover rounded w-1/5"></div>
                <div className="h-3 bg-button-hover rounded w-2/5 ml-3.75 opacity-70"></div>
              </div>
            </div>
          ))
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              onClick={() => handleNoteClick(note.id)}

              className="w-full p-5 bg-bg-aside border border-border-dark hover:bg-primary-hover/20 rounded-lg cursor-pointer transition-all duration-300  hover:-translate-y-2 hover:shadow-red-glow" >
              <div className="flex justify-between">
                <h4 className="text-m font-medium text-text-main mb-2 truncate">
                  {note.title}
                </h4>

                <button onClick={(e) => handleDelete(e, note.id)}>
                  <RiDeleteBin7Line className="text-sm text-text-muted hover:text-xl hover:text-text-delete transition-all" />
                </button>
              </div>

              <div className="flex justify-between items-center text-[12px] text-text-muted">
                <p>{new Date(note.createdAt).toLocaleDateString()}</p>
                <p className="truncate ml-3.75 opacity-70">
                  {note.preview?.substring(0, 30) || "No content"}...
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Middle;