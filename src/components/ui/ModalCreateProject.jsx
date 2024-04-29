import React, { useState, useContext } from 'react';
import UserContext from '../../context/UserContext';
import { alertError, alertSuccess } from '../../helpers/alertas';
const ModalCreateProject = ({ onClose, setProyectos, proyectos }) => {
  const { user } = useContext(UserContext)
  const [nombreProyecto, setNombreProyecto] = useState('')
  const handleSubmit = async () => {
    if(nombreProyecto == ''){
      alertError('El nombre del proyecto es obligatorio')
      return
    }
    const token = localStorage.getItem('token')
    const url = `${import.meta.env.VITE_URL_API}${import.meta.env.VITE_URL_RUTAS}/crear`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        nombre: nombreProyecto,
        usuarioCreador:user.id
      })
    })
    const data = await response.json()
    if (data.hasOwnProperty('error')) {
      alertError(data.error)
    } else {
      alertSuccess(data.mensaje)
      setProyectos([...proyectos, {id:data.id, nombre:data.nombre, usuarioCreador:data.usuarioCreador}])
      onClose()
    }
  }
  return (
    <div>
       
        <div className="fixed inset-0 overflow-y-auto flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-zinc-600 p-16 rounded-lg z-10 w-1/2 ">
            <p className='text-center font-outfit text-xl text-white '>Crear proyecto</p>
           
            <div className='flex justify-center'>
                <div className="mt-16 w-2/3 mb-10">
                    <input
                    type="text"
                    id="NombreProyecto"
                    placeholder='Nombre del proyecto'
                    onChange={(e) => setNombreProyecto(e.target.value.trim())}
                    className="w-full shadow-lg border border-gray-300 px-6 py-3 rounded-lg focus:outline-none focus:outline-blue-500 focus:shadow-outline"
                    />
                </div>
            </div>

           
            <div className='flex justify-around mr-16 ml-16 '>
                <button onClick={onClose} 
                className="mt-4 px-14 py-3 bg-red-900 text-white rounded-lg hover:bg-red-800 ease-in-out transition duration-300 shadow-lg"
                >Cancelar</button>
                <button  
                className="mt-4 px-10 py-3 bg-sky-900 text-white rounded-lg hover:bg-sky-800 ease-in-out transition duration-300 shadow-lg"
                onClick={handleSubmit}
                >Crear proyecto </button>
            </div>

          </div>
        </div>
     
    </div>
  )
}

export default ModalCreateProject
