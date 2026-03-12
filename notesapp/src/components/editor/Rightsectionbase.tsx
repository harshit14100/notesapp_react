import { useEffect, useState } from "react";
import { getNoteById ,restoreNote } from "../../Api/NoteAPI";
import { useNavigate, useParams } from "react-router-dom";
import { TbStar, TbStarFilled } from "react-icons/tb";
import { MdOutlineUnarchive } from "react-icons/md";
import api from "../../Api/API";
import toast from "react-hot-toast";
import { useNotes } from "../../context/Notescontext";

import { PiDotsThreeCircle } from "react-icons/pi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaRegFolder } from "react-icons/fa";
import { FiArchive } from "react-icons/fi";
import { RiDeleteBin7Line } from "react-icons/ri";
import { DeleteNote } from "../../Api/Delete";
import { FaChevronDown } from "react-icons/fa";
import { motion } from "framer-motion";
import LoadingNoteState from "./LoadingState";
import EmptyNoteState from "./Emptystate";
import RestoreNoteState from "./RestoreState";

interface Folder {
  id: string;
  name: string;
}

interface Note {
  id: string;
  title: string;
  content: string; 
  isFavorite?: boolean;
  isArchived?: boolean;
  deleted?: boolean;
  createdAt: string;
  folder?: Folder;
}

const RightSide = () => {

  const [overlay, setOverlay] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>("");
  const [editContent, setEditContent] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isRestoring, setIsRestoring] = useState<boolean>(false);
  const [folderDropdown, setfolderDropdown] = useState(false)

  const { noteId, type: routeType } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState<Note | null>(null);
  const { triggerRefetch, folders } = useNotes();

 const handleFavorite = async (e: React.MouseEvent) => {
  e.stopPropagation();
  if (!noteId || !note) return;

  const newValue = !note.isFavorite;
  try {
    await api.patch(`/notes/${noteId}`, {
      favorite: newValue,
    });


    setNote((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        isFavorite: newValue,
      };
    });
    triggerRefetch();
    toast.success(
      newValue ? "Added to favorites " : "Removed from favorites"
    );
    if (routeType === "favorite" && !newValue) {
      navigate("/type/favorite");
    }
  } catch {
    toast.error("Failed to update favorite");
  }
};

const handleArchive = async (e: React.MouseEvent) => {
  e.stopPropagation();

  if (!noteId || !note) return;
  const newValue = !note.isArchived;
  const folderId = note?.folder?.id;

  setOverlay(false);
  try {
    await api.patch(`/notes/${noteId}`, {
      archived: newValue,
    });
    setNote((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        isArchived: newValue,
      };
    });

    triggerRefetch();
    toast.success(
      newValue ? "Note archived " : "Note unarchived"
    );
    if (newValue) {
      navigate("/type/archive");
    } else {
      navigate(`/${folderId || "recent"}`);
    }
  } catch {
    toast.error("Failed to archive note");
  }
};

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!noteId) return;

    try {

      const folderId = note?.folder?.id;
      await DeleteNote(noteId);

      setNote(null);
      triggerRefetch();

      if (folderId) {
        navigate(`/${folderId}`);
      } else {
        navigate(`/recent`);
      }
    } catch (err) {
      toast.error("could'nt navigate"+ err)
    }
  };

const handleRestore = async () => {
  if (!noteId || !note) return;

  setIsRestoring(true);
  try {
    await restoreNote(noteId);
    triggerRefetch();
    toast.success("Note restored");

    const folderId = note?.folder?.id;
    if (folderId) {
      navigate(`/${folderId}/${noteId}`);
    } else {
      navigate(`/recent/${noteId}`);
    }
  } catch (error) {
    console.error("Restore failed", error);
    toast.error("Failed to restore note");
  } finally {
    setIsRestoring(false);
  }
};

  const handleMoveNote = async (newFolderId: string, newFolderName: string) => {
  if (!note || note.folder?.id === newFolderId) return;
  try {
    await api.patch(`/notes/${note.id}`, { folderId: newFolderId });
    setNote((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        folder: {
          id: newFolderId,
          name: newFolderName,
        },
      };
    });

    setfolderDropdown(false);
    triggerRefetch();
    navigate(`/${newFolderId}/${note.id}`);
    toast.success(`Moved to ${newFolderName}`);
  } catch {
    toast.error("Failed to move note");
  }
};

  useEffect(() => {
    const closeDropdown = () => setfolderDropdown(false);
    window.addEventListener("click", closeDropdown);

    return () => window.removeEventListener("click", closeDropdown);
  }, []);

  const handleSave = async () => {
    if (!noteId || !note) return;
    if (editTitle === note.title && editContent === note.content) return;

    try {
      setIsSaving(true);

      const updated = await api.patch(`/notes/${noteId}`, {
        title: editTitle,
        content: editContent,
      });

      const updatedNote = updated?.data?.note || updated?.data || updated;
      if (updatedNote) {
        setNote(updatedNote);
      }
      triggerRefetch();
    } catch (err) {
      toast.error("could'nt Refetch"+ err)
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
    const noteData = res as Note | null;

    if (!noteData) {
      setNote(null);
      return;
    }

    setNote(noteData);
    setEditTitle(noteData.title || "");
    setEditContent(noteData.content || "");

  } catch (err) {
    console.error(err);
  } finally {
    setIsLoading(false);
  }
};
    loadNote();
  }, [noteId]);

  if (isLoading) {
  return <LoadingNoteState />;
}

if (!noteId || !note) {
  return <EmptyNoteState />;
}

if (note.deleted || routeType === "trash") {
  return (
    <RestoreNoteState
      title={note.title}
      isRestoring={isRestoring}
      onRestore={handleRestore}/>
  );
}

  return (
    <div className="w-full h-full bg-bg-right flex flex-col p-[5%] gap-7 transition-colors">

      <div className="flex justify-between items-center">
        {/* <input
          className="text-3xl font-bold text-text-main bg-transparent border-none outline-none w-full"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onBlur={handleSave}
        /> */}

          <motion.input
          className="text-3xl font-bold text-text-main bg-transparent border-none outline-none w-full "
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onBlur={handleSave}
          animate={
            editTitle === "Remotestate"
              ? {
                  scale: [1, 1.05, 1],
                  textShadow: [
                    "0px 0px 0px rgba(99,102,241,0)",
                    "0px 0px 15px rgba(99,102,241,0.8)",
                    "0px 0px 0px rgba(99,102,241,0)",
                  ],
                }
              : {}
          }
          transition={{
            duration: 1,
            repeat: editTitle === "Remotestate" ? Infinity : 0,
            ease: "easeInOut",
          }}
        />

        <div className="cursor-pointer text-text-muted hover:text-text-main flex flex-col relative flex-shrink-0">

          <PiDotsThreeCircle
            size={30}
            onClick={(e) => {
              e.stopPropagation();
              setOverlay((prev) => !prev);
            }}/>

          {overlay && (
            <div
              className="absolute top-12 right-0 rounded p-4 w-60 text-md flex flex-col gap-4 bg-bg-popover text-text-main shadow-xl border border-border-dark z-10"
              onClick={(e) => e.stopPropagation()}>

              <button
                className="flex gap-4 items-center py-2 cursor-pointer hover:bg-primary-hover rounded px-2"
                onClick={handleFavorite}>

                {note?.isFavorite ? (
                  <TbStarFilled className="text-yellow-400" />
                ) : (
                  <TbStar />
                )}
                {note?.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </button>

              <button
                className="flex gap-4 items-center py-2 cursor-pointer hover:bg-primary-hover rounded px-2"
                onClick={handleArchive}>

                {note?.isArchived ? (
                  <MdOutlineUnarchive className="text-blue-400" />
                ) : (
                  <FiArchive />
                )}
                {note?.isArchived ? "Unarchive" : "Archive"}

              </button>

              <hr className="w-full border-t border-border-dark" />

              <button
                onClick={handleDelete}
                className="flex gap-4 items-center py-2 cursor-pointer hover:bg-primary-hover rounded px-2 hover:text-text-delete">
                <RiDeleteBin7Line />
                Delete
              </button>

            </div>
          )}

        </div>
      </div>

      <div className="flex flex-col divide-y divide-border-dark relative">

        <div className="flex items-center gap-20 py-3">
          <div className="text-text-dim flex items-center gap-5">
            <FaRegCalendarAlt size={20} />
            <h3 className="text-xs font-semibold tracking-wider">Date</h3>
          </div>

          <div className="text-text-main text-sm font-bold underline decoration-border-input underline-offset-4">
            {new Date(note.createdAt).toLocaleDateString("en-GB")}
          </div>
        </div>

        <div className="flex items-center gap-6 py-3 relative">
          <div className="text-text-dim flex items-center gap-5">
            <FaRegFolder size={20} />
            <h3 className="text-xs font-semibold tracking-wider">Folder</h3>
          </div>

          <div className="text-text-main text-sm underline decoration-border-input underline-offset-4 font-bold truncate max-w-[150px]">
            {note.folder?.name}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setfolderDropdown((prev) => !prev);
              setOverlay(false);
            }}
            className="text-text-muted hover:text-text-main cursor-pointer">
              <FaChevronDown  size={16} />
            </button>

          {folderDropdown && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute top-10 left-0 bg-bg-popover rounded-md p-2 w-52 flex flex-col gap-1 z-50 shadow-lg max-h-60 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] truncate">

            {folders?.map((f: Folder) => (
              <button
                key={f.id}
                disabled={note.folder?.id === f.id}
                onClick={() => handleMoveNote(f.id, f.name)}
                className={`text-sm text-left px-3 py-2 rounded cursor-pointer transition
                ${
                  note.folder?.id === f.id
                    ? "text-primary font-semibold cursor-default"
                    : "hover:bg-primary-hover"
                }`}>
                {f.name}
              </button>
            ))}
          </div>
        )}
        </div>
      </div>

      {isSaving && (
        <p className="text-xs text-text-muted py-1">Saving...</p>
      )}

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





