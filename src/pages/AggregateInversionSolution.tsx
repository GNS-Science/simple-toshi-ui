import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { graphql } from 'babel-plugin-relay/macro';
import { useLazyLoadQuery, useQueryLoader } from 'react-relay';
import { styled } from '@mui/material/styles';
import { Box, CircularProgress, Tab, Tabs } from '@mui/material';

import { AggregateInversionSolutionQuery } from './__generated__/AggregateInversionSolutionQuery.graphql';
import { AggregateInversionSolutionDetailTabQuery } from '../components/aggregateInversionSolution/__generated__/AggregateInversionSolutionDetailTabQuery.graphql';
import AggregateInversionSolutionDetailTab, {
  aggregateInversionSolutionDetailTabQuery,
} from '../components/aggregateInversionSolution/AggregateInversionSolutionDetailTab';
import AggregateInversionSolutionPredecessorTab from '../components/aggregateInversionSolution/AggregateInversionSolutionPredecessorTab';
import AggregateInversionSolutionSourcesTab from '../components/aggregateInversionSolution/AggregateInversionSolutionSourcesTab';

const PREFIX = 'AggregateInversionSolution';

const classes = {
  root: `${PREFIX}-root`,
  tabPanel: `${PREFIX}-tabPanel`,
  tab: `${PREFIX}-tab`,
};

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.root}`]: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
  },

  [`& .${classes.tabPanel}`]: {
    width: '80%',
    padding: theme.spacing(2),
  },

  [`& .${classes.tab}`]: {
    width: '20%',
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

interface AggregateInversionSolutionParams {
  id: string;
  tab: string;
}
const AggregateInversionSolution: React.FC = () => {
  const { id, tab } = useParams<AggregateInversionSolutionParams>();
  const data = useLazyLoadQuery<AggregateInversionSolutionQuery>(aggregateInversionSolutionQuery, { id });
  const history = useHistory();
  const [queryRef, loadQuery] = useQueryLoader<AggregateInversionSolutionDetailTabQuery>(
    aggregateInversionSolutionDetailTabQuery,
  );

  React.useEffect(() => {
    if (tab === undefined || tab === 'Details') {
      loadQuery({ id });
    }
  }, [id, loadQuery, tab]);

  const renderTab = () => {
    switch (tab) {
      default:
        return (
          <Box className={classes.tabPanel}>
            <React.Suspense fallback={<CircularProgress />}>
              {queryRef && <AggregateInversionSolutionDetailTab queryRef={queryRef} />}
            </React.Suspense>
          </Box>
        );
      case 'Parents':
        return (
          <Box className={classes.tabPanel}>
            <React.Suspense fallback={<CircularProgress />}>
              <AggregateInversionSolutionPredecessorTab id={id} />
            </React.Suspense>
          </Box>
        );
      case 'Sources':
        return (
          <Box className={classes.tabPanel}>
            <React.Suspense fallback={<CircularProgress />}>
              <AggregateInversionSolutionSourcesTab id={id} />
            </React.Suspense>
          </Box>
        );
    }
  };

  if (!data?.node) {
    return (
      <Typography variant="h5" gutterBottom>
        File ID Not Found
      </Typography>
    );
  }

  return (
    <Root>
      <Typography variant="h5" gutterBottom>
        Aggregate Inversion Solution (id: {data?.node?.id as string})
      </Typography>
      <Box className={classes.root}>
        <Tabs
          orientation="vertical"
          value={tab ?? 'Details'}
          onChange={(e, val) => history.push(`/AggregateInversionSolution/${id}/${val}`)}
        >
          <Tab label="Details" id="details" value="Details" className={classes.tab} />
          <Tab label="Parents" id="parents" value="Parents" className={classes.tab} />
          <Tab label="Sources" id="sources" value="Sources" className={classes.tab} />
        </Tabs>
        {renderTab()}
      </Box>
    </Root>
  );
};

export const aggregateInversionSolutionQuery = graphql`
  query AggregateInversionSolutionQuery($id: ID!) {
    node(id: $id) {
      id
      __typename
    }
  }
`;

export default AggregateInversionSolution;
