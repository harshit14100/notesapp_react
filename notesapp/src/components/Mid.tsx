function Middle() {
  const currentTime = new Date().toLocaleDateString();

  const tempNotes = [
    {
      id: 1,
      title: "Reflection on the Month of June",
      content: "It's hard to believe that June is already over...",
    },
    {
      id: 2,
      title: "Project proposal",
      content: "This is a proposal for the Nowted app...",
    },
    {
      id: 3,
      title: "Travel itinerary",
      content: "Planning the trip to Hawaii for next summer...",
    },
  ];

  return (
    <div className="w-full h-full bg-[#1C1C1C] flex flex-col">
      <div className="w-full p-[3%] pb-[4%]">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold text-white">Personal</h2>
          <p className="text-gray-500 text-sm">{tempNotes.length} Notes</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-[8%] flex flex-col gap-3.75 pb-7.5">
        {tempNotes.map((note) => (
          <div
            key={note.id}
            className="w-full p-5 bg-white/5  border border-white/5 hover:bg-secondary-hover cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg hover:shadow-red-600/40"
          >
            <h4 className="text-m font-medium text-white mb-2 truncate">
              {note.title}
            </h4>

            <div className="flex justify-between items-center text-[12px] text-gray-500">
              <p>{currentTime}</p>
              <p className="truncate ml-3.75 opacity-70">
                {note.content.substring(0, 30)}...
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Middle;