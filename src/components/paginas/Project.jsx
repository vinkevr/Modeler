import React from 'react'
import select from '../../images/select.png'
import text from '../../images/text.png';
import newicon from '../../images/new.png'
import shape from '../../images/shape.png'
import arrow from '../../images/Arrow.png'
import redo from '../../images/redo.png'
import { useState } from 'react';
import SidebarChat from '../ui/SidebarChat';


const Project = () => {


  return (
    <div className='bg-zinc-800 w-full h-screen flex justify-between'>
        <div className='flex flex-col' >
            <div className='font-pragati text-white text-5xl p-10'>Modeler</div>

            <div className='w-full '>
                <div className='w-1/3 bg-zinc-500 flex flex-col py-5  m-10 rounded-xl items-center hover:opacity-100 opacity-20 ease-in-out transition duration-300 '>
                    <button>
                        <img src={select} className='mb-8 h-8 w-8'/>
                    </button>
                    <button>
                        <img src={text} className='mb-8 h-8 w-8'/>
                    </button>
                    
                    <button>
                        <img src={shape} className='mb-8 h-8 w-8'/>
                    </button>
                    
                    <button>
                        <img src={redo} className='mb-5 h-5 w-8'/>
                    </button>
                </div>
            </div>
        </div>
        


        <div className='bg-zinc-800 w-full'>
             
        </div>

        
        <SidebarChat />

        
    </div>
  )
}

export default Project
