import React from 'react'

const ModalAccount = ({ isOpen, onClose }) => {
  return (
    <div>
       {isOpen && (
        <div className="fixed inset-0 overflow-y-auto flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-4 rounded-lg z-10">
            <p>Contenido del modal</p>
            <button onClick={onClose} className="mt-4 p-2 bg-blue-500 text-white rounded">Cerrar</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ModalAccount
