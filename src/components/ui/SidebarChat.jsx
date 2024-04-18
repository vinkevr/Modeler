import React from 'react'
import { useState } from 'react'
import Chat from './Chat';
import IA from './IA';
import ModalAddColab from './ModalAddColab';

const SidebarChat = () => {

    const [botonSeleccionado, setBotonSeleccionado] = useState(null);
      
    const handleSeleccionarBoton = (boton) => {
      setBotonSeleccionado(boton);
    };

    const [modalActivo, setModalActivo] = useState(false);

    const abrirModal = () => {
      setModalActivo(true);
    };
  
    const cerrarModal = () => {
      setModalActivo(false);
    };

  return (
    <div className='w-1/3 bg-stone-200'>
            <div className=' bg-zinc-500 p-4 text-white flex justify-evenly mb-5'>
                <button onClick={abrirModal} className='bg-sky-900 px-10 py-2 rounded-lg shadow-lg mx-2'>
                    Compartir
                </button>
                {modalActivo && <ModalAddColab onClose={cerrarModal} />}
                <div className='flex ml-10 '>
                    <div className='w-10 h-10 -ml-5 bg-blue-500 rounded-full'></div>
                    <div className='w-10 h-10 -ml-5 bg-orange-600 rounded-full'></div>
                    <div className='w-10 h-10 ml-5 bg-yellow-600 rounded-full'></div>
                </div>
            </div>

            <div className='flex z-40'>
                <button
                    className={`bg-${botonSeleccionado === 'IA' ? 'sky-900' : 'white'} transition ease-in-out duration-300 shadow-xl mt-5 ml-8 w-36 py-2 rounded-lg font-medium text-${
                    botonSeleccionado === 'IA' ? 'white' : 'black'
                    }`}
                    onClick={() => handleSeleccionarBoton('IA')}
                >
                    IA
                </button>

                <button
                    className={`bg-${botonSeleccionado === 'Chat' ? 'sky-900' : 'white'} transition ease-in-out duration-300 shadow-xl mt-5 -ml-3 w-36 py-2 font-medium rounded-lg text-${
                    botonSeleccionado === 'Chat' ? 'white' : 'black'
                    }`}
                    onClick={() => handleSeleccionarBoton('Chat')}
                >
                    Chat
                </button>

            </div>

          
            {botonSeleccionado === 'Chat' ? <Chat /> : ''}
            {botonSeleccionado === 'IA' ? <IA /> : ''}
      
           
        </div>
  )
}

export default SidebarChat
