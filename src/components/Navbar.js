import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

const Navbar = () => {

  const teamSize = useSelector(state => state.team.value.length);
  return (
    <nav className=' bg-teal-800 text-slate-100 h-16 flex justify-center items-center font-bold text-xl fixed top-0 w-full z-20'>
      <ul className='flex justify-center gap-20'>

        <li className=' cursor-pointer'>
          <Link to='/'>Home</Link>
        </li>

        <li className='relative cursor-pointer'>
          <div className={`absolute -top-1 -right-5 bg-red-700 rounded-full text-sm w-5 h-5 flex items-center justify-center ${teamSize <= 0 && "hidden"} ${teamSize >= 3 && "bg-green-600"}`}>{teamSize}</div>
          <Link to='/myTeam'>My Team</Link>
        </li>

      </ul>
    </nav>
  )
}

export default Navbar