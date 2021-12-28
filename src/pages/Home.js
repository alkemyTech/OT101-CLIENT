import ImageSlider from '../components/ImageSlider/ImageSlider';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { getRequest } from '../services/requestsHandlerService';
import News from '../components/News';
import { Typography } from '@mui/material';

const Home = () => {
  const user = useSelector((state) => state.user);

  const [news, setNews] = useState([]);
  const endPointNews = '';

  useEffect(() => {
    getRequest(endPointNews).then((response) => setNews(response.reverse().slice(0, 3)));
  }, []);

  return (
    <>
      <Typography variant="h3" component="h2">
        {user.isLogged === true
          ? `Hola ${user.data.firstName}, bienvenido a Fundación somos más`
          : 'Bienvenido a Fundación somos más'}
      </Typography>
      <Box sx={{ marginY: 4 }}>
        <ImageSlider />
      </Box>

      <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
        <Typography variant="h4" component="h3">
          ÚLTIMAS NOVEDADES
        </Typography>
        {news.map((item, key) => {
          return <News key={key} news={item} />;
        })}
      </Box>
    </>
  );
};

export default Home;
