import { useState, useEffect } from 'react';
import { Box, Button, Typography, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid } from '@mui/material';
import ProductoService from '../services/ProductService';
import CarritoService from '../services/CarritoService';
import CarritoDetailService from '../services/CarritoDetailService';
import { useParams, useNavigate } from 'react-router-dom';
import ButtonHome from '../components/ButtonHome';

const CarritoDetail = () => {
  const { carritoId } = useParams();
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [total, setTotal] = useState(0);
  const [carrito, setCarrito] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const productosData = await ProductoService.getAllProductos();
        setProductos(productosData);
      } catch (error) {
        console.error('Error fetching productos:', error);
      }
    };

    const fetchProductosSeleccionados = async () => {
      try {
        const productosCarrito = await CarritoDetailService.getProductosByCarritoId(carritoId);
        setProductosSeleccionados(productosCarrito);
        setTotal(productosCarrito.reduce((acc, producto) => acc + producto.precio, 0));
      } catch (error) {
        console.error('Error fetching productos del carrito:', error);
      }
    };

    const fetchCarrito = async () => {
      try {
        const carritoData = await CarritoService.obtenerCarritoPorId(carritoId);
        setCarrito(carritoData);
      } catch (error) {
        console.error('Error fetching carrito:', error);
      }
    };

    fetchProductos();
    fetchProductosSeleccionados();
    fetchCarrito();
  }, [carritoId]);

  const handleSelectProducto = async (producto) => {
    if (!productosSeleccionados.find((item) => item.id === producto.id)) {
      await CarritoDetailService.addProducto(carritoId, producto.id);
      setProductosSeleccionados([...productosSeleccionados, producto]);
      setTotal(total + producto.precio);
    }
  };

  const handleRemoveProducto = async (producto) => {
    try {
      await CarritoDetailService.eliminarProductoDelCarrito(carritoId, producto.id);
      const updatedProductos = productosSeleccionados.filter((item) => item.id !== producto.id);
      setProductosSeleccionados(updatedProductos);
      setTotal(total - producto.precio);
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  const handleGuardarCarrito = async () => {
    try {
      await CarritoDetailService.cerrarCarrito(carritoId, productosSeleccionados);
      alert('Carrito guardado y cerrado');
    } catch (error) {
      console.error('Error saving carrito:', error);
    }
  };

  const handleVolverListaCarritos = () => {
    navigate('/ver-carritos');
  };

  const calcularDescuentos = () => {
    let descuentos = [];
    let totalDescuento = 0;

    if (productosSeleccionados.length === 4) {
      const descuentoGeneral = total * 0.25; // 25%
      totalDescuento += descuentoGeneral;
      descuentos.push(`Descuento general de 25% por 4 productos: -$${descuentoGeneral.toFixed(2)}`);
    } else if (productosSeleccionados.length > 10) {
      if (carrito.tipo === 'COMUN') {
        totalDescuento += 100;
        descuentos.push(`Descuento de $100 por más de 10 productos (tipo COMUN)`);
      } else if (carrito.tipo === 'FECHA_ESPECIAL') {
        totalDescuento += 300;
        descuentos.push(`Descuento de $300 por más de 10 productos (tipo FECHA_ESPECIAL)`);
      } else if (carrito.tipo === 'VIP') {
        const precioMinimo = Math.min(...productosSeleccionados.map(p => p.precio));
        totalDescuento += 500 + precioMinimo; // Bonificamos el producto más barato
        descuentos.push(`Descuento de $500 y bonificación del producto más barato por más de 10 productos (tipo VIP)`);
      }
    }

    return { totalDescuento, descuentos };
  };

  const { totalDescuento, descuentos } = calcularDescuentos();
  const totalFinal = total - totalDescuento;

  return (
    <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f4f8', padding: 4 }}>
      <Grid container spacing={4}>
        {/* Lista de Productos */}
        <Grid item xs={12} md={6} sx={{ maxHeight: '80vh', overflowY: 'auto' }}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div" sx={{ marginBottom: 2 }}>Lista de Productos</Typography>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell align="center">Nombre</TableCell>
                      <TableCell align="center">Precio</TableCell>
                      <TableCell align="center">Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {productos.map((producto) => (
                      <TableRow key={producto.id}>
                        <TableCell>{producto.id}</TableCell>
                        <TableCell align="center">{producto.descripcion}</TableCell>
                        <TableCell align="center">${producto.precio}</TableCell>
                        <TableCell align="center">
                          <Button variant="contained" color="primary" onClick={() => handleSelectProducto(producto)}>
                            Seleccionar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Detalle del Carrito Seleccionado */}
        <Grid item xs={12} md={6} sx={{ maxHeight: '80vh', overflowY: 'auto' }}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div" sx={{ marginBottom: 2 }}>
                Detalle del carrito seleccionado
              </Typography>
              {carrito && (
                <>
                  <Typography>ID del Carrito: <strong>{carrito.id}</strong></Typography>
                  <Typography>Estado del Carrito: <strong>{carrito.estado}</strong></Typography>
                  <Typography>Tipo de Carrito: <strong>{carrito.tipo}</strong></Typography>
                </>
              )}
              <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell align="center">Nombre</TableCell>
                      <TableCell align="center">Precio</TableCell>
                      <TableCell align="center">Eliminar</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {productosSeleccionados.map((producto) => (
                      <TableRow key={producto.id}>
                        <TableCell>{producto.id}</TableCell>
                        <TableCell align="center">{producto.descripcion}</TableCell>
                        <TableCell align="center">${producto.precio}</TableCell>
                        <TableCell align="center">
                          <Button variant="contained" color="secondary" onClick={() => handleRemoveProducto(producto)}>
                            Eliminar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Mostrar Descuentos */}
              {descuentos.length > 0 && (
                <Box sx={{ marginTop: 2 }}>
                  <Typography variant="h6">Descuentos aplicados:</Typography>
                  {descuentos.map((desc, index) => (
                    <Typography key={index}>- {desc}</Typography>
                  ))}
                </Box>
              )}

              <Typography variant="h6" sx={{ marginTop: 2 }}>Total sin descuentos: ${total.toFixed(2)}</Typography>
              <Typography variant="h6">Total con descuentos: ${totalFinal.toFixed(2)}</Typography>
              <Button variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={handleGuardarCarrito}>
                Comprar y cerrar carrito
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Botón para Volver a la Lista de Carritos */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
            <Button variant="contained" color="primary" onClick={handleVolverListaCarritos}>
              Volver a la Lista de Carritos
            </Button>
          </Box>
        </Grid>

        {/* Botón Home */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
            <ButtonHome />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CarritoDetail;

