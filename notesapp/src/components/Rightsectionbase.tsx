
import { useEffect, useState } from "react";
import { getNoteById } from "../Api/GetApi";
import { useParams } from "react-router-dom";
import { TbFileText } from "react-icons/tb";


import { PiDotsThreeCircle } from "react-icons/pi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaRegFolder } from "react-icons/fa";

const RightSide = () => {
  const { noteId } = useParams();
  const [note, setnote] = useState<any>(null);

  const loadNote = async () => {
    if (!noteId) return;
    const res = await getNoteById(noteId);
    setnote(res);
  };

  useEffect(() => {
    loadNote();
  }, [noteId]);

  if (!noteId || !note) {
    return (
      <div className="w-full h-full bg-[#181818] flex flex-col items-center justify-center gap-4">
        <TbFileText   strokeWidth={0.8} size={100} className="text-secondary" />
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
        <div className="cursor-pointer text-primary hover:text-white">
          <PiDotsThreeCircle  size={30} />
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
        <p className="text-secondary leading-relaxed text-base">
          {note.content}
        </p>
      </div>
    </div>
  );
};

export default RightSide;