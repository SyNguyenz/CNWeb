const BASE_URL = 'http://localhost:8080/api/users';

const handleResponse = async (response) => {
  const text = await response.text();
  const data = text ? JSON.parse(text) : {};
  if (!response.ok) {
    const error = data.message || response.statusText;
    throw new Error(error);
  }
  return data;
};

const apiCall = async (url, method, body = null) => {
  try {
    const options = {
      method,
    };
    if (body) {
      options.body = body;
    }
    const response = await fetch(url, options);
    return handleResponse(response);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteUserAPI = async (userId) => {
  return apiCall(`${BASE_URL}/${userId}`, 'DELETE');
};

export const getUserAPI = async (userId) => {
  return apiCall(`${BASE_URL}/${userId}`, 'GET');
};

export const getUsersAPI = async () => {
  return apiCall(BASE_URL, 'GET');
};

