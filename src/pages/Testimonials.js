import React, { useState, useEffect } from "react";
import { getRequest } from '../services/requestsHandlerService';
import { CircularProgress, Typography, Grid, Card, CardActionArea, Link, CardContent, CardMedia } from '@mui/material';

function Testimonials() {
	const [testimonials, setTestimonials] = useState([]);
	const [ isLoading, setIsLoading ] = useState(true);
	useEffect(() => {
		getRequest('/testimonials')
			.then( response => setTestimonials(response))
			.catch(err => {
        		console.log(err)
			})
			.finally(() => setIsLoading(false));
	}, [])

	if (!testimonials?.length) {
        return (
            <Typography align='center' sx={{ fontSize: 25, mt: 2 }}> 
               No hay disponible ninguna novedad
            </Typography>
        );
    }
	if (isLoading) {
    return (
      <CircularProgress sx={{ mx: 'auto', my: 'auto', display: 'block' }} size={64} />
	);
  	}
	return (
		<>
			<Typography align='center' sx={{ fontSize: { lg: 80, md: 60, sm: 50, xs: 40 } }}> 
        	Testimonios
      		</Typography>
			  <Grid container spacing={2}>
			{
				testimonials.map( ({id, name, content, image}, idx) => (
					<Grid item xs={12} md={6} lg={4} key={idx}>
						<Card sx={{m:1}}>
							<CardActionArea
								component={Link}
							>
								<CardMedia
									component="img"
									height="200"
									image={image}
								/>
								<CardContent align='center'>
									<Typography align='center' noWrap sx={{ fontSize: 20 }}>
										{ name }
									</Typography>
								</CardContent>
								<CardContent align='center'>
									<Typography align='center' sx={{ fontSize: 15 }}>
										{ content }
									</Typography>
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>
				))
			}
        </Grid>
		</>
	)
}

export default Testimonials;
