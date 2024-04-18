import React from 'react'
import messagefrom from '../../images/messagefrom.png'

const MessageIA = () => {
  return (
    <div className='flex ml-4 mr-4 mt-5 '>
        <img src={messagefrom} className='h-5 w-5' />
        <div className='bg-white w-auto px-5 py-2 rounded-r-lg rounded-b-lg shadow-lg flex flex-col'><span className='text-blue-700 font-semibold'>ChatGPT</span>Para crear una base de datos en MySQL mediante comandos, puedes utilizar la instrucción CREATE DATABASE. Aquí tienes un ejemplo básico:  CREATE DATABASE base_nueva; </div>
    </div>
  )
}

export default MessageIA
