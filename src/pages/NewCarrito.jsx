import { useState } from 'react';
import { Box, Typography, Card, CardContent, MenuItem, Select, FormControl, InputLabel, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CarritoService from '../services/CarritoService';
import ButtonHome from '../components/ButtonHome'; // para importar el buttonHome

const NewCarrito = () => {
  const navigate = useNavigate();
  const [carritoType, setCarritoType] = useState('');

  const handleChange = (event) => {
    setCarritoType(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const nuevoCarrito = {
        tipo: carritoType,
        estado: 'ABIERTO',
      };

      const carritoCreado = await CarritoService.crearCarrito(nuevoCarrito);
      console.log('Carrito creado:', carritoCreado);
      navigate('/');
    } catch (error) {
      console.error('Error al crear el carrito:', error);
    }
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
            Crear Nuevo Carrito
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel id="carrito-type-label">Tipo de Carrito</InputLabel>
              <Select
                labelId="carrito-type-label"
                id="carrito-type"
                value={carritoType}
                label="Tipo de Carrito"
                onChange={handleChange}
              >
                <MenuItem value="COMUN">Común</MenuItem>
                <MenuItem value="VIP">VIP</MenuItem>
                <MenuItem value="FECHA_ESPECIAL">Promocionable por Fecha Especial</MenuItem>
              </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Crear Carrito
            </Button>
          </form>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
            <ButtonHome /> {/* Reutilizando el componente ButtonHome */}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default NewCarrito;
