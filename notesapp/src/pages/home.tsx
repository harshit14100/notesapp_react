import { useEffect, useState } from "react";
import Aside from "../components/Aside";
import Middle from "../components/Mid";
import RightSide from "../components/Rightsectionbase";
import { useNavigate } from "react-router-dom";

function Home() {
    const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
    const [selectedFolderName, setSelectedFolderName] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [refetchKey, setRefetchKey] = useState<number>(0);
    const triggerRefetch = () => setRefetchKey(k => k + 1);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
      document.documentElement.classList.add('dark');
    }, []);

    const toggleTheme = () => {
      if (isDarkMode) {
        document.documentElement.classList.remove('dark');
        setIsDarkMode(false);
      } else {
        document.documentElement.classList.add('dark');
        setIsDarkMode(true);
      }
    };

    const handleSelectFolder = (id: string, name: string) => {
      setSelectedFolderId(id);
      setSelectedFolderName(name);
      navigate(`/folder/${id}`);
    };

    const handleClearFolder = () => {
      setSelectedFolderId(null);
      setSelectedFolderName(null);
    };

    return (
      <div className="flex w-full h-full bg-bg-main overflow-hidden">
        <div className="w-[20%] h-full border-r border-border-dark">
          <Aside
            onSelectFolder={handleSelectFolder}
            onClearFolder={handleClearFolder}
            selectedFolderId={selectedFolderId}
            selectedFolderName={selectedFolderName}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            isDarkMode={isDarkMode}
            toggleTheme={toggleTheme}
            onNoteAdded={triggerRefetch}
          />
        </div>
        <div className="w-[25%] h-full border-r border-white/5">
          <Middle
            selectedfolderId={selectedFolderId}
            selectedFoldername={selectedFolderName}
            refetchKey={refetchKey}
          />
        </div>
        <div className="w-[55%] h-full">
          <RightSide onNoteChanged={triggerRefetch} />
        </div>
      </div>
    );
}

export default Home;