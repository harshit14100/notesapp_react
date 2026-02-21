import { PiDotsThreeCircle } from "react-icons/pi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaRegFolder } from "react-icons/fa";

function RightSide() {
  const currentTime = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className="w-full h-full bg-[#181818] flex flex-col p-[3%] gap-7">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">
          Reflection on the Month of June
        </h1>
        <div className="cursor-pointer text-primary hover:text-white">
          <PiDotsThreeCircle size={30} />
        </div>
      </div>

      <div className="flex flex-col gap-7">
        <div className="flex items-center gap-20">
          <div className="text-primary flex items-center gap-5">
            <FaRegCalendarAlt size={20}/>

            <h3 className="text-xs font-semibold tracking-wider">Date</h3>
          </div>
          <div className="text-white text-sm font-bold underline decoration-gray-600 underline-offset-4">
            {currentTime}
          </div>
        </div>

        <hr className="text-primary"/>

        <div className="flex items-center gap-20">
          <div className="text-primary flex items-center gap-5 ">
            <FaRegFolder size={20}/>

            <h3 className="text-xs font-semibold tracking-wider">Folder</h3>
          </div>
          <div className="text-white text-sm underline decoration-gray-600 underline-offset-4 font-bold">
            Personal
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <p className="text-gray-300 leading-relaxed text-base overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          It's hard to believe that June is already over! Looking back on the
          month, there were a few highlights that stand out to me.
          <br />
          <br />
          One of the best things that happened was getting promoted at work.
          I've been working really hard and it's great to see that effort
          recognized. It's also exciting to have more responsibility and the
          opportunity to contribute to the company in a bigger way. I'm looking
          forward to taking on new challenges and learning as much as I can in
          my new role.
          <br />
          <br />I also had a great time on my vacation to Hawaii. The beaches
          were beautiful and I loved trying all of the different types of
          Hawaiian food. It was nice to relax and get away from the daily grind
          for a bit.
          <br />
          <br />
          On the downside, I feel like I didn't make as much progress on my
          fitness goals as I would have liked. I was really busy with work and
          didn't make it to the gym as often as I planned. I'm going to try to
          be more consistent in July and make exercise a higher priority. I know
          it will be good for my physical and mental health.
          <br />
          <br /> I also had a few rough patches in my relationships this month.
          I had a couple of misunderstandings with friends and it was hard to
          navigate those conflicts. But I'm glad we were able to talk things
          through and move past them. I value my relationships and I want to
          make sure I'm always working to be a good friend.
          <br />
          <br /> Overall, it was a good month with a mix of ups and downs. I'm
          looking forward to what July has in store! I'm hoping to make some
          more progress on my goals and spend quality time with the people I
          care about.
        </p>
      </div>
    </div>
  );
}

export default RightSide;