import React from 'react'
import add from '../../images/add.png';
import ProjectCard from '../ui/ProjectCard';
import ModalCreateProject from '../ui/ModalCreateProject';
import ModalAccount from '../ui/ModalAccount';
import { useState } from 'react';

const Panel = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpenAcc, setModalOpenAcc] = useState(false);

    const handleOpenModal = () => {
      setModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setModalOpen(false);
    };

    const handleOpenModalAcc = () => {
        setModalOpen(true);
      };
    
      const handleCloseModalAcc = () => {
        setModalOpen(false);
      };

    
  return (
    <div className='bg-zinc-800 w-full h-screen'>  
        <div className='px-40 flex justify-between'>
            <div className='mt-20 font-pragati text-white text-5xl '>Modeler</div>
            <button  onClick={handleOpenModalAcc} className='mt-20 w-10 h-10 bg-blue-500 rounded-full'></button>
            <ModalAccount isOpen={modalOpenAcc} onClose={handleCloseModalAcc} />
        </div> 
        <div className='mb-20'>
            <p className='font-outfit text-white text-center text-2xl mt-5'>Tus proyectos</p>
        </div>

        <div className='flex mx-28'>
            <button  onClick={handleOpenModal}  className='w-1/4 bg-zinc-700 h-44 rounded-lg m-5 flex flex-col items-center justify-center'>
                <img src={add} alt="agregar" className='mb-2' />
                <span className='text-white text-center font-outfit'>
                    Nuevo proyecto
                </span>
            </button>
            <ModalCreateProject isOpen={modalOpen} onClose={handleCloseModal} />

            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            
        </div>
    </div>
  )
}

export default Panel
