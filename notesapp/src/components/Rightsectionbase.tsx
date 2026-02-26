
import { useEffect, useState } from "react";
import { getNoteById } from "../Api/GetApi";
import { Navigate, useParams } from "react-router-dom";
import { TbFileText, TbStar } from "react-icons/tb";


import { PiDotsThreeCircle } from "react-icons/pi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaRegFolder } from "react-icons/fa";
import { FiArchive } from "react-icons/fi";
import { RiDeleteBin7Line } from "react-icons/ri";
// import { DeleteNote } from "../Api/Delete";
  
  
  
  
  const RightSide = () => {
    const { noteId } = useParams();
    const [overlay, setoverlay] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false); 
  const [note, setnote] = useState<any>(null);
  // console.log(params );
  
  
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
      <div className="w-full h-full bg-[#181818] flex flex-col items-center justify-center gap-4">
        <TbFileText   strokeWidth={0.8} size={100} className="text-primary" />
        <h2 className="text-white text-2xl font-semibold">
          Select a note to view
        </h2>
        <p className="text-gray-500 text-sm text-center px-10">
          Choose a note from the list on the left to view its contents, or
          create a <br /> new note to add to your collection.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-[#181818] flex flex-col p-[5%] gap-7">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">{note.title}</h1>
        <div className="cursor-pointer text-primary hover:text-white flex flex-col relative">
          <PiDotsThreeCircle  size={30}
          onClick={(e) => {
          e.stopPropagation();
          setoverlay((prev) => !prev);
          }}
          />
          {overlay && (
         <div className="absolute top-12 right-0 rounded-md p-4 w-60 text-md flex flex-col gap-4 bg-[#333333] text-white">
            <button className=" flex gap-4 items-center py-2 cursor-pointer hover:bg-secondary-hover hobv">
              <TbStar />
              {"Add to Favorites"}
            </button>
            <button className=" flex gap-4 items-center py-2 cursor-pointer hover:bg-secondary-hover">
              <FiArchive />
              {"Archived"}
            </button>
            {/* <div className="divide-y divide-white/10"></div> */}
            <hr className="w-50 border border-b-[#333333]"></hr>
            <button className=" flex gap-4 items-center py-2 cursor-pointer hover:bg-secondary-hover hover:text-red-500">
              <RiDeleteBin7Line/>
              {"Delete"}
            </button>
          </div>
        )}
        </div>
      </div>

      <div className="flex flex-col divide-y divide-white/10">
        <div className="flex items-center gap-20 py-3">
          <div className="text-primary flex items-center gap-5">
            <FaRegCalendarAlt size={20} />
            <h3 className="text-xs font-semibold tracking-wider">Date</h3>
          </div>
          <div className="text-white text-sm font-bold underline decoration-gray-600 underline-offset-4">
            {new Date(note.createdAt).toLocaleDateString("en-GB")}
          </div>
        </div>

        <div className="flex items-center gap-17.5 py-3">
          <div className="text-primary flex items-center gap-5">
            <FaRegFolder size={20} />
            <h3 className="text-xs font-semibold tracking-wider">Folder</h3>
          </div>
          <div className="text-white text-sm underline decoration-gray-600 underline-offset-4 font-bold">
            {note.folder.name}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <p className="text-primary leading-relaxed text-base">
          {note.content}
        </p>
      </div>
    </div>
  );
};

export default RightSide;



