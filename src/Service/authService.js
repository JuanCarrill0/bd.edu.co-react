import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getContacts = async (email) => {
  try {
    const response = await axios.get(`${API_URL}/api/getContacts`, {
      params: { email }
    });
    return response.data.contacts;
  } catch (error) {
    throw error;
  }
};

export const createContact = async (correo, idUsuario) => {
  try {
    const response = await axios.post(`${API_URL}/api/createContact`, { correo, idUsuario });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUser = async (correoalterno) => {
  try {
    const response = await axios.get(`${API_URL}/api/getUser`, {
      params: { correoalterno }
    });
    return response.data.usuario;
  } catch (error) {
    throw error;
  }
};

export const getContact = async (correoalterno, idUsuario) => {
  try {
    const response = await axios.get(`${API_URL}/api/getContact`, {
      params: { correoalterno, idUsuario }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendMessage = async (messageData) => {
  try {
    const response = await axios.post(`${API_URL}/api/sendMessage`, messageData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// New function to save destinatario
export const saveDestinatario = async (destinatarioData) => {
  try {
    const response = await axios.post(`${API_URL}/api/destinatario`, destinatarioData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMessages = async (userId, folder) => {
  try {
    const response = await axios.get(`${API_URL}/api/getMessages`, {
      params: {
         userId, 
         folder // 'recibidos' o 'enviados'
        }
    });
    return response.data.messages;
  } catch (error) {
    throw error;
  }
}

export const getinbox = async (correoalterno) => {
  try {
    const response = await axios.get(`${API_URL}/api/recibidos`, {
      params: { correoContacto : correoalterno}
    });
    console.log(response.data.inbox);
    return response.data.inbox;
  } catch (error) {
    throw error;
  }
}

export const getoutbox = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/api/enviados`, {
      params: { idUsuario: userId}
    });
    console.log(response.data.inbox);
    return response.data.inbox;
  } catch (error) {
    throw error;
  }
}

export const addAdjuntos = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/api/adjuntos`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}