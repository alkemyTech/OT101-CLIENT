import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
import { getRequest } from '../services/requestsHandlerService';

function About() {
  const [members, setMembers] = useState([]);
  useEffect(()=> {
    getRequest('/members')
      .then(result => {
        setMembers(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Typography variant='h3' component='h2' sx={{marginBottom: 4}}>Sobre nosotros</Typography>
      <Grid container spacing={5} rowSpacing={8}>
        {members.map((member, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={member.image}
                  alt={`${member.firstName} ${member.lastName} image`}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h3">
                    {member.firstName + ' ' + member.lastName}
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

export default About;
