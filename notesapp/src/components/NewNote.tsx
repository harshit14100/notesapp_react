import React from "react";
import { IoMdAdd } from "react-icons/io";
import { createNote } from "../Api/NoteAPI";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface AddNoteProps {
  folderId: string | null;
  onNoteAdded?: () => void;
}

const AddNote: React.FC<AddNoteProps> = ({ folderId, onNoteAdded }) => {
  const navigate = useNavigate();

  const handleNewNote = async () => {
  if (!folderId) {
    toast.error("Folder not selected");
    return;
  }

  try {
    const createdAt = new Date()
    const newNote = await createNote(folderId, "Untitled", "", createdAt);
    const noteWithDate = {
      ...newNote,
      createdAt
    };
    onNoteAdded?.();
    navigate(`/notes/${folderId}/${noteWithDate.id}`);
    toast.success("New note created");
  }
   catch (err) {
    console.error(err);
    toast.error("Failed to create note");
  }
};

  return (
    <button
      onClick={handleNewNote}
      className="w-full rounded bg-button hover:bg-button-hover flex justify-center items-center gap-2 cursor-pointer transition-all py-3"
    >
      <div className="text-2xl text-text-main">
        <IoMdAdd />
      </div>
      <h3 className="font-bold text-text-main">New Note</h3>
    </button>
  );
};

export default AddNote;