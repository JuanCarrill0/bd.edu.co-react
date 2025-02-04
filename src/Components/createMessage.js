import React, { useState, useEffect } from 'react';
import { getContacts, getContact, sendMessage, saveDestinatario, createContact, addAdjuntos } from '../Service/authService';
import './createMessage.css';

function CreateMessage({ onClose }) {
  const [to, setTo] = useState([]);
  const [cc, setCC] = useState([]);
  const [coo, setCOO] = useState([]);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [showDropdownTO, setShowDropdownTO] = useState(false);
  const [showDropdownCC, setShowDropdownCC] = useState(false);
  const [showDropdownCOO, setShowDropdownCOO] = useState(false);
  const [attachments, setAttachments] = useState([]);

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

  const handleToChange = (e,setRecipients) => {
    const value = e.target.value;
    if (value) {
      const filtered = contacts.filter(contact =>
        contact[2].toLowerCase().includes(value.toLowerCase())
      );
      setFilteredContacts(filtered);

    } else {
      setFilteredContacts(contacts);
      setShowDropdownTO(false);
      setShowDropdownCC(false);
      setShowDropdownCOO(false);
    }
  console.log(to);
  console.log(cc);
  console.log(coo);
  };

  const handleKeyDown = (e, method) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const value = e.target.value.trim();
      switch (method) {
        case 1:
          addto(value);
          break;
        case 2:
          addcc(value);
          break;
        case 3:
          addcoo(value);
          break;
      }
      e.target.value = ''; // Clear the input
      setFilteredContacts([]); // Clear the filtered contacts
      setShowDropdownTO(false);
      setShowDropdownCC(false);
      setShowDropdownCOO(false); // Hide the dropdown
      // if (value && !to.includes(value) && !cc.includes(value) && !coo.includes(value)) {
      //   setRecipients(prevRecipients => [...prevRecipients, value]);
      //   e.target.value = ''; // Clear the input
      //   setFilteredContacts([]); // Clear the filtered contacts
      //   setShowDropdown(false); // Hide the dropdown
      // }
    }
  console.log(to);
  console.log(cc);
  console.log(coo);
  console.log(method);
  };
  
  const handleContactClick = (email, method) => {
    switch (method) {
      case 1:
        addto(email);
        break;
      case 2:
        addcc(email);
        break;
      case 3:
        addcoo(email);
        break;
    }
    // if (!to.includes(email) && !cc.includes(email) && !coo.includes(email)) {
    //   setRecipients(prevRecipients => [...prevRecipients, email]);
    // }
    setFilteredContacts([]); // Clear the filtered contacts
    setShowDropdownTO(false);
    setShowDropdownCC(false);
    setShowDropdownCOO(false); // Hide the dropdown

    console.log(to);
    console.log(cc);
    console.log(coo);
    console.log(method);
  };

  const addto = (email) => {
    if (!to.includes(email) && !cc.includes(email) && !coo.includes(email)) {
      setTo(prevRecipients => [...prevRecipients, email]);
    }
    if (to.includes(email)) {
      setTo(prevRecipients => prevRecipients.filter(contact => contact !== email));
    }
  };

  const addcc = (email) => {
    if (!to.includes(email) && !cc.includes(email) && !coo.includes(email)) {
      setCC(prevRecipients => [...prevRecipients, email]);
    }
    if (cc.includes(email)) {
      setCC(prevRecipients => prevRecipients.filter(contact => contact !== email));
    }
  };

  const addcoo = (email) => {
    if (!to.includes(email) && !cc.includes(email) && !coo.includes(email)) {
      setCOO(prevRecipients => [...prevRecipients, email]);
    }
    if (coo.includes(email)) {
      setCOO(prevRecipients => prevRecipients.filter(contact => contact !== email));
    }
  };



  const handleRemoveContact = (email, method) => {
    switch (method) {
      case 1:
        addto(email);
        break;
      case 2:
        addcc(email);
        break;
      case 3:
        addcoo(email);
        break;
    }
    // setRecipients(prevRecipients => prevRecipients.filter(contact => contact !== email));
  };

  const handleRemoveAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };
  

  const generateRandomMessageId = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = Math.floor(Math.random() * 5) + 1; // Random length between 1 and 5
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const idUsuario = user[0]; // Asumiendo que el ID del usuario está en la posición 0
    const idPais = user[2]; // Asumiendo que el ID del país está en la posición 2
    const idTipoCarpeta = "Env"; // Asumiendo un ID de tipo de carpeta fijo
    const idCategoria = "PRI"; // Asumiendo un ID de categoría fijo
    const fechaAccion = new Date().toISOString().split('T')[0]; // Fecha actual en formato YYYY-MM-DD
    const horaAccion = new Date().toISOString().split('T')[1].split('.')[0]; // Hora actual en formato HH:MM:SS
    const idMensaje = generateRandomMessageId(); // Generar un ID de mensaje aleatorio (único para todos los destinatarios)
  
    console.log(user);
    console.log(idUsuario);
  
    try {
      // Enviar el mensaje una sola vez
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
        menIdMensaje: null,
      });
      console.log('Message sent successfully:', response);
  
      // Función para guardar destinatarios
      const saveRecipients = async (recipients, idTipoCopia) => {
        for (const recipient of recipients) {
          console.log(recipient);
          // Buscar el contacto en la base de datos
          let contactResult;
          try {
            contactResult = await getContact(recipient, idUsuario);
            console.log('Contact found:', contactResult);
          } catch (error) {
            if (error.response && error.response.status === 404) {
              console.log('Contact not found, creating new contact');
              await createContact(recipient, idUsuario);
              // Vuelve a buscar el contacto después de crearlo
              contactResult = await getContact(recipient, idUsuario);
            } else {
              throw error;
            }
          }
          console.log('Contact found or created:', contactResult);
  
          if (contactResult.usuario !== 0 || contactResult.usuario.length > 0) {
            // Guardar el destinatario
            const destinatarioData = {
              idPais,
              idUsuario,
              idMensaje, // Usar el mismo idMensaje para todos los destinatarios
              idTipoCopia, // Tipo de copia (CO o COO)
              consecContacto: contactResult[0][0], // ID del contacto
            };
            console.log('Destinatario:', destinatarioData);
            const destinatarioResponse = await saveDestinatario(destinatarioData);
            console.log('Destinatario saved successfully:', destinatarioResponse);
          }
        }
      };
  
      // Guardar destinatarios principales (TO)
      await saveRecipients(to, "CO");
  
      // Guardar destinatarios de copia (CC)
      await saveRecipients(cc, "CO");
  
      // Guardar destinatarios de copia oculta (CCO)
      await saveRecipients(coo, "COO");
  
      // Enviar archivos adjuntos (si existen)
      if (attachments.length > 0) {
        const formData = new FormData();
        formData.append('idUsuario', idUsuario);
        formData.append('idMensaje', idMensaje);
        attachments.forEach((file, index) => {
          formData.append("attachments", file);
        });
        console.log('adjunto', formData);
        const adjuntoData = await addAdjuntos(formData);
        if (adjuntoData) {
          console.log("Adjunto agregado correctamente");
        } else {
          console.log("Error al agregar adjunto");
        }
      }
  
      onClose(); // Cerrar el modal después de enviar el mensaje
    } catch (error) {
      console.error('Error sending message or saving destinatario:', error);
    }
  };

return (
  <div className="create-message-background">
    <div className="create-message">
      <form onSubmit={handleSubmit}>
        <h2>Nuevo Mensaje</h2>

        {/* Sección Para: */}
        <div className="form-group">
          <label htmlFor="to">Para:</label>
          <div className="to-input">
            {to.map((email, index) => (
              <div key={`${email}-${index}`} className="to-email">
                {email}
                <button type="button" className='buttonDelete' onClick={() => handleRemoveContact(email, 1)}>x</button>
              </div>
            ))}
            <input
              type="text"
              id="to"
              onChange={(e) => handleToChange(e, 1)}
              onKeyDown={(e) => handleKeyDown(e, 1)}
              onFocus={(e) => {
                if (!e.target.value) {
                  setFilteredContacts(contacts);
                  setShowDropdownTO(true);
                }
              }}
            />
          </div>
          {showDropdownTO && (
            <ul className="dropdown">
              {filteredContacts.length > 0 ? (
                filteredContacts.map((contact) => (
                  <li key={contact[0]} onClick={() => handleContactClick(contact[2], 1)}>
                    {contact[1]} ({contact[2]})
                  </li>
                ))
              ) : (
                <li>No contacts found</li>
              )}
            </ul>
          )}
        </div>

        {/* Sección CC (Copia): */}
        <div className="form-group">
          <label htmlFor="cc">CC (Copia):</label>
          <div className="cc-input">
            {cc.map((email, index) => (
              <div key={`${email}-${index}`} className="cc-email">
                {email}
                <button type="button" className='buttonDelete' onClick={() => handleRemoveContact(email, 2)}>x</button>
              </div>
            ))}
            <input
              type="text"
              id="cc"
              onChange={(e) => handleToChange(e, 2)}
              onKeyDown={(e) => handleKeyDown(e, 2)}
              onFocus={(e) => {
                if (!e.target.value) {
                  setFilteredContacts(contacts);
                  setShowDropdownCC(true);
                }
              }}
            />
          </div>
          {showDropdownCC && (
            <ul className="dropdown">
              {filteredContacts.length > 0 ? (
                filteredContacts.map((contact) => (
                  <li key={contact[0]} onClick={() => handleContactClick(contact[2], 2)}>
                    {contact[1]} ({contact[2]})
                  </li>
                ))
              ) : (
                <li>No contacts found</li>
              )}
            </ul>
          )}
        </div>

        {/* Sección CCO (Copia Oculta): */}
        <div className="form-group">
          <label htmlFor="coo">CCO (Copia Oculta):</label>
          <div className="coo-input">
          {coo.map((email, index) => (
              <div key={`${email}-${index}`} className="coo-email">
                {email}
                <button type="button" className='buttonDelete' onClick={() => handleRemoveContact(email, 3)}>x</button>
              </div>
            ))}
            <input
              type="text"
              id="coo"
              onChange={(e) => handleToChange(e, 3)}
              onKeyDown={(e) => handleKeyDown(e, 3)}
              onFocus={(e) => {
                if (!e.target.value) {
                  setFilteredContacts(contacts);
                  setShowDropdownCOO(true);
                }
              }}
            />
          </div>
          {showDropdownCOO && (
            <ul className="dropdown">
              {filteredContacts.length > 0 ? (
                filteredContacts.map((contact) => (
                  <li key={contact[0]} onClick={() => handleContactClick(contact[2], 3)}>
                    {contact[1]} ({contact[2]})
                  </li>
                ))
              ) : (
                <li>No contacts found</li>
              )}
            </ul>
          )}
        </div>

        {/* Resto del formulario (Asunto y Mensaje) */}
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
        <div className="form-group">
          <label htmlFor="attachments">Adjuntar Archivo:</label>
          <input
            type="file"
            id="attachments"
            multiple
            onChange={(e) => setAttachments([...attachments, ...e.target.files])}
          />
            <ul>
              {attachments.map((file, index) => {
                const fileName = file.name;
                const fileExtension = fileName.substring(fileName.lastIndexOf('.'));
                const truncatedName = fileName.length > 30 ? `${fileName.substring(0, 30 - fileExtension.length)}${fileExtension}` : fileName;
                return (
                  <li key={index}>
                    {truncatedName}
                    <button type="button" onClick={() => handleRemoveAttachment(index)}>x</button>
                  </li>
                );
              })}
            </ul>
        </div>

        {/* Botones de enviar y cancelar */}
        <button type="submit">Enviar</button>
        <button type="button" onClick={onClose}>Cancelar</button>
      </form>
    </div>
  </div>
);
}

export default CreateMessage;