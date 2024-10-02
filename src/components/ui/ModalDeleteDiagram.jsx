import React from 'react'
import { alertSuccess, alertError } from '../../helpers/alertas'
const ModalDeleteDiagram = ({onClose, id, proyectos, setProyectos}) => {
  const handleSubmit = async () => {
    const token = localStorage.getItem('token')
      const url = `${import.meta.env.VITE_URL_API}${import.meta.env.VITE_URL_RUTAS}/eliminar`
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({id})
      })
      const data = await response.text()
      if (response.ok) {
        alertSuccess(data)
        setProyectos(proyectos.filter(proyecto => proyecto.id !== id))
        onClose()
      }
     else {alertError(data)}
    
  }
  return (
    <div>
       
        <div className="fixed inset-0  z-50  bg-black bg-opacity-70  flex justify-center items-center">
          <div className="bg-zinc-600 p-16 rounded-lg w-max">
            <p className='text-center font-outfit text-xl text-white '>¿Estás seguro de eliminar este proyecto de tu panel?</p>
          
           
            <div className='flex gap-10  justify-around mr-16 ml-16 '>
                <button onClick={onClose} className="mt-4 px-14 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-400 ease-in-out transition duration-300 shadow-lg">Cancelar</button>
                <button  
                className="mt-4 px-14 py-3 bg-red-900 text-white rounded-lg hover:bg-red-800 ease-in-out transition duration-300 shadow-lg"
                onClick={handleSubmit}
                >Eliminar </button>
            </div>

          </div>

        </div>
     
    </div>
  )
}

export default ModalDeleteDiagram
