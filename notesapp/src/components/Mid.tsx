import { useState, useEffect } from "react";
import { getRecentNotes, getNotesByFolder } from "../Api/GetApi";
import { RiDeleteBin7Line } from "react-icons/ri";
import { DeleteNote } from "../Api/Delete";
import { useNavigate, useParams  } from "react-router-dom";
// import AddNote from "./NewNote";
// import { IoMdAdd } from "react-icons/io";
// import { createNote } from '../Api/PostApi';

export type MiddleProps = {
  selectedfolderId: string | null;
  selectedFoldername: string | null;
}

interface Note {
  id: string;
  title: string;
  preview?: string;
  createdAt: string;
}

function Middle({ selectedfolderId, selectedFoldername }: MiddleProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const { folderId, noteId } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNotes = async () => {
  try {
    setIsLoading(true);
    setError("");

    let data;

    if (!selectedfolderId && !folderId) {
      data = await getRecentNotes();
    }
    else if (folderId === "recent") {
      data = await getRecentNotes();
    } 
    else {
      const activeFolder = selectedfolderId || folderId;
      data = await getNotesByFolder(activeFolder!);
    }

    // console.log(data);
    
    setNotes(data || []);
  }
  catch (err) {
    console.error(err);
    setError("Failed to load notes.");
  } 
  finally {
    setIsLoading(false);
  }
};

  useEffect(() => {
    fetchNotes();
  }, [selectedfolderId, folderId]);

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); 
    try {
      await DeleteNote(id);
      fetchNotes(); 
      if (noteId === id) navigate(`/${folderId || 'recent'}`); 
    } catch (err) {
      console.error(err);
    }
  };
  // console.log(selectedFoldername);
  
  const handleNoteClick = (id: string) => {
    const activeFolder = selectedfolderId || folderId || "recent";
    navigate(`/${activeFolder}/${id}`); 
  };

  const skeletonArray = [1, 2, 3];

  return (

    <div className="h-full bg-bg-main flex flex-col transition-colors duration-200">
      <div className="w-full p-[3%] pb-[4%]">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold text-text-main">
            {selectedFoldername || "Recents"}
         </h2>

          {!isLoading && (
            <p className="text-text-muted text-sm">{notes.length} Notes</p>
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

              className="w-full p-5 bg-bg-aside border border-border-dark hover:bg-primary-hover/10 rounded-lg cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
            >
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