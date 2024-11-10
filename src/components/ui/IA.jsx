import React, { useState, useRef, useEffect } from 'react';
import send from '../../images/send.png';
import '../../site.css';
import MessageIASent from './MessageIASent';

const IA = () => {
  const API_KEY = import.meta.env.VITE_API_KEY_CHATGPT;
  const [messages, setMessages] = useState([
    {
      message: "Hola, soy ChatGPT. Si tienes alguna pregunta relacionada a las bases de datos no dudes en preguntarme.",
      sender: "ChatGPT"
    }
  ]);

  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (inputValue.trim() === '') return;

    const newMessage = {
      message: inputValue,
      sender: "user"
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);
    setInputValue('');

    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = '';
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    const systemMessage = {
      role: "system",
      content: "Explica todo como si fuera un principiante en el tema de bases de datos. Todo lo referente a diagramas entidad relación ER darás respuestas utilizando la notación de Chen."
    };

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,
        ...apiMessages
      ]
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      const apiResponseMessage = data.choices[0].message.content;

      setMessages([
        ...chatMessages, 
        {
          message: apiResponseMessage,
          sender: "ChatGPT"
        }
      ]);
    }).catch((error) => {
      console.error("Error fetching data: ", error);
    });
  }

  return (
    <>
      <div className='bg-stone-200 h-2/3 overflow-auto'>
        {messages.map((message, i) => (
          <MessageIASent key={i} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className='flex'>
        <input
          className='ml-5 w-4/5 h-5/6 shadow-lg border border-gray-300 px-6 py-3 rounded-lg focus:outline-none focus:outline-blue-500 focus:shadow-outline'
          placeholder='Pregunta a la IA'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className='' onClick={handleSend}>
          <img src={send} className='h-8 w-8' alt="Send" />
        </button>
      </div>
    </>
  );
}

export default IA;
