import axios from 'axios';
const API_URL = 'http://localhost:8080/carritos';

const CarritoService = {
  crearCarrito: async (carrito) => {
    try {
      const response = await axios.post(`${API_URL}/guardar`, carrito);
      return response.data; // Retorna el carrito creado
    } catch (error) {
      console.error('Error creando el carrito:', error);
      throw error;
    }
  },
  obtenerCarritoPorId: async (id) => { //esto lo usamos para traer los estados de un carrito en particular
    try {
      const response = await axios.get(`${API_URL}/traer/${id}`);
      return response.data; // Retorna el carrito obtenido
    } catch (error) {
      console.error('Error obteniendo el carrito:', error);
      throw error;
    }
  },
  // Método para obtener todos los carritos
  obtenerCarritos: async () => {
    try {
      const response = await axios.get(`${API_URL}/traer`);
      return response.data; // Retorna los carritos obtenidos
    } catch (error) {
      console.error('Error obteniendo los carritos:', error);
      throw error;
    }
  },

  // Método para eliminar un carrito
  eliminarCarrito: async (id) => {
    try {
      await axios.delete(`${API_URL}/eliminar/${id}`);
      console.log(`Carrito con id ${id} eliminado`);
    } catch (error) {
      console.error('Error eliminando el carrito:', error);
      throw error;
    }
  },
};

export default CarritoService;
