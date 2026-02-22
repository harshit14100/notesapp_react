import React, { useEffect, useState } from 'react'
// import api from '../Api/API'
import type { NotesType } from '../types/types'
import axios from 'axios';

const folders = () => {

    const API = 'https://nowted-server.remotestate.com/folders';

  const [rec, setRec] = useState<NotesType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  
  const getnotes = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(API);
      const notesData = response.data.recentNotes || response.data;

      console.log((response.data.recentNotes));
      // console.log("getnotes is running");
      
      if (Array.isArray(notesData)) {
        setRec(notesData);
      } else {
        setRec([]);
        console.error("Expected an array, but received:", notesData);
      }
    } catch (err) {
      console.error("Failed to fetch notes:", err);
      setError('Failed to load notes.')
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    getnotes();
  }, [])

  return (
    <div>
      
    </div>
  )
}

export default folders
