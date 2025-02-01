import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import ListMessaje from '../Components/listMessage';
import AsideFolders from '../Components/asideFolders';
import CreateMessage from '../Components/createMessage';
import MessageDetail from '../Components/messageDetail';
import './inbox.css';

function Inbox() {
  const [selectedFolder, setSelectedFolder] = useState('recibidos');
  const [isCreatingMessage, setIsCreatingMessage] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const [currentTime, setCurrentTime] = useState(new Date());
  
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const navigate = useNavigate();

  const messages = {
    recibidos: [
      {
        sender: 'Juan Pérez',
        subject: 'Recordatorio de reunión',
        body: 'No olvides la reunión de mañana a las 10am.',
        timestamp: '10:30 AM',
      },
      {
        sender: 'Ana Gómez',
        subject: 'Actualización del proyecto',
        body: 'El proyecto está en marcha y se completará a finales de la semana.',
        timestamp: '9:15 AM',
      },
    ],
    enviados: [
      {
        sender: 'Tú',
        subject: 'Seguimiento',
        body: 'Solo haciendo un seguimiento de nuestra conversación anterior.',
        timestamp: '11:00 AM',
      },
    ]
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
    // Eliminar información de sesión
    localStorage.removeItem('userToken'); // Ejemplo de eliminación de token de sesión
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