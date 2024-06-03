import React from 'react'
import diagram from '../../images/diagram_3.png';
import delete2 from '../../images/delete2.png';
import download2 from '../../images/download2.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const ProjectCard = ({proyecto, setIdEliminar, abrirModalEliminar}) => {
  
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
    <div
    className='m-5 bg-zinc-700 h-44 rounded-lg flex flex-col items-center hover:-translate-y-2 transition-all ease-in-out duration-500'>
        <button className='ml-auto mt-5 mr-5 z-50' onClick={()=>{
            setIdEliminar(proyecto.id)
            abrirModalEliminar("modalDeleteProject")
        }}>
            <img src={delete2} className='h-5 w-5' alt='Eliminar' />
        </button>
        <Link 
        to={`/project/${proyecto.id}`}>
        <button className='flex flex-col items-center justify-center'>
            <img src={diagram} className='h-20 w-20' alt='Diagrama' />
            <div className='text-white text-center font-outfit'>
            <p>{proyecto.nombre}</p>
            </div>
        </button>
    </Link>
   </div>
    </>
  )
}

export default ProjectCard
