import Aside from "../components/Aside";
import Middle from "../components/Mid";
import RightSide from "../components/Rightsectionbase";
import { NotesProvider, useNotes } from "../context/Notescontext";
import { useNavigate } from "react-router-dom";

const HomeLayout = () => {
  const { selectedFolderId, setSelectedFolder, clearSelectedFolder } = useNotes();
  const navigate = useNavigate();

  const handleSelectFolder = (id: string, name: string) => {
    setSelectedFolder(id, name);
    navigate(`/folder/${id}`);
  };

  return (
    <div className="flex w-full h-full bg-bg-main overflow-hidden">
      <div className="w-[20%] h-full border-r border-border-dark">
        <Aside
          onSelectFolder={handleSelectFolder}
          onClearFolder={clearSelectedFolder}
          selectedFolderId={selectedFolderId}
        />
      </div>
      <div className="w-[25%] h-full border-r border-white/5">
        <Middle />
      </div>
      <div className="w-[55%] h-full">
        <RightSide />
      </div>
    </div>
  );
};

function Home() {
  return (
    <NotesProvider>
      <HomeLayout />
    </NotesProvider>
  );
}

export default Home;