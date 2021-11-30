import React from 'react';
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
            <h2>ÚLTIMAS NOVEDADES</h2>
            <Grid container spacing={2} >
                {
                    state.map((el, i) => <News news={el} key={i} />)
                }
            </Grid>
        </Box>
    );
};

export default Home;