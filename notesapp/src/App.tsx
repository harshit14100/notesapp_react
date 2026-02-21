
import './App.css'
import Aside from './components/Aside';
import Middle from './components/Mid';
// import Recentnotes from './components/Recentnotes';
import RightSide from './components/Right';

function App() {

  return (
    <>
    < div className='flex w-full h-screen bg-[#1C1C1C] overflow-hidden' >
      <Aside />
      <Middle />
      <RightSide />
      {/* <Recentnotes /> */}
    </div>
    </>
  )
}

export default App
