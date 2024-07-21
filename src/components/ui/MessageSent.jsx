import React from 'react';
import messageSent from '../../images/messageSent2.png';
import messagefrom from '../../images/messagefrom.png';

const MessageSent = ({ message }) => {
  return (
    <>
      {message.sender === 'user' ? (
        <div className='flex ml-24 mt-5 justify-end'>
          <div className='bg-blue-300 w-auto px-5 py-2 rounded-l-lg rounded-b-lg shadow-lg flex flex-col'>
            {message.message}
          </div>
          <img src={messageSent} className='h-5 w-5 -ml-1' alt="Message Sent Icon" />
        </div>
      ) : (
        <div className='flex ml-4 mr-4 mt-5'>
          <img src={messagefrom} className='h-5 w-5' alt="Message From Icon" />
          <div className='bg-white w-auto px-5 py-2 rounded-r-lg rounded-b-lg shadow-lg flex flex-col'>
            <span className='text-blue-700 font-semibold'>ChatGPT</span>
            {message.message}
          </div>
        </div>
      )}
    </>
  );
}

export default MessageSent;
