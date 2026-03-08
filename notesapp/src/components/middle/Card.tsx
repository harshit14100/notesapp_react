import { RiDeleteBin7Line } from "react-icons/ri";
import { TbStarFilled } from "react-icons/tb";

interface Note {
  id: string;
  title: string;
  preview?: string;
  createdAt: string;
  favorite?: boolean;
}

interface Props {
  note: Note;
  routeType?: string;
  onDelete: (e: React.MouseEvent, id: string) => void;
  onClick: (id: string) => void;
}

const NoteCard: React.FC<Props> = ({ note, routeType, onDelete, onClick }) => {
  return (
    <div
      onClick={() => onClick(note.id)}
      className="w-full p-5 bg-bg-aside border border-border-dark hover:bg-primary-hover/20 rounded-lg cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-red-glow"
    >
      <div className="flex justify-between items-start gap-2">
        <h4 className="text-m font-medium text-text-main mb-2 truncate flex-1">
          {note.title}
        </h4>

        <div className="flex items-center gap-2 flex-shrink-0">

          {note.favorite && routeType !== "favorite" && (
            <TbStarFilled className="text-yellow-400 text-sm" />
          )}

          {routeType !== "trash" && (
            <button onClick={(e) => onDelete(e, note.id)}>
              <RiDeleteBin7Line className="text-sm text-text-muted hover:text-xl hover:text-text-delete transition-all" />
            </button>
          )}

        </div>
      </div>

      <div className="flex justify-between items-center text-[12px] text-text-muted">
        <p>{new Date(note.createdAt).toLocaleDateString()}</p>

        <p className="truncate ml-3.75 opacity-70">
          {note.preview?.substring(0, 30) || "No content"}...
        </p>
      </div>
    </div>
  );
};

export default NoteCard;