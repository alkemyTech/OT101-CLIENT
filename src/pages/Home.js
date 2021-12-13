import ImageSlider from '../components/ImageSlider/ImageSlider';
<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
=======
import React from 'react';
>>>>>>> develop
import Box from '@mui/material/Box';
import { getRequest } from '../services/requestsHandlerService'
import News from '../components/News';

const Home = () => {
  const user = useSelector((state) => state.user);

  const [news, setNews] = useState([]);
  const endPointNews = '';

  useEffect(() => {
    getRequest(endPointNews)
    .then(response => setNews(response.reverse().slice(0, 3)));
  }, [])

  return (
    <div>
<<<<<<< HEAD
      <h1>{user.isLogged === true? `Hola ${user.data.firstName}, bienvenido a Fundación somos más`: 'Bienvenido a Fundación somos más'}</h1>
=======
>>>>>>> develop
      <ImageSlider />

      <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
        <h2>ÚLTIMAS NOVEDADES</h2>
        { news.map((item, key) => {
          return (
            <News key={key} news={item}/>
          )
        })}
      </Box>
    </div>
  );
};

export default Home;
