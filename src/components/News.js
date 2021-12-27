import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const News = ({ news }) => {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={news.image}
          alt={`news ${news.id} image`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h3" fontFamily='Signika'>
            {news.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default News;
