import React from 'react';
import { graphql } from 'babel-plugin-relay/macro';
import { styled } from '@mui/material/styles';
import { useHistory, useParams } from 'react-router-dom';
import { useLazyLoadQuery, useQueryLoader } from 'react-relay';
import { CircularProgress, Typography, Box, Tab, Tabs } from '@mui/material';

import { OpenquakeHazardSolutionQuery } from './__generated__/OpenquakeHazardSolutionQuery.graphql';
import { OpenquakeHazardSolutionDetailTabQuery } from '../components/openquakeHazard/__generated__/OpenquakeHazardSolutionDetailTabQuery.graphql';
import OpenquakeHazardSolutionDetailTab, {
  openquakeHazardSolutionDetailTabQuery,
} from '../components/openquakeHazard/OpenquakeHazardSolutionDetailTab';
import OpenquakeHazardSolutionDiagnosticReportTab from '../components/openquakeHazard/OpenquakeHazardSolutionDiagnosticReportTab';

const PREFIX = 'OpenquakeHazardSolution';

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

interface OpenquakeHazardSolutionParams {
  id: string;
  tab: string;
}

const OpenquakeHazardSolution: React.FC = () => {
  const { id, tab } = useParams<OpenquakeHazardSolutionParams>();
  const data = useLazyLoadQuery<OpenquakeHazardSolutionQuery>(openquakeHazardSolutionQuery, { id });
  const [queryRef, loadQuery] = useQueryLoader<OpenquakeHazardSolutionDetailTabQuery>(
    openquakeHazardSolutionDetailTabQuery,
  );
  const history = useHistory();

  React.useEffect(() => {
    if (tab === undefined || tab === 'Detail') {
      loadQuery({ id });
    }
  }, [id, loadQuery, tab]);

  const renderTab = () => {
    switch (tab) {
      default:
        return (
          <Box className={classes.tabPanel}>{queryRef && <OpenquakeHazardSolutionDetailTab queryRef={queryRef} />}</Box>
        );
      case 'DiagnosticReport':
        return (
          <React.Suspense fallback={<CircularProgress />}>
            <Box className={classes.tabPanel}>
              <OpenquakeHazardSolutionDiagnosticReportTab id={id} />
            </Box>
          </React.Suspense>
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
        Openquake Hazard Solution (id:{data?.node?.id})
      </Typography>
      <Box className={classes.root}>
        <Tabs
          orientation="vertical"
          value={tab ?? 'Detail'}
          onChange={(e, val) => history.push(`/HazardSolution/${id}/${val}`)}
        >
          <Tab label="Detail" id="openquakeHazardDetailTab" value={'Detail'} className={classes.tab} />
          <Tab label="Rupture Diags" id="DiagnosticReport" value={'DiagnosticReport'} className={classes.tab} />
        </Tabs>
        {renderTab()}
      </Box>
    </Root>
  );
};

const openquakeHazardSolutionQuery = graphql`
  query OpenquakeHazardSolutionQuery($id: ID!) {
    node(id: $id) {
      ... on OpenquakeHazardSolution {
        id
        produced_by {
          id
        }
      }
    }
  }
`;

export default OpenquakeHazardSolution;
