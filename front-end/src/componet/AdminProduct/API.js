const BASE_URL = 'http://localhost:8080/api/products';

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

export const addProductAPI = async (formData) => {
  return apiCall(`${BASE_URL}/add`, 'POST', formData);
};

export const updateProductAPI = async (formData) => {
  return apiCall(BASE_URL, 'PUT', formData);
};

export const deleteProductAPI = async (productId) => {
  return apiCall(`${BASE_URL}/${productId}`, 'DELETE');
};

export const getProductAPI = async (productId) => {
  return apiCall(`${BASE_URL}/${productId}`, 'GET');
};

export const getProductsAPI = async () => {
  return apiCall(BASE_URL, 'GET');
};

// Thêm các hàm gọi API khác tại đây nếu cần
