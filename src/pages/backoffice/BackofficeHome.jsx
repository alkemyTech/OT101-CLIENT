import { Box } from '@mui/material';
import logoSomosMas from '../../assets/LOGO-SOMOS MAS.png'


const BackofficeHome = (props) => {
    return (
    <>
        <Box sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
            <img src={logoSomosMas} width='300px' height='250px' alt="Logotipo Somos Más" />
        </Box>
    </>
    );
};

export default BackofficeHome;