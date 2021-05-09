import React from 'react';
import './App.css';
import logo from './logo.svg';

import graphql from 'babel-plugin-relay/macro';

import {
  RelayEnvironmentProvider,
  loadQuery,
  usePreloadedQuery,
} from 'react-relay/hooks';

import RelayEnvironment from './RelayEnvironment';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';


const { Suspense } = React;

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  progress: {
    verticalAlign: 'middle',
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

// Define a query
const AppStrongMotionStationQuery = graphql`
query AppStrongMotionStationQuery {
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

// Immediately load the query as our app starts. For a real app, we'd move this
// into our routing configuration, preloading data as we transition to new routes.
const preloadedQuery = loadQuery(RelayEnvironment, AppStrongMotionStationQuery, {
  /* query variables */
});

// Inner component that reads the preloaded query results via `usePreloadedQuery()`.
// This works as follows:
// - If the query has completed, it returns the results of the query.
// - If the query is still pending, it "suspends" (indicates to React that the
//   component isn't ready to render yet). This will show the nearest <Suspense>
//   fallback.
// - If the query failed, it throws the failure error. For simplicity we aren't
//   handling the failure case here.
function App(props) {
  const data = usePreloadedQuery(AppStrongMotionStationQuery, props.preloadedQuery);
  // console.log("preloadedQuery", data);

  const classes = useStyles();
  const bull = <span className={classes.bullet} >•</span>;

  return (
    <Container maxWidth="sm">
      <Box my={4}>
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
            id: "U3Ryb25nTW90aW9uU3RhdGlvbjow"<br />
            site_code: {data.strong_motion_station.site_code}<br />
            created: {data.strong_motion_station.created} 
          </Typography>

          <Typography className={classes.pos} color="textSecondary">
              This data arrived via graphql query from a toshi-api.
          </Typography>

        </CardContent>
        
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Container>
  )
};


// The above component needs to know how to access the Relay environment, and we
// need to specify a fallback in case it suspends:
// - <RelayEnvironmentProvider> tells child components how to talk to the current
//   Relay Environment instance
// - <Suspense> specifies a fallback in case a child suspends.
function AppRoot(props) {
  const env = props.environment || RelayEnvironment;  
  // console.log('E', environment);
  return (
    <RelayEnvironmentProvider environment={env}>
      <Suspense fallback={<Loading />}>
        <App preloadedQuery={preloadedQuery} />
      </Suspense>
    </RelayEnvironmentProvider>
  );
}

function Loading() {
  const classes = useStyles();
  return (
    <Container>
      <Box className={classes.progress} width="100%" height="100%">
        <CircularProgress />
      </Box>
    </Container>
  )
};

export default AppRoot;
