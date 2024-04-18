import React from 'react'
import Fondo_slate from '../ui/Fondo_slate'
import { NavLink, useLocation,Outlet } from 'react-router-dom'
import notfound from '../../images/notfound.png'

const NotFound = () => {
  return (
            <div>
                <div className='text-white text-center text-7xl mt-16 font-pragati'>
                    <NavLink  to="/"> Modeler </NavLink> 
                </div> 
                <p className='text-white text-center mt-14 font-outfit text-2xl font-semibold'>404 Not found</p>



                <div className='flex justify-center mb-10'>
                    <div className='text-white text-center mt-5 font-outfit w-2/5'>
                            ¡Ups! la dirección ingresada no es válida.
                    </div>
                </div>

                <img src={notfound} className=' h-80 flex m-auto'/>

                

                <Outlet />
                <Fondo_slate />
            </div>
  )
}

export default NotFound
