import React, { useEffect, useState } from 'react';
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
      <Typography variant='h3' component='h2' sx={{marginBottom: 4}}>Actividades</Typography>
      <Grid container spacing={5} rowSpacing={8}>
        {activities.map((activity, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={activity.image}
                />
                <CardContent>
                  <Typography gutterBottom variant="h3" component="h3">
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