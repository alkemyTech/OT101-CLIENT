import ImageSlider from '../components/ImageSlider/ImageSlider';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { getRequest } from '../services/requestsHandlerService';
import { Typography, Grid } from '@mui/material';
import GridHome from '../components/GridHome';

const Home = () => {
  const user = useSelector((state) => state.user);
  const organization = useSelector((state) => state.organization);

  const [news, setNews] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const endPointNews = '/news';
  const endPointTestimonials = '/testimonials/last-elements';

  const getRequestNews = async () => {
    try {
      const data = await getRequest(endPointNews);
      setNews(data);
    }
    catch (err) {
      console.log(err);
    }
  };

  const getRequestTestimonials = async () => {
    try {
      const data = await getRequest(endPointTestimonials);
      setTestimonials(data);
    }
    catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRequestNews();
    getRequestTestimonials();
  }, []);

  return (
    <>
      <Typography variant="h3" component="h2" fontFamily='Signika'>
        { user.isLogged && `Hola ${user.data.firstName}, `.toUpperCase() }
        { organization?.data?.welcomeText.toUpperCase()}
      </Typography>
      <Box sx={{ marginY: 4 }}>
        <ImageSlider slides={ organization?.data?.Slides } />
      </Box>
      
      <Box sx={{ flexGrow: 1, textAlign: 'center', mt: 5 }}>
        <Typography variant="h4" component="h3" fontFamily='Signika' sx={{ mb: 2 }}>
          ÚLTIMAS NOVEDADES
        </Typography>
        <Grid container spacing={5} rowSpacing={8}>
        {news.map((entry, key) => (
          <Grid item xs={12} md={4} key={key}>
            <GridHome
              key={key}
              item={entry} 
              linkTo={`/Novedades/${entry.id}`}
            />
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
            <GridHome key={key} item={testimonial} linkTo={`/Testimonios/${entry.id}`} />
          </Grid>
        ))}
      </Grid>
      </Box>
    </>
  );
};

export default Home;
