// src/services/ProductoService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/productos'; 

const ProductoService = {
  getAllProductos: async () => {
    try {
      const response = await axios.get(`${API_URL}/traer`);
      return response.data;
    } catch (error) {
      console.error('Error fetching productos:', error);
      throw error;
    }
  },

  deleteProducto: async (id) => {
    try {
      await axios.delete(`${API_URL}/eliminar/${id}`);
    } catch (error) {
      console.error('Error deleting producto:', error);
      throw error;
    }
  },

  createProducto: async (producto) => {
    try {
      await axios.post(`${API_URL}/crear`, producto);
    } catch (error) {
      console.error('Error creating producto:', error);
      throw error; 
    }
  }
};

export default ProductoService;
