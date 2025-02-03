import React, { useState } from 'react';
import Messaje from './message';
import './listMessage.css';

function ListMessaje({ messages, onOpenMessage }) {
  const [currentPage, setCurrentPage] = useState(1);
  const messagesPerPage = 7;

  // Calcular los mensajes que se deben mostrar en la página actual
  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = messages.slice(indexOfFirstMessage, indexOfLastMessage);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(messages.length / messagesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="list-messages">
      {currentMessages.map((message, index) => (
        <div key={index} onClick={() => onOpenMessage(message)}>
          <Messaje
            sender={message.sender}
            subject={message.subject}
            body={message.body}
            timestamp={message.timestamp}
          />
        </div>
      ))}
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Anterior
        </button>
        <span>Pagina {currentPage} de {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default ListMessaje;