import React from 'react';
import './message.css';

function Messaje({ sender, subject, body, timestamp, destinatarios }) {
  return (
    <div className="message">
      <div className="message-header">
        <div className="message-sender">{sender || 'Tú'}</div>
        <div className="message-timestamp">{timestamp}</div>
      </div>
      <div className="message-subject">{subject}</div>
      <div className="message-body">{body}</div>
      {destinatarios && (
        <div className="message-destinatarios">
          <strong>Destinatarios:</strong>
          <ul>
            {destinatarios.map((dest, i) => (
              <li key={i}>
                {dest.nombre} ({dest.correo}) - {dest.tipoCopia}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Messaje;