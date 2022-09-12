import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

export const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const createBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };

  try {
    const response = await axios.post(baseUrl, newBlog, config);

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const likeBlog = async (likedBlog) => {
  try {
    const response = await axios.put(`${baseUrl}/${likedBlog.id}`, likedBlog);

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const removeBlog = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  };

  try {
    await axios.delete(`${baseUrl}/${blogId}`, config);
  } catch (error) {
    throw new Error(error);
  }
};
