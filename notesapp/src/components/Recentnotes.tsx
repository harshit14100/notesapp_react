import axios from 'axios'
import { useEffect, useState } from 'react'
import Card from './Card'
import type { NotesType } from '../types/types'

const Recentnotes = () => {
  const API = 'https://nowted-server.remotestate.com/notes/recent' 

  const [rec, setRec] = useState<NotesType[]>([])

  const getnotes = async  ()=>{
    try{

      const response = await axios.get(API)
      console.log(response.data.recentNotes[0].id); 
      setRec(response.data.recentNotes);
      console.log(response.data.recentNotes)
    }catch(error){
      console.log(error);
      
    }
  }
  
  useEffect(()=>{
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getnotes();
  },[])

  return (
    <div className='bg-[#222322] w-[25%] flex flex-col '>

 {rec.map((elem)=>{
      return <div >
      <div >
        <Card key={elem.id} title ={elem.title} preview = {elem.preview}/>
       </div>
      </div> 
   })}

    </div>
  )
}

export default Recentnotes
