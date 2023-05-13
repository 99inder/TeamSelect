import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Team from './components/Team'

const App = () => {
  return (
    <div className='bg-slate-100 w-full h-auto min-h-screen'>
      <ToastContainer />

      <Navbar />

      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/myTeam' element={<Team />} />

      </Routes>

    </div>

  )
}

export default App