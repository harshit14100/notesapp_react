import { LuHistory } from "react-icons/lu";

interface Props {
  title: string;
  isRestoring: boolean;
  onRestore: () => void;
}

const RestoreNoteState: React.FC<Props> = ({ title, isRestoring, onRestore }) => {
  return (
    <div className="w-full h-full bg-bg-right flex flex-col items-center justify-center gap-5 px-10">

      <div className="text-text-dim">
        <LuHistory size={80} strokeWidth={1} />
      </div>

      <h2 className="text-text-main text-2xl font-semibold text-center">
        Restore "{title}"
      </h2>

      <p className="text-text-muted text-sm text-center max-w-md leading-relaxed">
        Don't want to lose this note? It's not too late! Just click the restore
        button and it will be added back to your list.
      </p>

      <button
        onClick={onRestore}
        disabled={isRestoring}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-2.5 rounded-md transition-colors disabled:opacity-60 cursor-pointer"
      >
        {isRestoring ? "Restoring..." : "Restore"}
      </button>

    </div>
  );
};

export default RestoreNoteState;