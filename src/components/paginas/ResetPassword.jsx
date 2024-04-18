import React from 'react'
import Fondo_slate from '../ui/Fondo_slate'
import { NavLink, useLocation,Outlet } from 'react-router-dom'

const ResetPassword = () => {
  return (
    <div>
    <div className='text-white text-center text-7xl mt-16 font-pragati'>
    <NavLink  to="/"> Modeler </NavLink> 
    </div> 
    <p className='text-white text-center mt-10 font-outfit mb-10 text-lg font-semibold '>Cambiar contraseña</p>


    <div className='flex justify-center'>
    <div className="w-1/4 ">
      <input
        type="password"
        id="password" 
        placeholder='Contraseña'
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border mb-10 border-gray-300 px-6 py-3 rounded-lg focus:outline-none focus:outline-blue-500 focus:shadow-outline"
      />
    </div>
    </div>
   

    <div className='flex justify-center'>
    <div className="w-1/4 ">
      <input
        type="password"
        id="confpassword" 
        placeholder='Confirmar contraseña'
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border mb-10 border-gray-300 px-6 py-3 rounded-lg focus:outline-none focus:outline-blue-500 focus:shadow-outline"
      />
    </div>
    </div>


    <div className='flex justify-center items-center font-semibold mt-12'>
        <button className='bg-sky-900 text-white text-center px-16 py-3 rounded-xl shadow-2xl font-outfit  hover:bg-sky-700 hover:text-white transition ease-in-out duration-300 '>Actualizar contraseña</button>
    </div>

    <Outlet />
    <Fondo_slate />
</div>
  )
}

export default ResetPassword
