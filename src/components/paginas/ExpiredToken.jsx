import React from 'react'
import Fondo_slate from '../ui/Fondo_slate'
import { NavLink, useLocation,Outlet } from 'react-router-dom'
import warning from '../../images/warning.png'

const ExpiredToken = () => {
  return (
            <div>
                <div className='text-white text-center text-7xl mt-16 font-pragati'>
                    <NavLink  to="/"> Modeler </NavLink> 
                </div> 
                <p className='text-white text-center mt-12 font-outfit font-semibold text-2xl'>Token inváildo</p>



                <div className='flex justify-center mb-10'>
                    <div className='text-white text-center mt-5 font-outfit w-2/5'>
                        El token ingresado venció
                    </div>
                </div>

                <img src={warning} className=' h-52 flex m-auto'/>

                <div className='flex justify-center items-center font-bold text-lg mt-10'>
                    <NavLink  to="/" className= "bg-sky-900 text-white text-center px-16 py-3 rounded-xl shadow-2xl font-outfit hover:bg-sky-700 hover:text-white transition ease-in-out duration-300">Ir a inicio</NavLink>  
                
                </div>

                <Outlet />
                <Fondo_slate />
            </div>
  )
}

export default ExpiredToken
