import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


const NewsGrid = ({news}) => {
    if (!news?.length) {
        return (
            <Typography align='center' sx={{ fontSize: 25, mt: 2, fontFamily: 'Signika' }}> 
               No hay disponible ninguna novedad
            </Typography>
        );
    }

    return (
        <Grid container spacing={2}>
        {
            news.map( ({id, name, image}, idx) => (
                <Grid item xs={12} md={6} lg={4} key={idx}>
                    <Card sx={{m:1}}>
                        <CardActionArea
                            component={Link}
                            to={`/Novedades/${id}`}
                        >
                            <CardContent align='center'>
                                <Typography align='center' noWrap sx={{ fontSize: 20, fontFamily: 'Signika' }}>
                                    { name }
                                </Typography>
                            </CardContent>
                            <CardMedia
                                component="img"
                                height="200"
                                image={image}
                            />
                        </CardActionArea>
                    </Card>
                </Grid>
            ))
        }
        </Grid>
    );
};

NewsGrid.propTypes = {
    news: PropTypes.array,
};


export default NewsGrid;