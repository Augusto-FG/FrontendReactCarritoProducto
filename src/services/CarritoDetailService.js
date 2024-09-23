// src/services/CarritoDetailService.js

import axios from 'axios';

const API_URL = 'http://localhost:8080/detalle'; 

const CarritoDetailService = {
  // Guardar el carrito y los productos seleccionados, y cierra el carrito (estado)
  cerrarCarrito: async (carritoId, productosSeleccionados) => {
    return await axios.post(`${API_URL}/cerrar`, { carritoId, productos: productosSeleccionados.map(p => p.id) });
  },

  // Agregar producto al carrito
  addProducto: async (carritoId, productoId) => {
    return await axios.post(`${API_URL}/guardar`, { carritoId, productoId });
  },

  // Obtener los productos de un carrito específico
  getProductosByCarritoId: async (carritoId) => {
    const response = await axios.get(`${API_URL}/carrito/${carritoId}`);
    return response.data;
  },

  // Eliminar producto del carrito
  eliminarProductoDelCarrito: async (carritoId, productoId) => {
    return await axios.delete(`${API_URL}/eliminar`, {
      data: { carritoId, productoId }
    });
  }
};

export default CarritoDetailService;

