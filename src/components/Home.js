import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Slider from './Slider';
import { getRequest } from './requestsHandlerService';


const Home = ({ title = 'MENSAJE DE BIENVENIDA' }) => {
    const [state, setstate] = useState([]);
    useEffect(() => {
        getRequest('http://Nunca-Me-Senti-Tan-Frustrado.com/activities')
            .then(res => setstate(res))
            .catch(err => console.log(err));
    }, []);
    return (
        <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
            <h1>{title}</h1>
            <Slider />
            <h2>ÚLTIMAS NOVEDADES</h2>
            <Grid container spacing={2} >
                <Grid item xs={12} sm={6} lg={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={state[0]?.image || "https://via.placeholder.com/323x239"} alt="" />
                </Grid>
                <Grid item xs={12} sm={6} lg={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={state[1]?.image || "https://via.placeholder.com/323x239"} alt="" />
                </Grid>
                <Grid item xs={12} sm={6} lg={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={state[2]?.image || "https://via.placeholder.com/323x239"} alt="" />
                </Grid>
                <Grid item xs={12} sm={6} lg={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={state[3]?.image || "https://via.placeholder.com/323x239"} alt="" />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Home;