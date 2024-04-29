import { useState } from 'react'
import { alertError, alertSuccess } from '../../helpers/alertas'
import firebase from '../../firebase'
const ModalAddColab = ({onClose, idRuta}) => {
  const [email, setEmail] = useState('')
  const handleSubmit = async () => {
    if(email === ''){
      alertError('El email no puede estar vacío')
    }
    const request = await fetch(`${import.meta.env.VITE_URL_API}${import.meta.env.VITE_URL_RUTAS}/user/agregar-colaborador`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({emailUsuario:email, idRuta})
    })
    const response = await request.json()
    if(response.error){
      alertError(response.error)
    }else{
      alertSuccess(response.mensaje)
      //Agrear al usuario en firebase
      console.log("agregando en firebase")
      await firebase.db.collection("usuariosEnProyectos").add({
        idProyecto: idRuta,
        idUsuario: response.idUsuario,
        activo:false,
        email: response.email,
        nombre: response.nombre
      })
      onClose()
    }
    
  }
  return (
    <div>
       
    <div className="fixed inset-0 overflow-y-auto flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-zinc-600 p-16 rounded-lg z-10 w-1/2 ">
        <p className='text-center font-outfit text-xl text-white '>Agregar colaborador</p>
       
        <div className='flex justify-center'>
            <div className="mt-16 w-2/3 mb-10">
                <input
                type="text"
                id="NombreProyecto"
                placeholder='Correo electrónico del colaborador'
                onChange={(e) => setEmail(e.target.value.trim())}
                className="w-full shadow-lg border text-black border-gray-300 px-6 py-3 rounded-lg focus:outline-none focus:outline-blue-500 focus:shadow-outline"
                />
            </div>
        </div>

       
        <div className='flex justify-around mr-16 ml-16 '>
            <button onClick={onClose} className="mt-4 px-14 py-3 bg-red-900 text-white rounded-lg hover:bg-red-800 ease-in-out transition duration-300 shadow-lg">Cancelar</button>
            <button  
            className="mt-4 px-10 py-3 bg-sky-900 text-white rounded-lg hover:bg-sky-800 ease-in-out transition duration-300 shadow-lg"
            onClick={handleSubmit}
            >Añadir al proyecto </button>
        </div>

      </div>
    </div>
 
</div>
  )
}

export default ModalAddColab
