import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
import { getRequest } from '../services/requestsHandlerService';

function About() {
  const [members, setMembers] = useState([]);
  useEffect(() => {
    getRequest('/members')
      .then((result) => {
        setMembers(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Typography variant='h3' component='h2' sx={{marginBottom: 4, fontFamily: 'Signika', color: '#DB5752', textShadow: '1px 1px 2px black'}}>Sobre nosotros</Typography>
      <Typography variant='p' component='p' sx={{marginBottom: 4, fontFamily: 'Signika', fontSize: 20}}>Desde 1997 en Somos Más trabajamos con los chicos y chicas, mamás y papás, abuelos y vecinos del barrio La Cava generando procesos de crecimiento y de inserción social. Uniendo las manos de todas las familias, las que viven en el barrio y las que viven fuera de él, es que podemos pensar, crear y garantizar estos procesos. Somos una asociación civil sin fines de lucro que se creó en 1997 con la intención de dar alimento a las familias del barrio. Con el tiempo fuimos involucrándonos con la comunidad y agrandando y mejorando nuestra capacidad de trabajo. Hoy somos un centro comunitario que acompaña a más de 700 personas a través de las áreas de: Educación, deportes, primera infancia, salud, alimentación y trabajo social.</Typography>
      <Typography variant='h3' component='h2' sx={{marginBottom: 4, fontFamily: 'Signika', color: '#FAFA88', textShadow: '1px 1px 2px black'}}>Vision</Typography>
      <Typography variant='p' component='p' sx={{marginBottom: 4, fontFamily: 'Signika', fontSize: 20}}>Mejorar la calidad de vida de niños y familias en situación de vulnerabilidad en el barrio La Cava, otorgando un cambio de rumbo en cada individuo a través de la educación, salud, trabajo, deporte, responsabilidad y compromiso.</Typography>
      <Typography variant='h3' component='h2' sx={{marginBottom: 4, fontFamily: 'Signika', color: '#9AC9FB', textShadow: '1px 1px 2px black'}}>Mision</Typography>
      <Typography variant='p' component='p' sx={{marginBottom: 4, fontFamily: 'Signika', fontSize: 20}}>Trabajar articuladamente con los distintos aspectos de la vida de las familias, generando espacios de desarrollo personal y familiar, brindando herramientas que logren mejorar la calidad de vida a través de su propio esfuerzo.</Typography>
      <Typography variant='h3' component='h2' sx={{marginBottom: 4, fontFamily: 'Signika'}}>Nuestro equipo</Typography>
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
                  <Typography gutterBottom variant="h5" component="h3" fontFamily='Signika'>
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
