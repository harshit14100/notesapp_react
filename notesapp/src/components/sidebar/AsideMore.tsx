import React from 'react'
import { FiArchive } from 'react-icons/fi'
import { RiDeleteBin7Line } from 'react-icons/ri'
import { TbStar } from 'react-icons/tb'
import { NavLink } from 'react-router-dom'

interface AsideMoreProps {
  onClearFolder: () => void;
}

const AsideMore: React.FC<AsideMoreProps> = ({ onClearFolder }) => {
  return (
    <div>
      <div className='pb-20'>
        <h4 className='text-text-dim px-8 text-sm font-bold pt-5'>More</h4>

        <NavLink
          to={'/type/favorite'}
          end={false}
          onClick={onClearFolder}
          className={({ isActive }) =>
            `flex px-6 gap-3.5 text-2xl items-center cursor-pointer text-text-muted py-2.5 hover:bg-red-800 hover:text-white ${isActive ? 'bg-red-800 text-white' : ''}`
          }
        >
          <TbStar /> <span className='text-sm font-bold'>Favorites</span>
        </NavLink>

        <NavLink
          to={'/type/trash'}
          end={false}
          onClick={onClearFolder}
          className={({ isActive }) =>
            `flex px-6 gap-3.5 text-2xl text-text-muted cursor-pointer items-center py-2.5 hover:bg-red-800 hover:text-white ${isActive ? 'bg-red-800 text-white' : ''}`
          }
        >
          <RiDeleteBin7Line /> <span className='text-sm font-bold'>Trash</span>
        </NavLink>

        <NavLink
          to={'/type/archive'}
          end={false}
          onClick={onClearFolder}
          className={({ isActive }) =>
            `flex px-6 gap-3.5 text-2xl items-center cursor-pointer py-2.5 text-text-muted hover:bg-red-800 hover:text-white ${isActive ? 'bg-red-800 text-white' : ''}`
          }
        >
          <FiArchive /> <span className='text-sm font-bold'>Archived Notes</span>
        </NavLink>
      </div>
    </div>
  )
}

export default AsideMore