import React, { useState } from 'react';
import axios from 'axios';
import { IoMdAdd } from "react-icons/io";
import { createNote } from '../Api/PostApi';

interface AddNoteProps {
    onNoteAdded?: () => void; 
}

const AddNote: React.FC<AddNoteProps> = ({ onNoteAdded }) => {
  const API = 'https://nowted-server.remotestate.com/notes';

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

    try {
      setIsSubmitting(true);
      setError('');
      
      await axios.post(API, {
        title,
        content
      });

      setTitle('');
      setContent('');
      setIsFormOpen(false);

      if (onNoteAdded) {
        onNoteAdded();
      }

    } catch (err) {
      console.error("Failed to add note:", err);
      setError('Failed to save the note. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const Cancel = () => {
    setIsFormOpen(false);
    setTitle('');
    setContent('');
    setError('');
  };

  return (
    <>
      <button 
        onClick={() => setIsFormOpen(true)}
        className="w-full rounded  bg-zinc-600 hover:bg-zinc-700 flex justify-center items-center gap-2 cursor-pointer"
      >
        <div className='text-2xl '>
        <IoMdAdd />
        </div>
        <h3 className='font-bold'>New Note</h3>
      </button>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          
          <div className="w-full max-w-md p-6 border rounded-lg shadow-2xl bg-[#181818] border-zinc-800">
            <h3 className="mb-4 text-xl font-bold text-zinc-100">Create a New Note</h3>
            
            {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label htmlFor="title" className="block mb-2 text-sm font-bold text-zinc-300">
                  Title
                </label>
                
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter note title..."
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 text-white transition-colors bg-transparent border rounded-md border-zinc-700 focus:outline-none focus:border-zinc-500 placeholder-zinc-600 disabled:opacity-50"
                />
              </div>

              <div>
                <label htmlFor="content" className="block mb-2 text-sm font-bold text-zinc-300">
                  Content
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your note here..."
                  rows={4}
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 text-white transition-colors bg-transparent border rounded-md resize-none border-zinc-700 focus:outline-none focus:border-zinc-500 placeholder-zinc-600 disabled:opacity-50"
                />
              </div>

              <div className="flex gap-3 mt-4">
                <button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="px-4 py-2 font-bold text-white transition-colors rounded-md bg-zinc-600 hover:bg-zinc-700 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Saving...' : 'Save Note'}
                </button>
                
                <button 
                  type="button" 
                  onClick={Cancel} 
                  disabled={isSubmitting} 
                  className="px-4 py-2 font-bold transition-colors bg-transparent border rounded-md text-zinc-300 border-zinc-700 hover:bg-zinc-800 hover:text-white disabled:opacity-60 disabled:cursor-not-allowed"
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