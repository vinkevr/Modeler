import React from 'react'
import send from '../../images/send.png'
import Message from './Message'
import '../../site.css'
import MessageIA from './MessageIA'
import MessageSent from './MessageSent'

const Chat = () => {

  

  return (
    <>  
      
      <div className='bg-stone-200 h-2/3 overflow-auto'>
       
            <Message />
            <Message />
            <MessageSent />
            <Message />
            <Message />
            <Message />
        
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

export default Chat
