import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/product";

export const fetchProducts = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

export const updateProduct = async (id, updatedProduct) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, updatedProduct);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const createProduct = async (newProduct) => {
  try {
    const response = await axios.post(API_BASE_URL, newProduct);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};
