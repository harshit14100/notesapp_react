import { useState } from "react";
import Aside from "./components/Aside";
import Middle from "./components/Mid";
import Right from "./components/Right";

function App() {
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [selectedFolderName, setSelectedFolderName] = useState<string | null>(null);

  const handleSelectFolder = (id: string, name: string) => {
  setSelectedFolderId(id);
  setSelectedFolderName(name);
  };
  
  return (
    <div className="flex w-full h-screen">
      
      <Aside 
      onSelectFolder={handleSelectFolder}
      selectedFolderId={selectedFolderId}
      selectfoldername={selectedFolderName}/>
      <Middle 
      selectedfolderId={selectedFolderId}
      selectedFoldername={selectedFolderName}/>
      <Right />
      
    </div>
  );
}

export default App;



