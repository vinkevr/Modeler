import React from 'react'
import messagefrom from '../../images/messagefrom.png'

const Message = () => {
  return (
    <div className='flex ml-4 mt-5 mb-5 '>
        <img src={messagefrom} className='h-5 w-6' />
        <div className='bg-white w-52 px-5 py-2 rounded-r-lg rounded-b-lg shadow-lg flex flex-col'><span className='text-red-700 font-semibold'>Jorge</span>Holaaa, este es un mensajeeeeeeeeeeee, pruebaaaaa</div>
    </div>
  )
}

export default Message
