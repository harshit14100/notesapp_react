import { useState } from "react";
import Aside from "../components/Aside";
import Middle from "../components/Mid";
  import RightSide from "../components/Rightsectionbase";

function Home() {
    const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
    const [selectedFolderName, setSelectedFolderName] = useState<string | null>(null);
  
    const handleSelectFolder = (id: string, name: string) => {
  setSelectedFolderId(id);
  setSelectedFolderName(name);
  };
  return (
    <div className="flex w-full h-full bg-[#181818] overflow-hidden">
      <div className="w-[20%] h-full border-r border-white/5">
        <Aside 
      onSelectFolder={handleSelectFolder}
      selectedFolderId={selectedFolderId}
      selectfoldername={selectedFolderName}/>
      </div>
      <div className="w-[25%] h-full border-r border-white/5">
        <Middle 
      selectedfolderId={selectedFolderId}
      selectedFoldername={selectedFolderName}/>
      </div>
      <div className="w-[55%] h-full">
        <RightSide />
      </div>
    </div>
  );
}

export default Home;