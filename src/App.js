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

const { Suspense } = React;

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

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>This data arrives via graphql query from a dev server (see toshi-api flask-relay)</p>
        <p />
        <p><strong>StrongMotionStation</strong> id: "U3Ryb25nTW90aW9uU3RhdGlvbjow"</p>
        <p>site_code:&nbsp;{data.strong_motion_station.site_code}</p>
        <p>created:&nbsp;{data.strong_motion_station.created}</p>      
      </header>
    </div>
  );
}

// The above component needs to know how to access the Relay environment, and we
// need to specify a fallback in case it suspends:
// - <RelayEnvironmentProvider> tells child components how to talk to the current
//   Relay Environment instance
// - <Suspense> specifies a fallback in case a child suspends.
function AppRoot(props) {
  const environment = props.environment || RelayEnvironment;
  // Immediately load the query as our app starts. For a real app, we'd move this
  // into our routing configuration, preloading data as we transition to new routes.
  const preloadedQuery = loadQuery(environment, AppStrongMotionStationQuery, {
    /* query variables */
  });
  
  // console.log('E', environment);
  return (
    <RelayEnvironmentProvider environment={environment}>
      <Suspense fallback={'Loading OK...'}>
        <App preloadedQuery={preloadedQuery} />
      </Suspense>
    </RelayEnvironmentProvider>
  );
}

export default AppRoot;
