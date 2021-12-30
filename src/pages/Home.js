import ImageSlider from '../components/ImageSlider/ImageSlider';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { getRequest } from '../services/requestsHandlerService';
import { Typography, Grid } from '@mui/material';
import GridHome from '../components/GridHome';

const Home = () => {
  const user = useSelector((state) => state.user);

  const [news, setNews] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const endPointNews = '/news';
  const endPointTestimonials = '/testimonials/last-elements';

  useEffect(() => {
    getRequest(endPointNews).then((response) => setNews(response));
    getRequest(endPointTestimonials).then((response) => setTestimonials(response));
  }, []);

  return (
    <>
      <Typography variant="h3" component="h2" fontFamily='Signika'>
        {user.isLogged === true
          ? (`Hola ${user.data.firstName}, bienvenido a Fundación somos más`).toUpperCase()
          : ('Bienvenido a Fundación somos más').toUpperCase()}
      </Typography>
      <Box sx={{ marginY: 4 }}>
        <ImageSlider />
      </Box>
      
      <Box sx={{ flexGrow: 1, textAlign: 'center', mt: 5 }}>
        <Typography variant="h4" component="h3" fontFamily='Signika' sx={{ mb: 2 }}>
          ÚLTIMAS NOVEDADES
        </Typography>
        <Grid container spacing={5} rowSpacing={8}>
        {news.map((entry, key) => (
          <Grid item xs={12} md={4} key={key}>
            <GridHome key={key} item={entry} />
          </Grid>
        ))}
      </Grid>
      </Box>

      <Box sx={{ flexGrow: 1, textAlign: 'center', mt: 5 }}>
        <Typography variant="h4" component="h3" fontFamily='Signika' sx={{ mb: 2 }}>
          TESTIMONIOS
        </Typography>
        <Grid container spacing={5} rowSpacing={8}>
        {testimonials.map((testimonial, key) => (
          <Grid item xs={12} md={4} key={key}>
            <GridHome key={key} item={testimonial} />
          </Grid>
        ))}
      </Grid>
      </Box>
    </>
  );
};

export default Home;
