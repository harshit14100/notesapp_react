import Aside from "../components/sidebar/Aside";
import Middle from "../components/middle/Mid";
import RightSide from "../components/editor/Rightsectionbase";
import { UserContextProvider } from "../context/NotesContextProvider";
import { useNotes } from "../utils/UseNotes";
import { useNavigate } from "react-router-dom";

const HomeLayout = () => {
  const { selectedFolderId, setSelectedFolder, clearSelectedFolder, folders } = useNotes();
  const navigate = useNavigate();

  const handleSelectFolder = (id: string, name: string) => {
    setSelectedFolder(id, name);
    navigate(`/${id}`)
  };

  return (
    <div className="flex w-full h-full bg-bg-main overflow-hidden">
      <div className="w-[20%] h-full border-r border-border-dark">
        <Aside
          folders={folders}
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
    <UserContextProvider>
      <HomeLayout />
    </UserContextProvider>
  );
}

export default Home;