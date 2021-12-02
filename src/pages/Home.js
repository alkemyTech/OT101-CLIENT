import ImageSlider from '../components/ImageSlider/ImageSlider';
import React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const Home = ({ title = 'MENSAJE DE BIENVENIDA' }) => {
  return (
    <div>
      <h1>Home Component</h1>
      <ImageSlider />

      <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
        <h1>{title}</h1>
        <h2>ÚLTIMAS NOVEDADES</h2>
        <Grid container spacing={2}></Grid>
      </Box>
    </div>
  );
};

export default Home;
