import { useState, useEffect } from "react";
import {getNotesByFolder } from "../../Api/NoteAPI";
import {getRecentNotes,getDeletedNotes, searchbar, getFavoriteNotes, getArchiveNotes} from "../../Api/NoteAPI"
// import { RiDeleteBin7Line } from "react-icons/ri";
// import { TbStarFilled } from "react-icons/tb";
import { deleteNote } from "../../Api/NoteAPI";
import { useNavigate, useParams } from "react-router-dom";
import { useNotes } from "../../context/Notescontext";
import NoteCard from "./Card";

interface Note {
  id: string;
  title: string;
  preview?: string;
  createdAt: string;
  deleted?: boolean;
  archived?: boolean;
  favorite?: boolean;
}

const Middle = () => {

  const [notes, setNotes] = useState<Note[]>([]);
  const [searchResults, setSearchResults] = useState<Note[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const { folderId, type: routeType } = useParams();
  const navigate = useNavigate();
  const { selectedFolderId, selectedFolderName, refetchKey, triggerRefetch, searchQuery } = useNotes();
  const skeletonArray = [1,2,3,4,5]; 
  const [page, setPage] = useState(1);
  const limit = 10;

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
    else if (!folderId || folderId === "recent") {
      data = await getRecentNotes();
    } 
    else {
      const activeFolder = selectedFolderId || folderId;
      if (activeFolder) {
        data = await getNotesByFolder(activeFolder, page, limit);
      } else {
        data = [];
      }
    }

    const filtered =
      routeType === "trash" || routeType === "archive" || routeType === "favorite"
        ? data || []
        : (data || []).filter((note: Note) => !note.deleted && !note.archived);

    if (page === 1) {
      setNotes(filtered);
    } else {
      setNotes((prev) => [...prev, ...filtered]);
    }

  } catch {
    setError("Failed to load notes.");
  } finally {
    setIsLoading(false);
  }
};

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
  const bottom =
    e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
    e.currentTarget.clientHeight;

  if (bottom) {
    setPage(prev => prev + 1);
  }
};

useEffect(() => {
  fetchNotes()
  setPage(1);
}, [selectedFolderId, folderId, routeType, refetchKey]);

useEffect(() => {
  if (searchQuery.trim().length === 0) {
      setSearchResults([]);
      setIsSearching(false);
      return;

    }
    setIsSearching(true);
    const delay = setTimeout(async () => {

      try {
        const data = await searchbar(searchQuery);
        const results = data?.notes || data?.data || data || [];
        setSearchResults(results);
      } catch {
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [searchQuery]);

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();

    setNotes(prev => prev.filter(note => note.id !== id));
    setSearchResults(prev => prev.filter(note => note.id !== id));

    const success = await deleteNote(id);
    if (success) {
      fetchNotes();
      triggerRefetch();

    } else {
      fetchNotes();
    }
  };

  const handleNoteClick = (id: string) => {
    if (routeType) {
      navigate(`/type/${routeType}/${id}`);
    } else {
      const activeFolder = selectedFolderId || folderId || "recent";
      navigate(`/notes/${activeFolder}/${id}`);
    }
  };

  const displayNotes = searchQuery.trim().length > 0 ? searchResults : notes;
  const sectionTitle =
    routeType === "trash"
      ? "Trash"
      : routeType === "favorite"
      ? "Favorites"
      : routeType === "archive"
      ? "Archive"
      : selectedFolderName || "Recents";

  return (
    <div className="h-full bg-bg-main flex flex-col transition-colors duration-200">
      <div className="w-full p-[3%] pb-[4%]">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold text-text-main">{sectionTitle}</h2>
          {!isLoading && (
            <p className="text-text-muted text-sm">{displayNotes.length} Notes</p>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-[8%] flex flex-col gap-3.75 pb-7.5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" onScroll={handleScroll}>

        {error && (
          <div className="p-4 bg-text-delete/10 border border-text-delete/50 rounded text-text-delete">
            {error}
          </div>
        )}

        {!isLoading && !error && displayNotes.length === 0 && (
          <p className="text-text-muted text-center mt-10">
            {routeType === "favorite"
              ? "No favorite notes yet."
              : routeType === "trash"
              ? "Trash is empty."
              : routeType === "archive"
              ? "No archived notes."
              : "No notes found."}

          </p>
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
          displayNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              routeType={routeType}
              onDelete={handleDelete}
              onClick={handleNoteClick}/>
            ))
        )}
      </div>
    </div>
  );
};

export default Middle;