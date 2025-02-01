import React from 'react';
import './messageDetail.css';

function MessageDetail({ message, onClose, onReply }) {
  return (
    <div className="message-detail-background">
      <div className="message-detail">
        <h2>{message.subject}</h2>
        <p><strong>De:</strong> {message.sender}</p>
        <p><strong>Fecha:</strong> {message.timestamp}</p>
        <p>{message.body}</p>
        <button onClick={onReply}>Responder</button>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

export default MessageDetail;