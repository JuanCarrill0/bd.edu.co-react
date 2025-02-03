import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ListMessaje from '../Components/listMessage';
import AsideFolders from '../Components/asideFolders';
import CreateMessage from '../Components/createMessage';
import MessageDetail from '../Components/messageDetail';
import { getinbox, getoutbox } from '../Service/authService';
import './inbox.css';

function Inbox() {
  const [selectedFolder, setSelectedFolder] = useState('recibidos');
  const [isCreatingMessage, setIsCreatingMessage] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [inbox, setInbox] = useState([]);
  const [outbox, setOutbox] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    getInbox(); // Cargar los mensajes recibidos al montar el componente
    getOutbox(); // Cargar los mensajes enviados al montar el componente

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const navigate = useNavigate();

  const getInbox = async () => {
    try {
      const inboxData = await getinbox(user[7]);
      const formattedInbox = inboxData.map((message) => ({
        sender: message[0],       // Nombre del remitente
        subject: message[1],      // Asunto
        body: message[2],         // Cuerpo del mensaje
        timestamp: `${message[3]} ${message[4]}`, // Fecha y hora de envío
      }));
      setInbox(formattedInbox);
    } catch (error) {
      console.error("Error al obtener la bandeja de entrada:", error);
    }
  };

  const getOutbox = async () => {
    try {
      const outboxData = await getoutbox(user[0]);
      const formattedOutbox = outboxData.map((message) => ({
        sender: message[0],       // Nombre del remitente
        subject: message[3],      // Asunto
        body: message[4],         // Cuerpo del mensaje
        timestamp: `${message[5]} ${message[6]}`, // Fecha y hora de envío
      }));
      setOutbox(formattedOutbox); // Corregido: Usar setOutbox
    } catch (error) {
      console.error("Error al obtener la bandeja de salida:", error);
    }
  };

  const messages = {
    recibidos: inbox,
    enviados: outbox,
  };

  const handleOpenMessage = (message) => {
    setSelectedMessage(message);
  };

  const handleCloseMessage = () => {
    setSelectedMessage(null);
  };

  const handleReply = () => {
    setIsCreatingMessage(true);
    setSelectedMessage(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/');
  };

  return (
    <div className="inbox">
      <AsideFolders onSelectFolder={setSelectedFolder} onCreateMessage={() => setIsCreatingMessage(true)} />
      <div className="inbox-content">
        <div className="user-info">
          <span>{user ? user[7] + " -- " : 'Usuario'}</span>
          <span>{currentTime.toLocaleString()}</span>
        </div>
        <h2>{selectedFolder.charAt(0).toUpperCase() + selectedFolder.slice(1)}</h2>
        <ListMessaje messages={messages[selectedFolder]} onOpenMessage={handleOpenMessage} />
        <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
      </div>
      {isCreatingMessage && <CreateMessage onClose={() => setIsCreatingMessage(false)} />}
      {selectedMessage && (
        <MessageDetail
          message={selectedMessage}
          onClose={handleCloseMessage}
          onReply={handleReply}
        />
      )}
    </div>
  );
}

export default Inbox;