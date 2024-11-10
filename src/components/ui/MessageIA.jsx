import React from 'react';
import messagefrom from '../../images/messagefrom.png';

const MessageIA = ({ message }) => {
  return (
    <div className='flex ml-4 mr-4 mt-5 '>
      <img src={messagefrom} className='h-5 w-5' alt="ChatGPT" />
      <div className='bg-white w-auto px-5 py-2 rounded-r-lg rounded-b-lg shadow-lg flex flex-col'>
        <span className='text-blue-700 font-semibold'>ChatGPT</span>
        <span>{message.message}</span>
      </div>
    </div>
  );
}

export default MessageIA;