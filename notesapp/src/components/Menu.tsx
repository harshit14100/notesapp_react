import React from 'react'
import { TbFileText } from "react-icons/tb";

const Menu = ({title}) => {
  return (
    <div>
      <div className='flex px-6 gap-3.5 text-2xl items-center cursor-pointer  py-2.5 text-zinc-300 hover:bg-red-600 hover:text-amber-50'>
              <TbFileText /> <button className='text-sm font-bold '>{title}</button>
            </div>
    </div>
  )
}

export default Menu
