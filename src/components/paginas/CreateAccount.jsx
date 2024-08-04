import React from 'react'
import { useState } from 'react'
import Fondo_slate from '../ui/Fondo_slate'
import { NavLink,Outlet, useNavigate } from 'react-router-dom'
import { alertError, alertSuccess, alertWarning } from '../../helpers/alertas'
import Spinner from '../ui/Spinner'




const CreateAccount = () => {
  const navigate = useNavigate()
  const [registro, setRegistro] = useState({
    nombre: '',
    email: '',
    password: '',
  })
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const handleCreateAccount = async () => {
      if(Object.values(registro).includes('') || passwordConfirm === ''){
        alertWarning('Todos los campos son obligatorios!')
        return 
      }
      if(registro.password !== passwordConfirm){
        alertError('Las contraseñas no coinciden')
        return 
    }
    const url = `${import.meta.env.VITE_URL_API}${import.meta.env.VITE_URL_USER}/crear`
    setLoading(!loading)
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registro),
    })
    const data = await response.json()
    if(!data.hasOwnProperty('error')){
      alertSuccess(data.mensaje)
    setTimeout(() => {
      navigate('/verify')
    }
    , 2000)
  }else{
    alertError(data.error)
  }
  setLoading(false)
}

  return (
    <div>
        <div className='text-white text-center text-7xl mt-16 font-pragati'>
        <NavLink  to="/"> Modeler </NavLink> 
        </div> 
       
       <p className='text-white text-center mt-10 font-outfit text-xl '>Crear cuenta</p>


       
       <div className='flex justify-center'>
          <div className="mt-16 w-1/3 mb-12">
            <input
              type="text"
              id="username"
              placeholder='Username'
              onChange={(e) => setRegistro({...registro, nombre: e.target.value.trim()})}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:outline-blue-500 focus:shadow-outline"
            />
          </div>
        </div>
       
       
       <div className='flex justify-center'>
          <div className=" w-1/3 mb-12">
            <input
              type="email"
              id="email"
              placeholder='Correo electrónico'
              onChange={(e) => setRegistro({...registro, email: e.target.value.trim()})}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:outline-blue-500 focus:shadow-outline"
            />
          </div>
        </div>

        <div className='flex justify-center'>
        <div className="w-1/7 mr-12">
          <input
            type="password"
            id="password" 
            placeholder='Contraseña'
            onChange={(e) => setRegistro({...registro, password: e.target.value.trim()})}
            className="w-full border mb-10 border-gray-300 px-6 py-3 rounded-lg focus:outline-none focus:outline-blue-500 focus:shadow-outline"
          />
        </div>

        <div className="w-1/7 ">
          <input
            type="password"
            id="confpassword" 
            placeholder='Confirmar contraseña'
            onChange={(e) => setPasswordConfirm(e.target.value.trim())}
            className="w-full border mb-10 border-gray-300 px-6 py-3 rounded-lg focus:outline-none focus:outline-blue-500 focus:shadow-outline"
          />
        </div>
        </div>

        <div className='flex justify-center items-center font-semibold mt-10'>
            {loading ? <Spinner /> : (
              <button 
              className='bg-sky-900 text-white text-center px-16 py-3 rounded-xl shadow-2xl font-outfit hover:bg-sky-700 hover:text-white transition ease-in-out duration-300 '
              onClick={handleCreateAccount}
              >Crear cuenta</button>
            )}
        </div>
        <Outlet />
       <Fondo_slate />
    </div>
  )
}

export default CreateAccount
