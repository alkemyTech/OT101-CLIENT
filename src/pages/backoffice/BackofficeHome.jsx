import { Box } from '@mui/material';
import { useSelector } from 'react-redux';


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
    </>
    );
};

export default BackofficeHome;