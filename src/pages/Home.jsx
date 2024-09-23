import { useState } from 'react';
import { Box, Button, Menu, MenuItem, Typography, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Add, ListAlt, Discount } from '@mui/icons-material';

const Home = () => {
  const [anchorElCarrito, setAnchorElCarrito] = useState(null);
  const openCarrito = Boolean(anchorElCarrito);
  const navigate = useNavigate();

  const handleClickCarrito = (event) => {
    setAnchorElCarrito(event.currentTarget);
  };

  const handleCloseCarrito = (path) => {
    setAnchorElCarrito(null);
    if (path) {
      navigate(path);
    }
  };

  const [anchorElProducto, setAnchorElProducto] = useState(null);
  const openProducto = Boolean(anchorElProducto);

  const handleClickProducto = (event) => {
    setAnchorElProducto(event.currentTarget);
  };

  const handleCloseProducto = (path) => {
    setAnchorElProducto(null);
    if (path) {
      navigate(path);
    }
  };

  return (
    <Box sx={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f4f8',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: 2
    }}>
      {/* Cuadro Principal */}
      <Card sx={{ minWidth: 275, padding: 4, boxShadow: 3, borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.8)', marginBottom: 4 }}>
        <CardContent>
          <Typography variant="h4" component="div" sx={{ marginBottom: 2, textAlign: 'center' }}>
            Bienvenido/a a Mi Challenge
          </Typography>

          {/* Menú de Crear Carrito */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleClickCarrito}
            sx={{ marginBottom: 1, width: '100%' }}
          >
            Crear carrito
          </Button>
          <Menu
            anchorEl={anchorElCarrito}
            open={openCarrito}
            onClose={() => handleCloseCarrito()}
          >
            <MenuItem onClick={() => handleCloseCarrito('/nuevo-carrito')}>Nuevo carrito</MenuItem>
            <MenuItem onClick={() => handleCloseCarrito('/ver-carritos')}>Ver carritos</MenuItem>
          </Menu>

          {/* Menú de Crear Productos */}
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClickProducto}
            sx={{ width: '100%' }}
          >
            Crear productos
          </Button>
          <Menu
            anchorEl={anchorElProducto}
            open={openProducto}
            onClose={() => handleCloseProducto()}
          >
            <MenuItem onClick={() => handleCloseProducto('/nuevo-producto')}>Nuevo producto</MenuItem>
            <MenuItem onClick={() => handleCloseProducto('/lista-productos')}>Lista de productos</MenuItem>
          </Menu>
        </CardContent>
      </Card>

      {/* Sección de Características Clave */}
      <Box sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 2,
        padding: 3,
        width: '100%',
        maxWidth: 600,
        boxShadow: 1,
      }}>
        <Typography variant="h5" component="div" sx={{ marginBottom: 2, textAlign: 'center' }}>
          Características claves:
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
            <ShoppingCart sx={{ marginRight: 1 }} />
            <Typography variant="body2">Gestión de carritos</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
            <Add sx={{ marginRight: 1 }} />
            <Typography variant="body2">Agregar productos</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
            <ListAlt sx={{ marginRight: 1 }} />
            <Typography variant="body2">Lista de productos</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Discount sx={{ marginRight: 1 }} />
            <Typography variant="body2">Descuentos automáticos</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
