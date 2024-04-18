import React from 'react'
import Fondo_slate from '../ui/Fondo_slate'
import { NavLink, useLocation,Outlet } from 'react-router-dom'
import sendMail from '../../images/sendMail.png'

const RecoverPassMessage = () => {
  return (
    <div>
        <div className='text-white text-center text-7xl mt-16 font-pragati'>
        <NavLink  to="/"> Modeler </NavLink> 
        </div> 
        <p className='text-white text-center mt-10 font-outfit font-semibold text-xl'>Recuperar Contraseña</p>



        <div className='flex justify-center mt-5 mb-5'>
          <div className='text-white text-center mt-10 font-outfit text-lg w-2/5'>
                Se envió un correo a la dirección ingresada con indicaciones para recuperar tu contraseña
          </div>
        </div>

        <img src={sendMail} className='h-40 flex m-auto'/>

        <div className='flex justify-center items-center font-bold text-lg mt-10'>
             <NavLink  to="/" className= "bg-sky-900 text-white text-center px-16 py-3 rounded-xl shadow-2xl font-outfit hover:bg-sky-700 hover:text-white transition ease-in-out duration-300">Ir a inicio</NavLink>  
           
        </div>

        <Outlet />
        <Fondo_slate />
    </div>
  )
}

export default RecoverPassMessage
