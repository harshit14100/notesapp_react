import { useState } from "react";
import Aside from "./components/Aside";
import Middle from "./components/Mid";
import Right from "./components/Right";

function App() {
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);

  return (
    <div className="flex w-full h-screen">
      
      <Aside onSelectFolder={setSelectedFolderId} />
      <Middle selectedfolderId={selectedFolderId} />
      <Right />
      
    </div>
  );
}

export default App;



