import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NewProduct from './pages/NewProduct'; 
import NewCarrito from './pages/NewCarrito';
import ViewCarritos from './pages/ViewCarritos';
import ViewProducts from './pages/ViewProducts';
import CarritoDetail from './pages/CarritoDetail'; 

function App() {
  return (
    <Router>    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nuevo-producto" element={<NewProduct />} />
        <Route path="/nuevo-carrito" element={<NewCarrito />} />
        <Route path="/ver-carritos" element={<ViewCarritos />} />
        <Route path="/lista-productos" element={<ViewProducts />} />
        <Route path="/carrito-detail/:carritoId" element={<CarritoDetail />} />
      </Routes>
    </Router>
  );
}

export default App;

