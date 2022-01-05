import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';


const BackofficeHome = (props) => {
    const organization = useSelector((state) => state.organization);
 
    return (
    <>
        <Box sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
            <img
                src={organization?.data?.image}
                width='300px' height='250px'
                alt={`Logotipo ${organization?.data?.name}`}
            />
        </Box>
        <Button component={Link} to={'/'} sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center', m: 'auto' }} >
            <Typography>
                Ir al sitio
            </Typography>
        </Button>
    </>
    );
};

export default BackofficeHome;