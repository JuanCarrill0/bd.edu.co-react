import React from 'react';
import './messageDetail.css';

function MessageDetail({ message, onClose, onReply }) {
  return (
    <div className="message-detail-background">
      <div className="message-detail">
        <h2>{message.subject || message.asunto}</h2>
        <p><strong>De:</strong> {message.sender || 'Tú'}</p>
        <p><strong>Fecha:</strong> {message.timestamp || message.fechaAccion}</p>
        <p>{message.body || message.cuerpoMensaje}</p>
        {message.destinatarios && (
          <div>
            <strong>Destinatarios:</strong>
            <ul>
              {message.destinatarios.map((dest, i) => (
                <li key={i}>
                  {dest.nombre} ({dest.correo}) - {dest.tipoCopia}
                </li>
              ))}
            </ul>
          </div>
        )}
        <button className="respondMessage" onClick={onReply}>Responder</button>
        <button className="cancelMessage" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

export default MessageDetail;