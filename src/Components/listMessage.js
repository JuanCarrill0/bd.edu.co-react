import React from 'react';
import Messaje from './message';
import './listMessage.css';

function ListMessaje({ messages, onOpenMessage }) {
  return (
    <div className="list-messages">
      {messages.map((message, index) => (
        <div key={index} onClick={() => onOpenMessage(message)}>
          <Messaje
            sender={message.sender}
            subject={message.subject}
            body={message.body}
            timestamp={message.timestamp}
          />
        </div>
      ))}
    </div>
  );
}

export default ListMessaje;