import { Box } from '@mui/material';
import logoSomosMas from '../../assets/LOGO-SOMOS MAS.png';
import { Button, Typography } from '@mui/material';
import { HomeOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';


const BackofficeHome = (props) => {
    return (
    <>
        <Box sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
            <img src={logoSomosMas} width='300px' height='250px' alt="Logotipo Somos Más" />
        </Box>
        <Button component={Link} to={'/'} sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center', m: 'auto' }} >
            <Typography iconStart={HomeOutlined}>
                Ir al sitio
            </Typography>
        </Button>
    </>
    );
};

export default BackofficeHome;