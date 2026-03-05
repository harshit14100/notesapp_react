import { useEffect, useState } from "react";
import { getNoteById } from "../Api/GetApi";
import { useNavigate, useParams } from "react-router-dom";
import { TbFileText, TbStar, TbStarFilled } from "react-icons/tb";
import { MdOutlineUnarchive } from "react-icons/md";
import { LuHistory } from "react-icons/lu";
import api from "../Api/API";
import { useNotes } from "../context/Notescontext";

import { PiDotsThreeCircle } from "react-icons/pi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaRegFolder } from "react-icons/fa";
import { FiArchive } from "react-icons/fi";
import { RiDeleteBin7Line } from "react-icons/ri";
import { DeleteNote } from "../Api/Delete";
import { FaChevronDown } from "react-icons/fa";

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
  const [note, setNote] = useState<any>(null);
  const { triggerRefetch, folders } = useNotes();

  const handleFavorite = async (e: React.MouseEvent) => {

  e.stopPropagation();
  if (!noteId || !note) return;
  const newFavoriteValue = !note.favorite;

  try {
    await api.patch(`/notes/${noteId}`, {
      favorite: newFavoriteValue
    });

    setNote((prev: any) => ({
      ...prev,
      favorite: newFavoriteValue,
    }));
    triggerRefetch();

    if (routeType === "favorite" && !newFavoriteValue) {
      navigate("/type/favorite");
    }

  } catch (err) {
    console.log(err);
  }
};

  const handleArchive = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!noteId || !note) return;
    const newArchivedValue = !note.archived;
    const folderId = note?.folder?.id;
    setOverlay(false);

    try {
      await api.patch(`/notes/${noteId}`, { archived: newArchivedValue });
      setNote(null);
      triggerRefetch();

      if (folderId) {
        navigate(`/notes/${folderId}`);
      } else {
        navigate(`/notes/recent`);
      }
    } catch (err) {
      // silent
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
        navigate(`/notes/${folderId}`);
      } else {
        navigate(`/notes/recent`);
      }
    } catch (err) {
      // silent
    }
  };

  const handleRestore = async () => {
    try {

      setIsRestoring(true);
      await api.patch(`/notes/${noteId}`, { deleted: false, archived: false });
      triggerRefetch();
      const folderId = note?.folder?.id;

      if (folderId) {
        navigate(`/notes/${folderId}`);
      } else {
        navigate(`/notes/recent`);
      }
    } catch (err) {
      // silent
    } finally {
      setIsRestoring(false);
    }
  };

   const handleMoveNote = async (newFolderId: string, newFolderName: string) => {
    if (!note) return;
    try {
      await api.patch(`/notes/${note.id}`, { folderId: newFolderId });
      setNote({
        ...note,
        folderId: newFolderId,
        folder: { name: newFolderName },
      });
      setfolderDropdown(false);
      navigate(`/${newFolderId}/${note.id}`);
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
    }
  };

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
      // silent
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
        const noteData = res?.data || res;
        setNote(noteData);

        setEditTitle(noteData?.title || "");
        setEditContent(noteData?.content || "");
      } catch (err) {
        // silent
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

  if (note.deleted || routeType === "trash") {
    return (
      <div className="w-full h-full bg-bg-right flex flex-col items-center justify-center gap-5 px-10">
        <div className="text-text-dim">
          <LuHistory size={80} strokeWidth={1} />
        </div>
        <h2 className="text-text-main text-2xl font-semibold text-center">
          Restore "{note.title}"
        </h2>
        <p className="text-text-muted text-sm text-center max-w-md leading-relaxed">
          Don't want to lose this note? It's not too late! Just click the
          'Restore' button and it will be added back to your list. It's that
          simple.
        </p>
        <button
          onClick={handleRestore}
          disabled={isRestoring}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-2.5 rounded-md transition-colors disabled:opacity-60 cursor-pointer"
        >
          {isRestoring ? "Restoring..." : "Restore"}
        </button>
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
            }}/>

          {overlay && (
            <div
              className="absolute top-12 right-0 rounded p-4 w-60 text-md flex flex-col gap-4 bg-bg-popover text-text-main shadow-xl border border-border-dark z-10"
              onClick={(e) => e.stopPropagation()}>

              <button
                className="flex gap-4 items-center py-2 cursor-pointer hover:bg-primary-hover rounded px-2"
                onClick={handleFavorite}>

                {note?.favorite ? (
                  <TbStarFilled className="text-yellow-400" />
                ) : (
                  <TbStar />
                )}
                {note?.favorite ? "Remove from Favorites" : "Add to Favorites"}
              </button>

              <button
                className="flex gap-4 items-center py-2 cursor-pointer hover:bg-primary-hover rounded px-2"
                onClick={handleArchive}>

                {note?.archived ? (
                  <MdOutlineUnarchive className="text-blue-400" />
                ) : (
                  <FiArchive />
                )}
                {note?.archived ? "Unarchive" : "Archive"}

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

          <div className="text-text-main text-sm underline decoration-border-input underline-offset-4 font-bold">
            {note.folder?.name}
          </div>

          <button
              onClick={(e) => {
                e.stopPropagation();
                setfolderDropdown((prev) => !prev);
                setOverlay(false);
              }}
              className="text-dim hover:text-text cursor-pointer"
            >
              <FaChevronDown  size={16} />
            </button>

          {folderDropdown && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute top-10 left-32 bg-overlay rounded-md p-2 w-48 flex flex-col gap-1 z-50 shadow-lg max-h-60 overflow-y-auto hide-scrollbar"
            >
              {folders?.map((f: any) => (
                <button
                  key={f.id}
                  onClick={() => handleMoveNote(f.id, f.name)}
                  className={`text-sm text-left px-3 py-2 rounded cursor-pointer hover:bg-secondary-hover
                    ${note.folder?.name === f.name ? "text-primary font-semibold" : "text-text"}`}
                >
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