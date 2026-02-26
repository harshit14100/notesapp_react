// const API = 'https://nowted-server.remotestate.com/notes';


import React, { useEffect, useState } from 'react';
import { IoMdAdd } from "react-icons/io";
import { createNote } from '../Api/PostApi';
// import Middle from './Mid';

interface AddNoteProps {
  folderId: string | null;   
  onNoteAdded?: () => void;
}

const AddNote: React.FC<AddNoteProps> = ({ folderId, onNoteAdded }) => {
  
  // const [content, setContent] = useState('');
  // const [folderId, setFolderId] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setError('Title and content are required.');
      return;
    }

    if (!folderId) {
      setError('folder not selected.');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');
      await createNote(folderId, title, content);

      setTitle('');
      setContent('');
      setIsFormOpen(false);

      onNoteAdded?.(); 
    } catch (err: any) {
  console.error("error:", err);

  if (err.response) {
    console.log("error:", err.response.data);
  } 
} finally {
      setIsSubmitting(false);
    }
  };

  console.log("FolderId in AddNote:", folderId);
  const handleCancel = () => {
    setIsFormOpen(false);
    setTitle('');
    setContent('');
    setError('');
  };

  // useEffect(()=>{
  //   Middle();
  // },[])
  
  return (
    <>
      <button 
        onClick={() => setIsFormOpen(true)}
        className="w-full rounded bg-zinc-600 hover:bg-zinc-700 flex justify-center items-center gap-2 cursor-pointer"
      >
        <div className='text-2xl'>
          <IoMdAdd />
        </div>
        <h3 className='font-bold'>New Note</h3>
      </button>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          
          <div className="w-full max-w-md p-6 border rounded-lg shadow-2xl bg-[#181818] border-zinc-800">
            <h3 className="mb-4 text-xl font-bold text-zinc-100">
              Create a New Note
            </h3>
            
            {error && (
              <p className="mb-4 text-sm text-red-500">{error}</p>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter note title..."
                disabled={isSubmitting}
                className="w-full px-3 py-2 text-white bg-transparent border rounded-md border-zinc-700 focus:outline-none"
              />

              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your note..."
                rows={4}
                disabled={isSubmitting}
                className="w-full px-3 py-2 text-white bg-transparent border rounded-md resize-none border-zinc-700 focus:outline-none"
              />

              <div className="flex gap-3 mt-4">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 font-bold text-white bg-zinc-600 rounded-md hover:bg-zinc-700"
                >
                  {isSubmitting ? 'Saving...' : 'Save Note'}
                </button>

                <button 
                  type="button"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                  className="px-4 py-2 border rounded-md text-zinc-300 border-zinc-700 hover:bg-zinc-800"
                >
                  Cancel
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddNote;