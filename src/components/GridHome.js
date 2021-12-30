import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const GridHome = ({ item }) => {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={item.image}
          alt={`item ${item.id} image`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h3" fontFamily='Signika'>
            {item.name}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h3" fontFamily='Signika'>
            {item.content}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default GridHome;