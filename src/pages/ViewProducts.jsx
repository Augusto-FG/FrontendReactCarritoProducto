import { useState, useEffect } from 'react';
import { Box, Button, Typography, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Snackbar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import ProductoService from '../services/ProductService';

const ViewProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Cargar productos al iniciar el componente
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productosData = await ProductoService.getAllProductos();
        setProducts(productosData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Función para eliminar un producto por su ID
  const handleDelete = async (id) => {
    try {
      await ProductoService.deleteProducto(id);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
      // Mostrar mensaje de error
      setErrorMessage('No se puede eliminar el producto porque está siendo utilizado en un carrito.');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f4f8',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Card sx={{ minWidth: 275, padding: 4, boxShadow: 3, borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
        <CardContent>
          <Typography variant="h4" component="div" sx={{ marginBottom: 4, textAlign: 'center' }}>
            Lista de Productos
          </Typography>

          {/* Tabla para listar productos */}
          <TableContainer component={Paper} sx={{ maxHeight: '60vh', overflowY: 'auto' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="center">Nombre del Producto</TableCell>
                  <TableCell align="center">Precio</TableCell> {/* Nueva columna para el precio */}
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell component="th" scope="row">
                      {product.id}
                    </TableCell>
                    <TableCell align="center">{product.descripcion}</TableCell>
                    <TableCell align="center">{product.precio}</TableCell> {/* Mostrar el precio */}
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDelete(product.id)}
                      >
                        Eliminar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/')}
              startIcon={<HomeIcon />}
              sx={{ padding: '10px 20px', borderRadius: '20px' }}
            >
              Home
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Snackbar para mostrar mensajes de error */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={errorMessage}
      />
    </Box>
  );
};

export default ViewProducts;
