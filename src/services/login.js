import axios from 'axios';
const baseUrl = '/api/login';

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(baseUrl, credentials);

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
