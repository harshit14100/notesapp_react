import React, { useEffect, useState } from 'react';
import { getFolders } from '../Api/GetApi'; 
import { PiFolderSimpleBold } from "react-icons/pi"; 

interface FoldersProps {
  onSelectFolder: (id: string, name: string) => void; 
}


const Folders: React.FC<FoldersProps> = ({ onSelectFolder }) => {
  const [folders, setFolders] = useState<any[]>([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchFolders = async () => {
    try {
      setIsLoading(true);
      console.log(folders);
      

      const data = await getFolders(); 
      
      if (Array.isArray(data)) {
        setFolders(data);
      } else {
        setFolders([]);
      }
    } catch (err) {
      console.error("Failed to fetch folders:", err);
      setError('Failed to load folders.');
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchFolders();
  }, []);

  if (isLoading) return <div className='pl-8 text-sm text-text-muted'>Loading folders...</div>;
  if (error) return <div className='pl-8 text-sm text-text-delete'>{error}</div>;

  return (
    <div>
      {folders.length === 0 ? (
        <p className='pl-8 text-sm text-text-muted'>No folders found.</p>
      ) : (
        folders.map((folderItem : any, index: number) => (
          <div key={folderItem.id || index}>
            <div 
            onClick={() => onSelectFolder(folderItem.id, folderItem.name)}
              className='flex items-center gap-3.5 px-4 py-2.5 text-2xl cursor-pointer text-text-dim hover:bg-primary-hover hover:text-text-main rounded-lg transition-colors'>
              <PiFolderSimpleBold /> 
              <h2 className='text-sm font-bold'>{folderItem.name}</h2> 
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Folders;