import React from 'react';
import './App.css';

import { Environment, loadQuery, RelayEnvironmentProvider } from 'react-relay/hooks';
import RelayEnvironment from './RelayEnvironment';
import { Container } from '@mui/material';
import { useLocalStorage } from '@rehooks/local-storage';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import RuptureGenerationTask from './components/RuptureGenerationTask';
import FileDetail from './components/FileDetail';
import Search from './components/Search';
import GeneralTask from './pages/GeneralTask';
import MenuBar from './components/MenuBar';
import InversionSolution from './pages/InversionSolution';

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
import { regionalSolutionMfdOptions } from './constants/regionalSolutionMfd';
import { diagnosticReportViewOptions } from './constants/diagnosticReport';
import { mfdPlotOptions, namedFaultsOptions } from './constants/nameFaultsMfds';
import Home, { homeQuery } from './pages/Home';
import { HomeQuery } from './pages/__generated__/HomeQuery.graphql';
import Loading from './components/common/Loading';
import theme from './theme';
import { ThemeProvider } from '@mui/material';
import { parentViewsOptions } from './constants/parentFault';

// Immediately load the query as our app starts. For a real app, we'd move this
// into our routing configuration, preloading data as we transition to new routes.
const preloadedQuery = loadQuery<HomeQuery>(RelayEnvironment, homeQuery, {
  /* query variables */
});

// The Home component needs to know how to access the Relay environment, and we
// need to specify a fallback in case it suspends:
// - <RelayEnvironmentProvider> tells child components how to talk to the current
//   Relay Environment instance
// - <Suspense> specifies a fallback in case a child suspends.
function AppRoot(props: { environment?: Environment }): React.ReactElement {
  const env = props.environment || RelayEnvironment;
  //TODO - resolve @rehook/local-storage, version currently pinned to 2.4.0
  //see https://github.com/rehooks/local-storage/issues/77 for more info
  const [ISFavourites, setISFavourites] = useLocalStorage<ISFavouritesInstance>('IS-Favourites');
  const [localStorageRegionalViews, setLocalStorageRegionalViews] = useLocalStorage<string[]>('regional-views', [
    regionalSolutionMfdOptions[0].displayName,
  ]);
  const [localStorageGeneralViews, setLocalStorageGeneralViews] = useLocalStorage<string[]>('report-view-selections', [
    diagnosticReportViewOptions[0].displayName,
  ]);
  const [localStorageNamedFaultsView, setLocalStorageNamedFaultsView] = useLocalStorage<string>(
    'named-faults-plot-type',
    mfdPlotOptions[0].displayName,
  );
  const [localStorageNamedFaultsLocations, setLocalStorageNamedFaultsLocations] = useLocalStorage<string[]>(
    'named-faults-locations',
    [namedFaultsOptions[0].displayName],
  );
  const [localStorageParentFaultViews, setLocalStorageParentFaultViews] = useLocalStorage<string[]>(
    'parent-fault-views',
    [parentViewsOptions[0].displayName],
  );
  const [localStorageParentFault, setLocalStorageParentFault] = useLocalStorage<string | null>('parent-fault', null);
  const LocalStorageProvider = LocalStorageContext.Provider;

  return (
    <RelayEnvironmentProvider environment={env}>
      <ThemeProvider theme={theme}>
        <React.Suspense fallback={<Loading />}>
          <BrowserRouter>
            <LocalStorageProvider
              value={{
                ISFavourites,
                setISFavourites,
                localStorageRegionalViews,
                setLocalStorageRegionalViews,
                localStorageGeneralViews,
                setLocalStorageGeneralViews,
                localStorageNamedFaultsView,
                setLocalStorageNamedFaultsView,
                localStorageNamedFaultsLocations,
                setLocalStorageNamedFaultsLocations,
                localStorageParentFaultViews,
                setLocalStorageParentFaultViews,
                localStorageParentFault,
                setLocalStorageParentFault,
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
                    <Home preloadedQuery={preloadedQuery} />
                  </Route>
                </Switch>
              </Container>
            </LocalStorageProvider>
          </BrowserRouter>
        </React.Suspense>
      </ThemeProvider>
    </RelayEnvironmentProvider>
  );
}

export default AppRoot;
