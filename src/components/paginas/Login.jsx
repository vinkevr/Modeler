import React, {useState} from 'react'
import Fondo_slate from '../ui/Fondo_slate';
import { NavLink, useLocation,Outlet, useNavigate } from 'react-router-dom'

import { useContext } from 'react';
import UserContext from '../../context/UserContext';
import { alertError, alertWarning } from '../../helpers/alertas';
const Login = () => {
  const navigate = useNavigate();
  const {setUser} = useContext(UserContext);
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const handleSubmit = async () => {
    if(Object.values(credentials).includes('')){
      alertWarning('Todos los campos son obligatorios!')
      return 
    }
    const url = `${import.meta.env.VITE_URL}/login`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
    const data = await response.json()
    if(Boolean(data.verificado)){
      localStorage.setItem('token', data.token)
      data.verificado = Boolean(data.verificado)
      setUser(data)
      navigate('/panel')
    }
    else{
      alertError('Usuario o contraseña incorrectos')
    }
  }
  return (
    <div>
        <div className='text-white text-center text-7xl mt-16 font-pragati'>
        <NavLink  to="/"> Modeler </NavLink> 
        </div> 
        <p className='text-white text-center mt-10 font-outfit '>Inicia sesión o crea tu cuenta</p>



        <div className='flex justify-center'>
          <div className="mt-16 w-1/4 mb-10">
            <input
              type="email"
              id="email"
              placeholder='Correo electrónico o username'
              onChange={(e) => setCredentials({...credentials,email: e.target.value.trim()})}
              className="w-full border border-gray-300 px-6 py-3 rounded-lg focus:outline-none focus:outline-blue-500 focus:shadow-outline"
            />
          </div>
        </div>

        <div className='flex justify-center'>
          <div className="w-1/4 ">
            <input
            type="password"
            id="password" 
            placeholder='Contraseña'
            onChange={(e) => setCredentials({...credentials,password: e.target.value.trim()})}
            className="w-full border mb-10 border-gray-300 px-6 py-3 rounded-lg focus:outline-none focus:outline-blue-500 focus:shadow-outline"
             />
          </div>
        </div>
      <div className='flex 3/5 justify-center text-xs'>
        <div className=' justify-start'>
          <div className='text-white font-outfit '><NavLink  to="/recover" className= " text-white ml-2 font-outfit"> Olvidé mi contraseña </NavLink>  </div>
        </div>
     
        <div className='justify-end ml-20'>
          <div className='text-white font-outfit '>¿No tienes cuenta? <NavLink  to="/create" className= "underline text-white ml-2"> Crea una aquí</NavLink>  </div>
        </div>
      </div>

        <div className='flex justify-center items-center font-semibold mt-12'>
            <button className='bg-sky-900 text-white text-center px-16 py-3 rounded-xl shadow-2xl font-outfit  hover:bg-sky-700 hover:text-white transition ease-in-out duration-300 '
            onClick={handleSubmit}
            >Iniciar sesión</button>
        </div>

        <Outlet />
        <Fondo_slate />
    </div>
  )
}

export default Login;
