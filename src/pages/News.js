import { useEffect, useState } from 'react';

import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import NewsGrid from '../components/NewsGrid';
import { getRequest } from '../services/requestsHandlerService';
import { basicAlert } from '../services/sweetAlertService';

function News() {
  const [ newsList, setNewsList ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);


  useEffect(() => {
    getRequest('/news')
      .then(news => setNewsList(news))
      .catch(err => {
        console.log(err)
        basicAlert('Sin conexión', 'No se pudo establecer la comunicación con el servidor', 'error');
      })
      .finally(() => setIsLoading(false));
    }, []);

  if (isLoading) {
    return (
      <CircularProgress sx={{ mx: 'auto', my: 'auto', display: 'block' }} size={64} />
    );
  }

  return (
    <>
      <Typography align='center' sx={{ fontSize: { lg: 80, md: 60, sm: 50, xs: 40 } }}> 
        Novedades
      </Typography>
      <NewsGrid news={newsList} />
    </>
    );
  }

export default News;
