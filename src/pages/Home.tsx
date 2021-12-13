import React from 'react';
import { styled } from '@mui/material/styles';
import logo from '../logo.svg';
import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { HomeQuery } from './__generated__/HomeQuery.graphql';
import { graphql } from 'babel-plugin-relay/macro';

const PREFIX = 'Home';

const classes = {
  root: `${PREFIX}-root`,
  bullet: `${PREFIX}-bullet`,
  title: `${PREFIX}-title`,
  pos: `${PREFIX}-pos`,
};

const Root = styled('div')({
  [`& .${classes.root}`]: {
    minWidth: 275,
  },
  [`& .${classes.bullet}`]: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },

  [`& .${classes.title}`]: {
    fontSize: 14,
  },
  [`& .${classes.pos}`]: {
    marginBottom: 12,
  },
});

interface HomeProps {
  preloadedQuery: PreloadedQuery<HomeQuery>;
}

const Home: React.FC<HomeProps> = ({ preloadedQuery }: HomeProps) => {
  const data = usePreloadedQuery<HomeQuery>(homeQuery, preloadedQuery);

  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Root>
      <Box my={4} textAlign="center">
        <img src={logo} className="App-logo" alt="logo" />
      </Box>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            StrongMotionStation
          </Typography>

          <Typography variant="h5" component="h2" className={classes.pos}>
            strong{bull}motion{bull}station
          </Typography>

          <Typography className={classes.pos} component="p">
            id: {data?.strong_motion_station?.id}
            <br />
            site_code: {data?.strong_motion_station?.site_code}
            <br /> created: {data?.strong_motion_station?.created}
          </Typography>

          <Typography className={classes.pos} color="textSecondary">
            This data arrived via graphql query from a toshi-api.
          </Typography>
        </CardContent>

        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Root>
  );
};

export default Home;

export const homeQuery = graphql`
  query HomeQuery {
    strong_motion_station(id: "U3Ryb25nTW90aW9uU3RhdGlvbjow") {
      soft_clay_or_peat
      id
      created
      Vs30_mean
      site_code
      site_class
    }
  }
`;
