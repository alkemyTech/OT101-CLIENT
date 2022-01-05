import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const GridHome = ({ item }) => {
  return (
    <Card>
      <CardActionArea component={Link} to={`/Novedades/${item.id}`}>
        <CardMedia
          component="img"
          height="140"
          image={item.image}
          alt={`item ${item.id} image`}
        />
        <CardContent>
          <Typography align='center' noWrap sx={{ fontSize: 20 }} fontFamily='Signika'>
            {item.name}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography align='center' sx={{ fontSize: 15 }} fontFamily='Signika'>
            {item.content}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default GridHome;