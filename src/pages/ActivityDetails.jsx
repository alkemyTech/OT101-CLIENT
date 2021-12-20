import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';

import { Box, Container, Typography } from '@material-ui/core'
import CircularProgress from '@mui/material/CircularProgress';

import { getRequest } from '../services/requestsHandlerService';


const ActivityDetails = () => {
    const { id } = useParams();
    const [ activity, setActivity ] = useState();
    const [ isLoading, setIsLoading ] = useState(true);


    useEffect(() => {
        let disposed = false;

        const fetchDetails = async () => {
            try {
                const details = await getRequest(`/activities/${id}`);

                if (disposed) return; // avoid state change in a unmounted component

                setActivity(details);
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchDetails();

        return () => disposed = true;
    }, []);

    if (isLoading) {
        return (
            <CircularProgress sx={{ mx: 'auto', my: 'auto', display: 'block' }} size={64} />
        );
    }

    if (!activity) {
        return (
            <Typography variant="h3" align='center' style={{marginTop: '30vh'}}>
                No existen detalles sobre dicha actividad
            </Typography>
        );
    }

    return (
        <Container maxwidth='lg' align='center'>
            <img src={activity.image} alt='activity' style={{margin: '50px 0', maxWidth: '100%'}}/>
            <Typography variant="h3" gutterBottom>{activity.name}</Typography>
            <Box align='left'>
            { parse(activity.content) }
            </Box>
        </Container>
    );


};

export default ActivityDetails;