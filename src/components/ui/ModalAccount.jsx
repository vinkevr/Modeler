import React from 'react'
import delete2 from '../../images/delete2.png';

const ModalAccount = ({nombre, onClose}) => {
  return (
    <div>
  
        <div className="fixed inset-0 overflow-y-auto flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          
          <div className="bg-zinc-700 pb-8 pl-8 pr-8 rounded-lg z-10 flex ml-auto mr-40 mb-auto mt-28">

            <div className=''>
            <button className='flex mb-auto ml-auto mt-3 -mr-5' onClick={onClose}>
            <img src={delete2} className='h-5 w-5' alt='Eliminar' />
            </button>

            <span className='font-semibold text-white flex justify-center mt-5'>{nombre}</span>

            <button className="mt-10 px-4 py-2 bg-red-800 text-white rounded">Cerrar sesión</button>
            </div>

          </div>
        
        </div>
    
    </div>
  )
}

export default ModalAccount
