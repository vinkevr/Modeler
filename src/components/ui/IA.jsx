import React from 'react'
import send from '../../images/send.png'
import '../../site.css'
import MessageIA from './MessageIA'

const IA = () => {
  return (
    <>
         <div className=' bg-stone-200 -mt-20 h-5/6 -mb-5 overflow-auto z-[-1]'>
          <div className='mt-24  '>
              <MessageIA />
             
          </div>
        </div>



        <div className='flex'>
            <input className=' ml-5 w-4/5 h-5/6 shadow-lg border border-gray-300 px-6 py-3 rounded-lg focus:outline-none focus:outline-blue-500 focus:shadow-outline'></input>
            <button className=''>
                <img src= {send} className='h-8 w-8'/>
            </button>
        </div>
    </>
  )
}

export default IA
