import Grid from '@mui/material/Grid';

const News = ({ news }) => {
  console.log(state);
  return (
    <Grid item xs={12} sm={6} lg={3} sx={{ display: 'flex', justifyContent: 'center' }}>
      <img src={news.image} alt={news.title} />
    </Grid>
  );
};

export default News;
