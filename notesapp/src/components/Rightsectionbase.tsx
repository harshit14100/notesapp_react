import { useEffect, useState } from "react";
import { getNoteById } from "../Api/GetApi";
import { useNavigate, useParams } from "react-router-dom";
import { TbFileText, TbStar } from "react-icons/tb";
import api from "../Api/API";
import { PiDotsThreeCircle } from "react-icons/pi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaRegFolder } from "react-icons/fa";
import { FiArchive } from "react-icons/fi";
import { RiDeleteBin7Line } from "react-icons/ri";
import { DeleteNote } from "../Api/Delete";




const RightSide = ({ onNoteChanged }: { onNoteChanged?: () => void }) => {
  const [overlay, setOverlay] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>("");
  const [editContent, setEditContent] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const { noteId } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState<any>(null);

  const handleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!noteId) return;
    try {
      const updated = await api.patch(`/notes/${noteId}`, { favorite: !note?.favorite });
      setNote(updated.data.note);
      setOverlay(false);
      onNoteChanged?.();
    } catch (err) {
      console.error("Favorite failed:", err);
    }
  };

  const handleArchive = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!noteId) return;
    try {
      const folderId = note?.folder?.id;
      await api.patch(`/notes/${noteId}`, { archived: !note?.archived });
      setNote(null);
      setOverlay(false);
      onNoteChanged?.();
      if (folderId) {
        navigate(`/folder/${folderId}`);
      } else {
        navigate(`/`);
      }
    } catch (err) {
      console.error("Archive failed:", err);
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!noteId) return;
    try {
      const folderId = note?.folder?.id;
      await DeleteNote(noteId);
      setNote(null);
      onNoteChanged?.();
      if (folderId) {
        navigate(`/folder/${folderId}`);
      } else {
        navigate(`/`);
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // Save title/content on blur
  const handleSave = async () => {
    if (!noteId || !note) return;
    if (editTitle === note.title && editContent === note.content) return;
    try {
      setIsSaving(true);
      const updated = await api.patch(`/notes/${noteId}`, {
        title: editTitle,
        content: editContent,
      });
      setNote(updated.data.note);
      onNoteChanged?.();
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    const handleClick = () => setOverlay(false);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    const loadNote = async () => {
      if (!noteId || noteId === "recent") {
        setNote(null);
        return;
      }
      try {
        setIsLoading(true);
        const res = await getNoteById(noteId);
        setNote(res);
        setEditTitle(res.title || "");
        setEditContent(res.content || "");
      } catch (err) {
        console.error("Error loading note:", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadNote();
  }, [noteId]);

  if (!noteId || !note) {
    return (
      <div className="w-full h-full bg-bg-right flex flex-col items-center justify-center gap-4">
        <TbFileText strokeWidth={0.8} size={100} className="text-text-dim" />
        <h2 className="text-text-main text-2xl font-semibold">
          Select a note to view
        </h2>
        <p className="text-text-muted text-sm text-center px-10">
          Choose a note from the list on the left to view its contents, or
          create a <br /> new note to add to your collection.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-bg-right flex flex-col p-[5%] gap-7 transition-colors">
      <div className="flex justify-between items-center">
        <input
          className="text-3xl font-bold text-text-main bg-transparent border-none outline-none w-full"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onBlur={handleSave}
        />
        <div className="cursor-pointer text-text-muted hover:text-text-main flex flex-col relative flex-shrink-0">
          <PiDotsThreeCircle
            size={30}
            onClick={(e) => {
              e.stopPropagation();
              setOverlay((prev) => !prev);
            }}
          />

          {overlay && (
            <div
              className="absolute top-12 right-0 rounded p-4 w-60 text-md flex flex-col gap-4 bg-bg-popover text-text-main shadow-xl border border-border-dark z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="flex gap-4 items-center py-2 cursor-pointer hover:bg-primary-hover rounded px-2"
                onClick={handleFavorite}
              >
                <TbStar />
                {note?.favorite ? "Remove from Favorites" : "Add to Favorites"}
              </button>

              <button
                className="flex gap-4 items-center py-2 cursor-pointer hover:bg-primary-hover rounded px-2"
                onClick={handleArchive}
              >
                <FiArchive />
                {note?.archived ? "Unarchive" : "Archive"}
              </button>

              <hr className="w-full border-t border-border-dark" />
              <button
                onClick={handleDelete}
                className="flex gap-4 items-center py-2 cursor-pointer hover:bg-primary-hover rounded px-2 hover:text-text-delete"
              >
                <RiDeleteBin7Line />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col divide-y divide-border-dark">
        <div className="flex items-center gap-20 py-3">
          <div className="text-text-dim flex items-center gap-5">
            <FaRegCalendarAlt size={20} />
            <h3 className="text-xs font-semibold tracking-wider">Date</h3>
          </div>
          <div className="text-text-main text-sm font-bold underline decoration-border-input underline-offset-4">
            {new Date(note.createdAt).toLocaleDateString("en-GB")}
          </div>
        </div>

        <div className="flex items-center gap-17.5 py-3">
          <div className="text-text-dim flex items-center gap-5">
            <FaRegFolder size={20} />
            <h3 className="text-xs font-semibold tracking-wider">Folder</h3>
          </div>
          <div className="text-text-main text-sm underline decoration-border-input underline-offset-4 font-bold">
            {note.folder?.name}
          </div>
        </div>

        {isSaving && (
          <p className="text-xs text-text-muted py-1">Saving...</p>
        )}
      </div>

      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <textarea
          className="w-full h-full text-text-main leading-relaxed text-base bg-transparent border-none outline-none resize-none"
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          onBlur={handleSave}
          placeholder="Start writing..."
        />
      </div>
    </div>
  );
};

export default RightSide;