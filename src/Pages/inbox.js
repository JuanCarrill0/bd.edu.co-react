import React, { useState, useEffect } from 'react';
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

  const getInbox = async () => {
    try {
      const inboxData = await getinbox(user[7]);
      const formattedInbox = inboxData.map((message) => ({
        sender: message[4],       // Nombre del remitente
        subject: message[0],      // Asunto
        body: message[1],         // Cuerpo del mensaje
        timestamp: `${message[3]}`, // Fecha y hora de envío
      }));
      setInbox(formattedInbox);
      console.log(formattedInbox);
    } catch (error) {
      console.log("Bandeja vacia o error al obtener la bandeja de salida:", error);
    }
  };

  const getOutbox = async () => {
    try {
      const outboxData = await getoutbox(user[0]);
      const formattedOutbox = outboxData.map((message) => ({
        idMensaje: message.idMensaje,
        asunto: message.asunto,
        cuerpoMensaje: message.cuerpoMensaje,
        fechaAccion: message.fechaAccion,
        horaAccion: message.horaAccion,
        destinatarios: message.destinatarios.map((dest) => ({
          nombre: dest.nombre,
          correo: dest.correo,
          tipoCopia: dest.tipoCopia,
        })),
      }));
      setOutbox(formattedOutbox);
    } catch (error) {
      console.log("Bandeja vacía o error al obtener la bandeja de salida:", error);
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