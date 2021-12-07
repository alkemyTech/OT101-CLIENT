import ImageSlider from '../components/ImageSlider/ImageSlider';
import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const Home = ({ title }) => {
  const user = useSelector((state) => state.user);
  return (
    <div>
      <h1>{user.isLoggin === true? title=`Hola ${user.firstName}, bienvenido a Fundación somos más`: title='Bienvenido a Fundación somos más'}</h1>
      <ImageSlider />

      <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
        <h2>ÚLTIMAS NOVEDADES</h2>
        <Grid container spacing={2}></Grid>
      </Box>
    </div>
  );
};

export default Home;
