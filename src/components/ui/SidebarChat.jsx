import React from 'react'
import { useState, useEffect, useContext } from 'react'
import Chat from './Chat';
import IA from './IA';
import ModalAddColab from './ModalAddColab';
import UserContext from '../../context/UserContext';
import {formatearNombre} from '../../helpers/formatear';
const SidebarChat = ({idRuta}) => {
    const {user} = useContext(UserContext);
    const [botonSeleccionado, setBotonSeleccionado] = useState(null);
    const [usuarios, setUsuarios] = useState([]);
    const [modalActivo, setModalActivo] = useState(false);
    
    useEffect(() =>{
        const usuariosParticipantes = async () => {
          //Obtener los usuarios participantes en el proyecto
      const request = await fetch(`${import.meta.env.VITE_URL_API}${import.meta.env.VITE_URL_RUTAS}/usuarios-participan`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({id:idRuta})
    })
    const usuariosP = request.ok ? await request.json() : await request.text()
    if(request.ok){
    setUsuarios(usuariosP)
    }
    else{
      alertError(usuariosP)
    }
  }
      usuariosParticipantes()
    }, [])
      
    const handleSeleccionarBoton = (boton) => {
      setBotonSeleccionado(boton);
    };

    const abrirModal = () => {
      setModalActivo(true);
    };
  
    const cerrarModal = () => {
      setModalActivo(false);
    };

  return (
    <div className='w-1/3 bg-stone-200 z-50'>
            <div className=' bg-zinc-500 p-4 text-white flex  justify-between mb-5 '>
                
                <button onClick={abrirModal} className='bg-sky-900 px-10 py-2 rounded-lg shadow-lg mx-2'>
                    Compartir
                </button>
                {modalActivo && <ModalAddColab onClose={cerrarModal} idRuta={idRuta}/>}
               
               
                <div className='flex ml-10 font-pragati'>
                  {
                    usuarios.map((u) => (
                      <div   
                      className={`-ml-3 w-10 h-10  flex justify-center items-center bg-${user.id == u.id ? "sky" :Math.round(Math.random()*3) == 1 ? "violet" : "rose" }-900 rounded-full text-white font-semibold text-lg`}
                      key={u.id}
                      >{user.id == u.id ? "Tu" : formatearNombre(u.nombre)}</div>
                    ))
                  }
                </div>
                <div className={` hidden -ml-3 w-10 h-10    bg-rose-900 rounded-full text-white font-semibold text-lg`}></div>
                <div className={`hidden -ml-3 w-10 h-10    bg-violet-900 rounded-full text-white font-semibold text-lg`}></div>
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

          
            {botonSeleccionado === 'Chat' ? <Chat idProject={idRuta}/> : ''}
            {botonSeleccionado === 'IA' ? <IA /> : ''}
      
           
        </div>
  )
}

export default SidebarChat
