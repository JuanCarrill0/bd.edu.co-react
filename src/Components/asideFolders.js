import React from 'react';
import './asideFolders.css';

function AsideFolders({ onSelectFolder, onCreateMessage }) {
  return (
    <div className="aside-folders">
      <h2>bd@edu.co</h2>
      <button className="create-message-button" onClick={onCreateMessage}>Redactar</button>
      <ul>
       <li onClick={() => onSelectFolder('enviados')}>Enviados</li>
        <li onClick={() => onSelectFolder('recibidos')}>Recibidos</li>
      </ul>
    </div>
  );
}

export default AsideFolders;