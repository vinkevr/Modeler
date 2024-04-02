import React from 'react'
import Fondo_slate from '../ui/Fondo_slate'
import { NavLink, useLocation,Outlet } from 'react-router-dom'

const RecoverPassword = () => {
  return (
    <div>
        <div className='text-white text-center text-7xl mt-16 font-pragati'>
        <NavLink  to="/"> Modeler </NavLink> 
        </div> 
        <p className='text-white text-center mt-10 font-outfit '>Recuperar Contraseña</p>



        <div className='flex justify-center'>
          <div className="mt-16 w-1/4 mb-10">
            <input
              type="email"
              id="email"
              placeholder='Correo electrónico o username'
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 px-6 py-3 rounded-lg focus:outline-none focus:outline-blue-500 focus:shadow-outline"
            />
          </div>
        </div>



        <div className='flex justify-center items-center font-semibold mt-12'>
            <button className='bg-sky-900 text-white text-center px-16 py-3 rounded-xl shadow-2xl font-outfit  hover:bg-sky-700 hover:text-white transition ease-in-out duration-300 '>Recuperar contraseña</button>
        </div>

        <Outlet />
        <Fondo_slate />
    </div>
  )
}

export default RecoverPassword
