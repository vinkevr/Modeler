import React, {useState, useEffect} from 'react'
import Fondo_slate from '../ui/Fondo_slate'
import { NavLink, useLocation,Outlet, useParams, useNavigate } from 'react-router-dom'
import verified from '../../images/verified.png'
import warning from '../../images/warning.png'

const AccountVerified = () => {
    const {token} = useParams()
    const navigate = useNavigate()
    const [verificado, setVerificado] = useState(false)
    useEffect(() => {
        const verifyAccount = async () => {
            const url = `${import.meta.env.VITE_URL_API}${import.meta.env.VITE_URL_USER}/verificar/${token}`
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const data = await response.json()
            setVerificado(Boolean(data.validacion))
            if(data.validacion){
                setTimeout(() => {
                    navigate('/login')
                }, 4000)
            }
        }
        verifyAccount()
    }
    , [])
  return (
    <div>
    <div className='text-white text-center text-7xl mt-16 font-pragati'>
        <NavLink  to="/"> Modeler </NavLink> 
    </div> 
    <p className='text-white text-center mt-14 font-outfit text-2xl font-semibold '>{verificado ? "¡Cuenta verificada!" : "Tu cuenta no se pudo verificar"}</p>
    {}


    <div className='flex justify-center mb-10'>
        <div className='text-white text-center mt-10 font-outfit text-lg w-2/5'>
            
            {verificado ? "Has verificado tu cuenta correctamente, para comenzar a diseñar con Modeler da click en Iniciar sesión" 
            : "El token no es valido o ha expirado, por favor solicita un nuevo enlace de verificación."}
        </div>
    </div>

    <img src={verificado ? verified : warning} className=' h-44 flex m-auto'/>

    <div className='flex justify-center items-center font-bold text-lg mt-10'>
        <NavLink  to={verificado ? "/login" : "/"} className= "bg-sky-900 text-white text-center px-16 py-3 rounded-xl shadow-2xl font-outfit hover:bg-sky-700 hover:text-white transition ease-in-out duration-300">{verificado ? "Iniciar sesión" : "Ir al inicio"}</NavLink>  
    
    </div>

    <Outlet />
    <Fondo_slate />
</div>
  )
}

export default AccountVerified
