
const Card = ({title, preview}) => {
  // const [first, setfirst] = useState(second)
  return (
<div className="p-5">

      <div className='bg-zinc-600 text-amber-50 border-2 border-amber-500 px-5 py-6 gap-12 '>
        <h2 className='font-bold'>{title}</h2>
        <p>{preview}</p>
      </div>
</div>
    

  )
}

export default Card
