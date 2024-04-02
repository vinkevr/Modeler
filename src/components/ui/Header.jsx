import React from 'react';
import { NavLink, useLocation,Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const Header = () => {
    return (
        <>
        <div class="p-4">
            <div class="container mx-auto flex justify-between items-center">

            <div class="text-white font-normal ml-14 mt-16 text-7xl font-pragati tracking-normal">Modeler</div>

            <div class="space-x-24 mr-24 mt-7">
            <NavLink  to="/create" className= "text-white font-bold ml-14 text-lg">Crear cuenta</NavLink>
            <NavLink  to="/login" className= "text-white font-bold ml-14 text-lg">Iniciar sesión</NavLink>  
               
            </div>

            <Outlet />
  </div>
</div>
        </>
    )
}

export default Header;