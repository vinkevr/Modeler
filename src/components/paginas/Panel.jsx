import React from 'react'
import add from '../../images/add.png';
import ProjectCard from '../ui/ProjectCard';
import ModalCreateProject from '../ui/ModalCreateProject';
import ModalAccount from '../ui/ModalAccount';
import { useState } from 'react';


const Panel = () => {

  const [modalActivo, setModalActivo] = useState(null);

  const abrirModal = (modal) => {
    setModalActivo(modal);
  };

  const cerrarModal = () => {
    setModalActivo(null);
  };


    
  return (
    <div className='bg-zinc-800 w-full h-auto'>  
      
        <div className='px-40 flex justify-between'>
            <div className='mt-16 font-pragati text-white text-5xl'>Modeler</div>
            <button onClick={() => abrirModal('modalAccount')} className='mt-16 w-10 h-10 ml-auto bg-blue-500 rounded-full'></button>
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
           
           
            <ProjectCard onButtonClick={() => abrirModal('modalFromProjectCard')}/>
            <ProjectCard onButtonClick={() => abrirModal('modalFromProjectCard')}/>
            <ProjectCard onButtonClick={() => abrirModal('modalFromProjectCard')}/>
            <ProjectCard onButtonClick={() => abrirModal('modalFromProjectCard')}/>
            <ProjectCard onButtonClick={() => abrirModal('modalFromProjectCard')}/>
            <ProjectCard onButtonClick={() => abrirModal('modalFromProjectCard')}/>
            <ProjectCard onButtonClick={() => abrirModal('modalFromProjectCard')}/>
            <ProjectCard onButtonClick={() => abrirModal('modalFromProjectCard')}/>
           
           
        </div>
        {modalActivo === 'modalAccount' && <ModalAccount onClose={cerrarModal} />}
        {modalActivo === 'modalCreateProject' && <ModalCreateProject onClose={cerrarModal} />}
        
    </div>
  )
}

export default Panel
