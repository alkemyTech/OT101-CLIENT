import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { getRequest } from '../services/requestsHandlerService';

function About() {
  const [members, setMembers] = useState([]);
  useEffect(()=> {
    getRequest('/members')
      .then(result => {
        setMembers(result);
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  return (
    <Box 
    sx={window.innerWidth >= '768'? {
      display:'flex',
      margin: 'auto'
    }: {
      margin: 'auto'
    }}>
      {members.map((member, i) => 
        <Card sx={{ maxWidth: 345, margin: '10px 20px' }} key={i}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={member.image}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {member.firstName + ' ' + member.lastName}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      )}
    </Box>
  )
}

export default About;
