import React, { useState, useEffect } from 'react';
import { getContacts, getContact, sendMessage, saveDestinatario } from '../Service/authService';
import './createMessage.css';

function CreateMessage({ onClose }) {
  const [to, setTo] = useState([]);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));
  const emailUser = user[7];

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const users = await getContacts(emailUser);
        setContacts(users);
        setFilteredContacts(users);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, [emailUser]);

  const handleToChange = (e) => {
    const value = e.target.value;
    if (value) {
      const filtered = contacts.filter(contact =>
        contact[2].toLowerCase().includes(value.toLowerCase())
      );
      setFilteredContacts(filtered);
      setShowDropdown(true);
    } else {
      setFilteredContacts(contacts);
      setShowDropdown(false);
    }
  };

  const handleContactClick = (email) => {
    setTo(prevTo => [...prevTo, email]);
    setShowDropdown(false);
  };

  const handleRemoveContact = (email) => {
    setTo(prevTo => prevTo.filter(contact => contact !== email));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const idUsuario = user[0]; // Asumiendo que el ID del usuario está en la posición 0
    const idMensaje = "002"; // Generar un ID de mensaje único
    const idPais = user[2]; // Asumiendo que el ID del país está en la posición 2
    const idTipoCarpeta = "Env"; // Asumiendo un ID de tipo de carpeta fijo
    const idCategoria = "PRI"; // Asumiendo un ID de categoría fijo
    const fechaAccion = new Date().toISOString().split('T')[0]; // Fecha actual en formato YYYY-MM-DD
    const horaAccion = new Date().toISOString().split('T')[1].split('.')[0]; // Hora actual en formato HH:MM:SS

    try {
      console.log(to[0]);
      // Buscar el contacto en la base de datos
      const contactResult = await getContact(to[0]);

      // Verificar si el contacto existe
      if (!contactResult || contactResult.length === 0) {
        console.error('Contact not found');
        return;
      }

      console.log('Contact found:', contactResult);

      // Enviar el mensaje
      const response = await sendMessage({
        idUsuario,
        idMensaje,
        idPais,
        idTipoCarpeta,
        idCategoria,
        asunto: subject,
        cuerpoMensaje: body,
        fechaAccion,
        horaAccion,
        menIdUsuario: null,
        menIdMensaje: null
      });
      console.log('Message sent successfully:', response);
      console.log('Destinatario:', contactResult[0][0]);
      
      // Guardar el destinatario
      const destinatarioData = {
        idPais,
        idUsuario, // Asumiendo que el ID del usuario está en la posición 0 del contacto
        idMensaje,
        idTipoCopia: "CO", // Asumiendo un ID de tipo de copia fijo
        consecContacto: contactResult[0][0] // Asumiendo que el ID del contacto está en la posición 0 del contacto
      };
      const destinatarioResponse = await saveDestinatario(destinatarioData);
      console.log('Destinatario saved successfully:', destinatarioResponse);

      onClose();
    } catch (error) {
      console.error('Error sending message or saving destinatario:', error);
    }
  };


  return (
    <div className="create-message-background">
      <div className="create-message">
        <form onSubmit={handleSubmit}>
          <h2>Nuevo Mensaje</h2>
          <div className="form-group">
            <label htmlFor="to">Para:</label>
            <div className="to-input">
              {to.map(email => (
                <span key={email} className="to-email">
                  {email}
                  <button type="button" onClick={() => handleRemoveContact(email)}>x</button>
                </span>
              ))}
              <input
                type="text"
                id="to"
                onChange={handleToChange}
                onFocus={() => setShowDropdown(true)}
              />
            </div>
            {showDropdown && (
              <ul className="dropdown">
                {filteredContacts.length > 0 ? (
                  filteredContacts.map((contact) => (
                    <li key={contact[0]} onClick={() => handleContactClick(contact[2])}>
                      {contact[1]} ({contact[2]})
                    </li>
                  ))
                ) : (
                  <li>No contacts found</li>
                )}
              </ul>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="subject">Asunto:</label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="body">Mensaje:</label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </div>
          <button type="submit">Enviar</button>
          <button type="button" onClick={onClose}>Cancelar</button>
        </form>
      </div>
    </div>
  );
}

export default CreateMessage;