import React from 'react'
import diagram from '../../images/diagram_3.png';
import delete2 from '../../images/delete2.png';
import download2 from '../../images/download2.png';
import ModalDeleteDiagram from './ModalDeleteDiagram';
import { useState } from 'react';

const ProjectCard = () => {

    const [modalActivo, setModalActivo] = useState(false);

    const abrirModal = () => {
      setModalActivo(true);
    };
  
    const cerrarModal = () => {
      setModalActivo(false);
    };
  
  return (
    <>
    {/*
    <div className='w-1/4 m-5  bg-zinc-700 h-44 rounded-lg'>
        <div className='flex justify-end m-5'>
            <img src={delete2} className='h-5 w-5'/>
        </div>
        <div className='  flex flex-col items-center justify-center'>
            <img src={diagram} className='h-20 w-20'/>
            <div className='text-white text-center font-outfit'>
                <p>Farmacia</p>
            </div>
        </div>
    </div>
  */}
    <div className='m-5 bg-zinc-700 h-44 rounded-lg flex flex-col'>
        <button className='ml-auto mt-5 mr-5' onClick={abrirModal}>
            <img src={delete2} className='h-5 w-5' alt='Eliminar' />
        </button>
        <button className='flex flex-col items-center justify-center'>
            <img src={diagram} className='h-20 w-20' alt='Diagrama' />
            <div className='text-white text-center font-outfit'>
            <p>Farmacia</p>
            </div>
        </button>
    

        <button className='ml-auto mr-5'>
            <img src={download2} className='h-5 w-5' alt='descargar' />
        </button>

        {modalActivo && <ModalDeleteDiagram onClose={cerrarModal} />}
    </div>

    </>
  )
}

export default ProjectCard
