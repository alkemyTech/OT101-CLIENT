import ImageSlider from '../components/ImageSlider/ImageSlider';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { getRequest } from '../services/requestsHandlerService'

const Home = () => {
  const user = useSelector((state) => state.user);
  
  const [news, setNews] = useState([]);
  const endPointNews = '';

  useEffect(() => {
    getRequest(endPointNews).then(response => setNews(response.reverse().slice(0, 3)));
  }, [])

  return (
    <div>
      <h1>{user.isLoggin === true? `Hola ${user.firstName}, bienvenido a Fundación somos más`: 'Bienvenido a Fundación somos más'}</h1>
      <ImageSlider />

      <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
        <h2>ÚLTIMAS NOVEDADES</h2>
        <Grid container spacing={2}></Grid>
      </Box>
    </div>
  );
};

export default Home;
