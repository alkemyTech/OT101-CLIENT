import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
import { getRequest } from '../services/requestsHandlerService';

function Activities() {
  const [activities, setActivities] = useState([]);
  useEffect(()=> {
    getRequest('/activities')
      .then(result => {
        setActivities(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Typography variant='h3' component='h2' sx={{marginBottom: 4, fontFamily: 'Signika'}}>Actividades</Typography>
      <Grid container spacing={5} rowSpacing={8}>
        {activities.map((activity, i) => (
          <Grid item xs={12} md={6} lg={4} key={i}>
            <Card sx={{m:1}}>
              <CardActionArea component={Link} to={`/Actividades/${activity.id}`}>
                <CardMedia
                  component="img"
                  height="140"
                  image={activity.image}
                />
                <CardContent align='center'>
                  <Typography align='center' noWrap sx={{ fontSize: 20 }} fontFamily='Signika'>
                    {activity.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Activities;