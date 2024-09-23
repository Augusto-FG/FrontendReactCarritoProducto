import { Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

const ButtonHome = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => navigate('/')}
      startIcon={<HomeIcon />}
      sx={{ padding: '10px 20px', borderRadius: '20px' }}
    >
      Home
    </Button>
  );
};

export default ButtonHome;
