
const Card = ({notesdata}) => {
const {title, preview, updateddate} = notesdata
  const dateObj = new Date(updateddate);

  const formattedDate = dateObj.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });
  return (
<div className="p-3">

      <div className='w-full p-5 bg-white/5  border border-white/5 hover:bg-secondary-hover cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg hover:shadow-red-600/40 '>
        <h2 className='font-bold'>{title}</h2>
        <div className=" flex flex-wrap gap-x-3.5">
        <span >{formattedDate}</span>
        <p>{preview}</p>
        </div>
      </div>
</div>
    

  )
}

export default Card
 