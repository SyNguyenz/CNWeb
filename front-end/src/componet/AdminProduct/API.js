// Hàm gọi API để thêm sản phẩm
export const addProduct = async (formData) => {
  try {
    const response = await fetch('http://localhost:8080/api/products/add', {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      throw new Error('Thêm sản phẩm thất bại');
    }
    // console.log(response.json());
    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

// Hàm gọi API để cập nhật sản phẩm
export const updateProduct = async (formData) => {
    try {
      const response = await fetch('http://localhost:8080/api/products', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Cập nhật sản phẩm thất bại');
      }
      return response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  };


  
  // Thêm các hàm gọi API khác tại đây nếu cần
  