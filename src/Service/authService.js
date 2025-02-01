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

export const getContact = async (correoalterno) => {
  try {
    const response = await axios.get(`${API_URL}/api/getContact`, {
      params: { correoalterno }
    });
    return response.data.usuario;
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