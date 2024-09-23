import { useState } from 'react';
import { Box, Button, TextField, Typography, Card, CardContent, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ProductoService from '../services/ProductService';
import ButtonHome from '../components/ButtonHome'; // Importar el ButtonHome

const NewProduct = () => {
  const navigate = useNavigate();
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');  // Nuevo estado para el precio
  const [errorMessage, setErrorMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await ProductoService.createProducto({ descripcion, precio });  // Enviamos descripción y precio
      navigate('/'); // Redirige a la lista de productos
    } catch (error) {
      console.error('Error creating product:', error);
      setErrorMessage('El producto ya existe o hubo un error al crearlo.');
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
      }}
    >
      <Card sx={{ minWidth: 275, padding: 4, boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h4" component="div" sx={{ marginBottom: 4, textAlign: 'center' }}>
            Crear Producto
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Nombre del Producto"
              variant="outlined"
              fullWidth
              margin="normal"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
            <TextField
              label="Precio del Producto"  // Nuevo campo de precio
              variant="outlined"
              fullWidth
              margin="normal"
              type="number"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              required
            />
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
              <Button type="submit" variant="contained" color="primary">
                Crear
              </Button>
            </Box>
          </form>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
            {/* Usar ButtonHome para redirigir a la página principal */}
            <ButtonHome />
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

export default NewProduct;



