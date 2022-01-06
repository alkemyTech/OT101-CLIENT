import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {  Typography, Container } from '@material-ui/core'
import CircularProgress from '@mui/material/CircularProgress';

import { getRequest } from '../services/requestsHandlerService';


const NewsDetails = () => {
    const { id } = useParams();
    const [ testimonios, setTestimonios ] = useState();
    const [ isLoading, setIsLoading ] = useState(true);


    useEffect(() => {
        let disposed = false;

        const fetchDetails = async () => {
            try {
                const details = await getRequest(`/testimonials/${id}`);

                if (disposed) return; // avoid state change in a unmounted component
                
                setTestimonios(details);
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

    if (!testimonios) {
        return (
            <Typography variant="h3" align='center' style={{marginTop: '30vh'}}>
                No existen detalles sobre el testimonio
            </Typography>
        );
    }

    return (
        <>
      <Typography variant="h3" align='center' gutterBottom>{testimonios.name}</Typography>
      <Container maxwidth='lg' align='center'>
            <img src={testimonios.image} alt='testimonial' style={{margin: '50px 0', minWidth: '15%', height: '100%'}}/>
        </Container>
        <Typography variant="h5" align='center' gutterBottom>{testimonios.content}</Typography>
    </>
    );


};

export default NewsDetails;