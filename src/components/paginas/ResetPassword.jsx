import {useState} from 'react'
import Fondo_slate from '../ui/Fondo_slate'
import { NavLink, Outlet, useParams, useNavigate } from 'react-router-dom'
import { alertError, alertSuccess } from '../../helpers/alertas'
import Spinner from '../ui/Spinner'

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const [confpassword, setConfpassword] = useState('')
  const [loading, setLoading] = useState(false)
  const {id} = useParams()
  const navigate = useNavigate()
  const handleResetPassword = async () => {
    if([password, confpassword].includes('')){
      alertWarning('Todos los campos son obligatorios!')
      return
    }
    if(password !== confpassword){
      alertWarning('Las contraseñas no coinciden')
      return
    }
    const url = `${import.meta.env.VITE_URL_API}${import.meta.env.VITE_URL_USER}/reset`
    setLoading(true)
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id,
        password
      })
    })
    const data = await response.text()
    if(response.ok){
      alertSuccess(data)
      navigate('/login')
    } else alertError(data)
    setLoading(false)
  }
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
        onChange={(e) => setConfpassword(e.target.value)}
        className="w-full border mb-10 border-gray-300 px-6 py-3 rounded-lg focus:outline-none focus:outline-blue-500 focus:shadow-outline"
      />
    </div>
    </div>


    <div className='flex justify-center items-center font-semibold mt-12'>
      {
        loading ? <Spinner /> 
        :
        <button 
        className='bg-sky-900 text-white text-center px-16 py-3 rounded-xl shadow-2xl font-outfit  hover:bg-sky-700 hover:text-white transition ease-in-out duration-300 '
        onClick={handleResetPassword}
        >Actualizar contraseña</button>
      }
    </div>

    <Outlet />
    <Fondo_slate />
</div>
  )
}

export default ResetPassword
