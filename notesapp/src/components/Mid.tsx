import { useState, useEffect } from "react";
import { getRecentNotes, getNotesByFolder } from "../Api/GetApi";
import { RiDeleteBin7Line } from "react-icons/ri";
import { DeleteNote } from "../Api/Delete";
import { useParams } from "react-router-dom";
// import { IoMdAdd } from "react-icons/io";
// import { createNote } from '../Api/PostApi';

interface MiddleProps {
  selectedfolderId: string | null;
  selectedFoldername: string | null;
}

interface Note {
  id: string;
  title: string;
  preview?: string;
}

function Middle({ selectedfolderId, selectedFoldername }: MiddleProps) {
  const currentTime = new Date().toLocaleDateString();
  const [notes, setNotes] = useState<Note[]>([]);
  const { folderId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNotes = async () => {
    try {
      setIsLoading(true);
      setError("");

      let data;
      const activeFolder = selectedfolderId || folderId;

      if (activeFolder) {
        data = await getNotesByFolder(activeFolder);
      } else {
        data = await getRecentNotes();
      }

      // console.log(data);
      
      setNotes(data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load notes.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [selectedfolderId, folderId]);

  const handleDelete = async (id: string) => {
    try {
      await DeleteNote(id);
      fetchNotes(); 
    } catch (err) {
      console.error(err);
    }
  };

  const skeletonArray = [1, 2, 3];

  return (
    <div className="w-[50%] h-full bg-[#1C1C1C] flex flex-col">
      <div className="w-full p-[3%] pb-[4%]">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold text-white">
            {selectedFoldername || "Recents"}
         </h2>

          {!isLoading && (
            <p className="text-gray-400 text-sm">{notes.length} Notes</p>
          )}

      </div>
      </div>

      <div className="flex-1 overflow-y-auto px-[8%] flex flex-col gap-3.75 pb-7.5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        
        {error && (
          <div className="p-4 bg-red-900/20 border border-red-500/50 rounded text-red-400">
            {error}
          </div>

        )}

        {!isLoading && !error && notes.length === 0 && (
          <p className="text-zinc-400 text-center mt-10">No notes found.</p>
        )}

        {isLoading ? (
          skeletonArray.map((item) => (
            <div
              key={item}
              className="w-full p-5 bg-white/5 border border-white/5 animate-pulse">
              <div className="h-5 bg-gray-600 w-3/4 mb-3"></div>
              <div className="flex justify-between items-center mt-2">
                <div className="h-3 bg-gray-600 rounded w-1/5"></div>
                <div className="h-3 bg-gray-600 rounded w-2/5 ml-3.75 opacity-70"></div>
              </div>
            </div>
          ))
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="w-full p-5 bg-white/5 border border-white/5 hover:bg-secondary-hover cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg hover:shadow-red-600/40"
            >
              <div className="flex justify-between">
                <h4 className="text-m font-medium text-white mb-2 truncate">
                  {note.title}
                </h4>

                <button onClick={() => handleDelete(note.id)}>
                  <RiDeleteBin7Line className="text-sm text-white hover:text-xl hover:text-red-500" />
                </button>
              </div>

              <div className="flex justify-between items-center text-[12px] text-gray-400">
                <p>{currentTime}</p>
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