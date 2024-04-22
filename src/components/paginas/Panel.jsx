import React from 'react'
import add from '../../images/add.png';
import ProjectCard from '../ui/ProjectCard';
import ModalCreateProject from '../ui/ModalCreateProject';
import ModalAccount from '../ui/ModalAccount';
import ModalDeleteDiagram from '../ui/ModalDeleteDiagram';
import { useState, useContext, useEffect } from 'react';
import UserContext from '../../context/UserContext';
import { alertError, alertWarning, alertSuccess } from '../../helpers/alertas';
import { formatearNombre } from '../../helpers/formatear';

const Panel = () => {
  const {user} = useContext(UserContext);
  const [modalActivo, setModalActivo] = useState(null);
  const [proyectos, setProyectos] = useState([]);
  const [idEliminar, setIdEliminar] = useState(null);
  const abrirModal = (modal) => {
    setModalActivo(modal);
  };

  const cerrarModal = () => {
    setModalActivo(null);
  };

  useEffect(() => {
    const obtenerProyectos = async () => {
      const url = `${import.meta.env.VITE_URL_API}${import.meta.env.VITE_URL_USER}/proyectos/${user.id}`
      const token = localStorage.getItem('token')
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
      const data = await response.json()
      setProyectos(data)
    }
    obtenerProyectos()
  }, [])
    
  return (
    <div className='bg-zinc-800 w-full h-screen'>  
      
        <div className='px-40 flex justify-between'>
            <div className='mt-16 font-pragati text-white text-5xl'>Modeler</div>
            <button onClick={() => abrirModal('modalAccount')} className='mt-16 w-10 h-10 ml-auto bg-blue-500 rounded-full text-white font-semibold text-lg'>{formatearNombre(user.nombre)}</button>
        </div> 
        <div className='mb-20'>
            <p className='font-outfit text-white text-center text-2xl mt-5'>Tus proyectos</p>
        </div>
  

        <div className='grid grid-cols-4 mx-28 pb-5'>
            <button onClick={() => abrirModal('modalCreateProject')}  className='bg-zinc-700 h-44 rounded-lg m-5 flex flex-col items-center justify-center'>
                <img src={add} alt="agregar" className='mb-2' />
                <span className='text-white text-center font-outfit'>
                    Nuevo proyecto
                </span>
                
            </button>
           {
            proyectos.length === 0 ? 
            (
              <p className='font-outfit text-white text-center text-2xl mt-5'>Opps! aun tienes no proyectos</p>
            )
            : proyectos.map((proyecto) => {
              return <ProjectCard key={proyecto.id} abrirModalEliminar={abrirModal} proyecto={proyecto} setIdEliminar={setIdEliminar} onButtonClick={() => abrirModal('modalFromProjectCard')}/>
            })
           }
           
           
        </div>
        {modalActivo === 'modalAccount' && <ModalAccount nombre={user.nombre} onClose={cerrarModal} />}
        {modalActivo === 'modalCreateProject' && <ModalCreateProject proyectos={proyectos} setProyectos={setProyectos} onClose={cerrarModal} />}
        {modalActivo === 'modalDeleteProject' && <ModalDeleteDiagram proyectos={proyectos} setProyectos={setProyectos} id={idEliminar} onClose={cerrarModal} />}
    </div>
  )
}

export default Panel
