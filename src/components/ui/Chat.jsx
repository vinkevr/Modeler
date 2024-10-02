import { useState, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';
import UserContext from '../../context/UserContext';
import send from '../../images/send.png';
import Message from './Message';
import '../../site.css';
import MessageSent from './MessageSent';

const socket = io('http://localhost:6679', {
  transports: ['websocket'] // Forzar el uso de websocket
});

const Chat = ({ idProject }) => {
  const { user } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Traer los mensajes si existen
    const GetMessages = async () => {
      const url = `http://localhost:6679/messages?room=${idProject}`;
      const response = await fetch(url);
      const data = await response.json();
      setMessages(data);
    };
    GetMessages();

    // Añadir al usuario al chatRoom
    socket.emit('joinRoom', idProject);

    // Escuchar mensajes de la room
    const messageListener = ({ message, idUser, userName }) => {
      console.log(`Mensaje recibido: ${message}`);
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: message, userId: idUser, username: userName }
      ]);
    };

    socket.on('message', messageListener);

    // limpiar el socket
    return () => {
      socket.off('message', messageListener);
    };
  }, [idProject]);

  const handleMessage = async () => {
    // Verificar que si se tenga un mensaje
    if (newMessage === '') return;
    console.log(`Mensaje enviado: ${newMessage}`);
    // Enviar el mensaje al servidor
    socket.emit('message', { message: newMessage.trim(), idUser: user.id, userName: user.nombre }, idProject);
    setMessages((prevMessages) => [
      ...prevMessages,
      { content: newMessage, userId: user.id, username: user.nombre }
    ]);
    setNewMessage('');
  };

  return (
    <>
      <div className='bg-stone-200 h-2/3 overflow-auto'>
        {messages.map((message, i) => {
          if (message.userId == user.id) {
            return <MessageSent key={i} message={message} />;
          } else {
            return <Message key={i} message={message} />;
          }
        })}
      </div>
      <form className='flex'>
        <input
          className='ml-5 w-4/5 h-5/6 shadow-lg border border-gray-300 px-6 py-3 rounded-lg focus:outline-none focus:outline-blue-500 focus:shadow-outline'
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />
        <button
          className=''
          onClick={handleMessage}
        >
          <img src={send} className='h-8 w-8' />
        </button>
      </form>
    </>
  );
};

export default Chat;
