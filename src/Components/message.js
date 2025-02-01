import React from 'react';
import './message.css';

function Messaje({ sender, subject, body, timestamp }) {
  return (
    <div className="message">
      <div className="message-header">
        <div className="message-sender">{sender}</div>
        <div className="message-timestamp">{timestamp}</div>
      </div>
      <div className="message-subject">{subject}</div>
      <div className="message-body">{body}</div>
    </div>
  );
}

export default Messaje;