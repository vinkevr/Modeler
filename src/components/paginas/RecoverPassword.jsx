import {useState} from 'react'
import Fondo_slate from '../ui/Fondo_slate'
import { NavLink, useNavigate,Outlet } from 'react-router-dom'
import { alertWarning } from '../../helpers/alertas'
import Spinner from '../ui/Spinner';
const RecoverPassword = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const handleRecoverPassword = async () => {
    if(email === ''){
      alertWarning('Todos los campos son obligatorios!')
      return
    }
    setLoading(true)
  const response = await fetch(`${import.meta.env.VITE_URL_API}${import.meta.env.VITE_URL_USER}/recover`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email}),
  })
  if(response.ok){
    setTimeout(() => {
      navigate('/recovermess')
    })
  }else{
    alertWarning('No se pudo enviar el correo')
  }
  setLoading(false)
}
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
            {
              loading ? <Spinner /> : 
              <button 
              className='bg-sky-900 text-white text-center px-16 py-3 rounded-xl shadow-2xl font-outfit  hover:bg-sky-700 hover:text-white transition ease-in-out duration-300 '
              onClick={handleRecoverPassword}
              >Recuperar contraseña</button>
            }
            
        </div>

        <Outlet />
        <Fondo_slate />
    </div>
  )
}

export default RecoverPassword
