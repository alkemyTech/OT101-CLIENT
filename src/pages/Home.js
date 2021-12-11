import ImageSlider from '../components/ImageSlider/ImageSlider';
import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import PublicLayout from '../components/PublicLayout';

const Home = ({ title = 'MENSAJE DE BIENVENIDA' }) => {
  return (
    <PublicLayout>
      <ImageSlider />

      <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
        <h1>{title}</h1>
        <h2>ÚLTIMAS NOVEDADES</h2>
        <Grid container spacing={2}></Grid>
      </Box>
    </PublicLayout>
  );
};

export default Home;