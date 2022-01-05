import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {  Typography, Container } from '@material-ui/core'
import CircularProgress from '@mui/material/CircularProgress';

import { getRequest } from '../services/requestsHandlerService';


const NewsDetails = () => {
    const { id } = useParams();
    const [ novedades, setNovedades ] = useState();
    const [ isLoading, setIsLoading ] = useState(true);


    useEffect(() => {
        let disposed = false;

        const fetchDetails = async () => {
            try {
                const details = await getRequest(`/news/${id}`);

                if (disposed) return; // avoid state change in a unmounted component
                
                setNovedades(details);
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchDetails();

        return () => disposed = true;
    },[]);

    if (isLoading) {
        return (
            <CircularProgress sx={{ mx: 'auto', my: 'auto', display: 'block' }} size={64} />
        );
    }

    if (!novedades) {
        return (
            <Typography variant="h3" align='center' style={{marginTop: '30vh'}}>
                No existen detalles sobre dicha novedad
            </Typography>
        );
    }

    return (
        <>
      <Typography align='center' sx={{ fontSize: { lg: 80, md: 60, sm: 50, xs: 40, fontFamily: 'Signika' } }}> 
        Detalles sobre la novedad
      </Typography>
      <Container maxwidth='lg' align='center'>
            <img src={novedades.image} alt='activity' style={{margin: '50px 0', maxWidth: '100%'}}/>
            <Typography variant="h3" gutterBottom>{novedades.name}</Typography>
        </Container>
    </>
    );


};

export default NewsDetails;