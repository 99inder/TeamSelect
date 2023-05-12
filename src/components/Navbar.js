import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className=' bg-teal-800 text-slate-100 h-16 flex justify-center items-center font-bold text-xl fixed top-0 w-full'>
      <ul className='flex justify-center gap-20'>

        <li className=' cursor-pointer'>
          <Link to='/'>Home</Link>
        </li>

        <li className=' cursor-pointer'>
          About
        </li>

      </ul>
    </nav>
  )
}

export default Navbar