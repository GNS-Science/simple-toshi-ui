import React from 'react';
import './App.css';
import logo from './logo.svg';

import { graphql } from 'babel-plugin-relay/macro';
import { Environment, loadQuery, PreloadedQuery, RelayEnvironmentProvider, usePreloadedQuery } from 'react-relay/hooks';
import RelayEnvironment from './RelayEnvironment';
import { AppStrongMotionStationQuery } from './__generated__/AppStrongMotionStationQuery.graphql';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Container,
  Typography,
} from '@material-ui/core';
import { useLocalStorage } from '@rehooks/local-storage';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import RuptureGenerationTask from './components/RuptureGenerationTask';
import FileDetail from './components/FileDetail';
import Search from './components/Search';
import GeneralTask from './pages/GeneralTask';
import MenuBar from './components/MenuBar';
import InversionSolution from './components/inversionSolution/InversionSolution';

/* preview views (with no test coverage...) */
import Preview from './components/Preview';
import PreviewMFD from './components/PreviewMFD';
import PreviewLineMFD from './components/PreviewLineMFD';
import RuptureSetViews from './components/RuptureSetViews';
import HazardMap from './components/HazardMap';
import Find from './components/Find';
import AutomationTask from './components/AutomationTask';
import LocalStorageContext from './contexts/localStorage';
import { ISFavouritesInstance } from './interfaces/localStorage';
import MySolutions from './pages/MySolutions';

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
const appStrongMotionStationQuery = graphql`
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
const preloadedQuery = loadQuery<AppStrongMotionStationQuery>(RelayEnvironment, appStrongMotionStationQuery, {
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
function App(props: { preloadedQuery: PreloadedQuery<AppStrongMotionStationQuery> }) {
  const data = usePreloadedQuery<AppStrongMotionStationQuery>(appStrongMotionStationQuery, props.preloadedQuery);

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <>
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
            <br />
            created: {data?.strong_motion_station?.created}
          </Typography>

          <Typography className={classes.pos} color="textSecondary">
            This data arrived via graphql query from a toshi-api.
          </Typography>
        </CardContent>

        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </>
  );
}

// The above component needs to know how to access the Relay environment, and we
// need to specify a fallback in case it suspends:
// - <RelayEnvironmentProvider> tells child components how to talk to the current
//   Relay Environment instance
// - <Suspense> specifies a fallback in case a child suspends.
function AppRoot(props: { environment?: Environment }): React.ReactElement {
  const env = props.environment || RelayEnvironment;
  //TODO - resolve @rehook/local-storage, version currently pinned to 2.4.0
  //see https://github.com/rehooks/local-storage/issues/77 for more info
  const [ISFavourites, setISFavourites] = useLocalStorage<ISFavouritesInstance>('IS-Favourites');
  const [reportViewSelections, setReportViewSelections] = useLocalStorage<string[]>('report-view-selections', []);
  const LocalStorageProvider = LocalStorageContext.Provider;

  return (
    <RelayEnvironmentProvider environment={env}>
      <React.Suspense fallback={<Loading />}>
        <BrowserRouter>
          <LocalStorageProvider
            value={{
              ISFavourites,
              setISFavourites,
              reportViewSelections,
              setReportViewSelections,
            }}
          >
            <MenuBar />
            <Container maxWidth="xl" style={{ paddingTop: '40px', wordWrap: 'break-word' }}>
              <Switch>
                <Route path="/RuptureGenerationTask/:id">
                  <RuptureGenerationTask />
                </Route>
                <Route path="/FileDetail/:id/:tab?">
                  <FileDetail />
                </Route>
                <Route path="/InversionSolution/:id/:tab?">
                  <InversionSolution />
                </Route>
                <Route path="/Search">
                  <Search />
                </Route>
                <Route path="/GeneralTask/:id/:tabName?/:clipBoard?">
                  <GeneralTask />
                </Route>
                <Route path="/AutomationTask/:id">
                  <AutomationTask />
                </Route>
                <Route path="/Find/:id?">
                  <Find />
                </Route>
                <Route path="/MySolutions">
                  <MySolutions />
                </Route>
                <Route path="/Preview/MFD">
                  <PreviewMFD width={800} height={600} bar_width={15} />
                </Route>
                <Route path="/Preview/lineMFD">
                  <PreviewLineMFD />
                </Route>
                <Route path="/Preview/views">
                  <RuptureSetViews />
                </Route>
                <Route path="/Preview/hazard">
                  <HazardMap />
                </Route>
                <Route path="/Preview">
                  <Preview />
                </Route>
                <Route path="/">
                  <App preloadedQuery={preloadedQuery} />
                </Route>
              </Switch>
            </Container>
          </LocalStorageProvider>
        </BrowserRouter>
      </React.Suspense>
    </RelayEnvironmentProvider>
  );
}

function Loading() {
  const classes = useStyles();
  return (
    <Container maxWidth="md" style={{ paddingTop: '40px', wordWrap: 'break-word' }}>
      <Box className={classes.progress} width="100%" height="100%">
        <CircularProgress />
      </Box>
    </Container>
  );
}

export default AppRoot;
