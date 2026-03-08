import { TbFileText } from "react-icons/tb";

const EmptyNoteState = () => {
  return (
    <div className="w-full h-full bg-bg-right flex flex-col items-center justify-center gap-4">
      <TbFileText strokeWidth={0.8} size={100} className="text-text-dim" />

      <h2 className="text-text-main text-2xl font-semibold">
        Select a note to view
      </h2>

      <p className="text-text-muted text-sm text-center px-10">
        Choose a note from the list on the left to view its contents, or
        create a <br />
         new note to add to your collection.
      </p>
    </div>
  );
};

export default EmptyNoteState;