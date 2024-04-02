import React from 'react'
import Header from '../ui/Header'
import Fondo from '../ui/Fondo';
import { NavLink, useLocation,Outlet } from 'react-router-dom'

const Index = () => {
  return (
    <div>
        <Header />
        <Fondo />
        <div className='text-white ml-16 text-5xl w-2/5 mt-28 font-outfit font-light'>
            <p className='leading-tight'>La plataforma ideal para modelar diagramas E-R</p>
        </div>

        <div className='flex justify-center items-center font-bold text-lg mt-32'>
             <NavLink  to="/login" className= "bg-white text-center px-10 py-2 rounded-xl shadow-2xl hover:bg-sky-900 hover:text-white transition ease-in-out duration-300">Comenzar</NavLink>  
           
        </div>

        <Outlet />
    </div>
  )
}

export default Index
