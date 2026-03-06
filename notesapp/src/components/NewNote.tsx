// const API = 'https://nowted-server.remotestate.com/notes';


import React, {  useState } from 'react';
import { IoMdAdd } from "react-icons/io";
import { createNote } from '../Api/PostApi';
// import Middle from './Mid';
import toast from "react-hot-toast";

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

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
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
  // console.error("error:", err);

  if (err.response) {
    // console.log("error:", err.response.data);
  } 
} finally {
      setIsSubmitting(false);
      toast("Note Created")
    }
  };

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
        className="w-full rounded bg-button hover:bg-button-hover flex justify-center items-center  cursor-pointer transition-all py-3"
      >
        <div className='text-2xl text-text-main'>
          <IoMdAdd />
        </div>
        <h3 className='font-bold text-text-main'>New Note</h3>
      </button>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          
          <div className="w-full max-w-md p-6 border rounded-lg shadow-2xl bg-bg-popover border-border-dark">
            <h3 className="mb-4 text-xl font-bold text-text-main">
              Create a New Note
            </h3>
            
            {error && (
              <p className="mb-4 text-sm text-text-delete font-semibold">{error}</p>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter note title..."
                disabled={isSubmitting}
                className="w-full px-3 py-2 text-text-main bg-transparent border rounded-md border-border-input focus:outline-none focus:border-primary-hover transition-colors"
              />

              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your note..."
                rows={4}
                disabled={isSubmitting}
                className="w-full px-3 py-2 text-text-main bg-transparent border rounded-md resize-none border-border-input focus:outline-none focus:border-primary-hover transition-colors"
              />

              <div className="flex gap-3 mt-4">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 font-bold text-text-main bg-button rounded-md hover:bg-button-hover transition-all hover:shadow-red-glow disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : 'Save Note'}
                </button>

                <button 
                  type="button"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                  className="px-4 py-2 border rounded-md text-text-muted border-border-input hover:bg-primary-hover/10 transition-colors"
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