import LeftSide from "../components/Aside";
import Middle from "../components/Mid";
import RightSide from "../components/Right";

function Home() {
  return (
    <div className="flex w-full h-full bg-[#181818] overflow-hidden">
      <div className="w-[20%] h-full border-r border-white/5">
        <LeftSide />
      </div>
      <div className="w-[25%] h-full border-r border-white/5">
        <Middle />
      </div>
      <div className="w-[55%] h-full">
        <RightSide />
      </div>
    </div>
  );
}

export default Home;