
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

      <div className='bg-[#222322] text-amber-50  px-5 py-6 gap-12 '>
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
 