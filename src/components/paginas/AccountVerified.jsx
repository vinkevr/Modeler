import React from 'react'
import Fondo_slate from '../ui/Fondo_slate'
import { NavLink, useLocation,Outlet } from 'react-router-dom'
import verified from '../../images/verified.png'

const AccountVerified = () => {
  return (
    <div>
    <div className='text-white text-center text-7xl mt-16 font-pragati'>
        <NavLink  to="/"> Modeler </NavLink> 
    </div> 
    <p className='text-white text-center mt-14 font-outfit text-2xl font-semibold '>¡Cuenta verificada!</p>



    <div className='flex justify-center mb-10'>
        <div className='text-white text-center mt-10 font-outfit text-lg w-2/5'>
            Has verificado tu cuenta correctamente, para comenzar a diseñar con Modeler da click en Iniciar sesión
        </div>
    </div>

    <img src={verified} className=' h-44 flex m-auto'/>

    <div className='flex justify-center items-center font-bold text-lg mt-10'>
        <NavLink  to="/login" className= "bg-sky-900 text-white text-center px-16 py-3 rounded-xl shadow-2xl font-outfit hover:bg-sky-700 hover:text-white transition ease-in-out duration-300">Iniciar sesión</NavLink>  
    
    </div>

    <Outlet />
    <Fondo_slate />
</div>
  )
}

export default AccountVerified
