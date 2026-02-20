
import './App.css'
import Aside from './components/Aside';
import Recentnotes from './components/Recentnotes';

function App() {

  return (
    <>
    < div className='flex w-full h-screen bg-[#1C1C1C] overflow-hidden' >
    
      <Aside />
     

    <Recentnotes />

    </div>
    </>
  )
}

export default App
