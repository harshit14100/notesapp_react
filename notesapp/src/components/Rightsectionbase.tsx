import { useEffect, useState } from "react";
import { getNoteById } from "../Api/GetApi";
import {  useNavigate, useParams } from "react-router-dom";
import { TbFileText, TbStar } from "react-icons/tb";


import { PiDotsThreeCircle } from "react-icons/pi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaRegFolder } from "react-icons/fa";
import { FiArchive } from "react-icons/fi";
import { RiDeleteBin7Line } from "react-icons/ri";
import { DeleteNote } from "../Api/Delete";
// import { DeleteNote } from "../Api/Delete";
  
  
  
  
  const RightSide = () => {
    const [overlay, setoverlay] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false); 
    const {  noteId } = useParams();
    const navigate = useNavigate();
  const [note, setnote] = useState<any>(null);
  // console.log(params );
  
  
    const handleDelete = async (e: React.MouseEvent) => {
  e.stopPropagation();

  if (!noteId) return;

  try {
    await DeleteNote(noteId);

    setnote(null);

    navigate(`/folder/${note.folder._id}`);
  } catch (err) {
    console.error("Delete failed:", err);
  }
};


  useEffect(() => {
  const handleClick = () => setoverlay(false);
  window.addEventListener("click", handleClick);
  return () => window.removeEventListener("click", handleClick);
}, []);

  useEffect(() => {
    const loadNote = async () => {
      if (!noteId || noteId === "recent") {
        setnote(null);
        return;
      }

      try {
        setIsLoading(true);
        const res = await getNoteById(noteId);
        setnote(res);
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
      /* Changed bg-aside to bg-bg-right */
      <div className="w-full h-full bg-bg-right flex flex-col items-center justify-center gap-4">
        {/* Changed text-primary to text-text-dim */}
        <TbFileText strokeWidth={0.8} size={100} className="text-text-dim" />
        {/* Changed text-main to text-text-main */}
        <h2 className="text-text-main text-2xl font-semibold">
          Select a note to view
        </h2>
        {/* Changed text-holder to text-text-muted */}
        <p className="text-text-muted text-sm text-center px-10">
          Choose a note from the list on the left to view its contents, or
          create a <br /> new note to add to your collection.
        </p>
      </div>
    );
  }

  return (
    /* Changed bg-[#181818] to bg-bg-right */
    <div className="w-full h-full bg-bg-right flex flex-col p-[5%] gap-7 transition-colors">
      <div className="flex justify-between items-center">
        {/* Changed text-main to text-text-main */}
        <h1 className="text-3xl font-bold text-text-main">{note.title}</h1>
        {/* Changed text-primary to text-text-muted and hover:text-main to hover:text-text-main */}
        <div className="cursor-pointer text-text-muted hover:text-text-main flex flex-col relative">
          <PiDotsThreeCircle size={30}
          onClick={(e) => {
          e.stopPropagation();
          setoverlay((prev) => !prev);
          }}
          />
          {overlay && (
         /* Changed bg-secondary to bg-bg-popover and text-main to text-text-main */
         <div className="absolute top-12 right-0 rounded p-4 w-60 text-md flex flex-col gap-4 bg-bg-popover text-text-main shadow-xl border border-border-dark">
            {/* Changed hover:bg-secondary-hover to hover:bg-primary-hover */}
            <button className="flex gap-4 items-center py-2 cursor-pointer hover:bg-primary-hover rounded px-2">
              <TbStar />
              {"Add to Favorites"}
            </button>
            <button className="flex gap-4 items-center py-2 cursor-pointer hover:bg-primary-hover rounded px-2">
              <FiArchive />
              {"Archived"}
            </button>

            {/* Changed border-b-bg-popover to border-border-dark */}
            <hr className="w-full border-t border-border-dark"></hr>
            <button
              onClick={handleDelete}
              /* Changed hover:text-red-500 to hover:text-text-delete */
              className="flex gap-4 items-center py-2 cursor-pointer hover:bg-primary-hover rounded px-2 hover:text-text-delete">
              <RiDeleteBin7Line />
              {"Delete"}
            </button>
          </div>
        )}
        </div>
      </div>

      {/* Changed divide-white/10 to divide-border-dark */}
      <div className="flex flex-col divide-y divide-border-dark">
        <div className="flex items-center gap-20 py-3">
          {/* Changed text-primary to text-text-dim */}
          <div className="text-text-dim flex items-center gap-5">
            <FaRegCalendarAlt size={20} />
            <h3 className="text-xs font-semibold tracking-wider">Date</h3>
          </div>
          {/* Changed text-main to text-text-main and decoration-gray-600 to decoration-border-input */}
          <div className="text-text-main text-sm font-bold underline decoration-border-input underline-offset-4">
            {new Date(note.createdAt).toLocaleDateString("en-GB")}
          </div>
        </div>

        <div className="flex items-center gap-17.5 py-3">
          {/* Changed text-primary to text-text-dim */}
          <div className="text-text-dim flex items-center gap-5">
            <FaRegFolder size={20} />
            <h3 className="text-xs font-semibold tracking-wider">Folder</h3>
          </div>
          {/* Changed text-main to text-text-main */}
          <div className="text-text-main text-sm underline decoration-border-input underline-offset-4 font-bold">
            {note.folder.name}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Changed text-primary to text-text-main (for better readability in light mode) */}
        <p className="text-text-main leading-relaxed text-base">
          {note.content}
        </p>
      </div>
    </div>
  );
};

export default RightSide;