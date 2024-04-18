import React from 'react'

const ModalDeleteDiagram = ({onClose}) => {
  return (
    <div>
       
        <div className="fixed inset-0 overflow-y-auto flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-zinc-600 p-16 rounded-lg z-10 w-1/2 ">
            <p className='text-center font-outfit text-xl text-white '>¿Estás seguro de eliminar este proyecto de tu panel?</p>
           

           
            <div className='flex justify-around mr-16 ml-16 '>
                <button onClick={onClose} className="mt-4 px-14 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-400 ease-in-out transition duration-300 shadow-lg">Cancelar</button>
                <button  className="mt-4 px-14 py-3 bg-red-900 text-white rounded-lg hover:bg-red-800 ease-in-out transition duration-300 shadow-lg">Eliminar </button>
            </div>

          </div>
        </div>
     
    </div>
  )
}

export default ModalDeleteDiagram
