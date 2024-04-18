import React from 'react'
import messageSent from '../../images/messageSent2.png'

const MessageSent = () => {
  return (
    <div className='flex ml-24 mt-5 '>
        <div className='bg-blue-300 w-52 px-5 py-2 rounded-l-lg rounded-b-lg shadow-lg flex flex-col'>Hello, este es una prueba de mensaje enviado </div>
        <img src={messageSent} className='h-5 w-5 -ml-1' />
    </div>
  )
}

export default MessageSent
