import { useState, useEffect } from 'react';
import { Box, Button, Typography, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import CarritoService from '../services/CarritoService';

const ViewCarritos = () => {
  const navigate = useNavigate(); // Declarar navigate
  const [carritos, setCarritos] = useState([]);

  // Función para cargar los carritos desde el backend
  const cargarCarritos = async () => {
    try {
      const carritosObtenidos = await CarritoService.obtenerCarritos();
      setCarritos(carritosObtenidos);
    } catch (error) {
      console.error('Error al cargar los carritos:', error);
    }
  };

  useEffect(() => {
    cargarCarritos(); // Cargar los carritos cuando el componente se monta
  }, []);

  // Función para eliminar un carrito por su ID
  const handleDelete = async (id) => {
    try {
      await CarritoService.eliminarCarrito(id); // Elimina el carrito en el backend
      setCarritos(carritos.filter((carrito) => carrito.id !== id)); // Actualiza el estado eliminando el carrito
    } catch (error) {
      console.error('Error al eliminar el carrito:', error);
    }
  };

  // Función para seleccionar un carrito y redirigir a CarritoDetail con el ID del carrito
  const handleSelect = (id) => {
    navigate(`/carrito-detail/${id}`); // Redirige a la ruta con el ID del carrito
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
            Lista de Carritos
          </Typography>

          {/* Tabla para listar carritos */}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="center">Tipo de Carrito</TableCell>
                  <TableCell align="center">Estado</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {carritos.map((carrito) => (
                  <TableRow key={carrito.id}>
                    <TableCell component="th" scope="row">
                      {carrito.id}
                    </TableCell>
                    <TableCell align="center">{carrito.tipo}</TableCell>
                    <TableCell align="center">{carrito.estado}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleSelect(carrito.id)} // Redirigir al seleccionar
                        sx={{ marginRight: 1 }}
                      >
                        Seleccionar
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDelete(carrito.id)}
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
              onClick={() => navigate('/')} // Redirigir a home
              startIcon={<HomeIcon />}
              sx={{ padding: '10px 20px', borderRadius: '20px' }}
            >
              Home
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ViewCarritos;
