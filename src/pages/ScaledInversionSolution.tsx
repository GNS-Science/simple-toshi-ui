import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { useHistory, useParams } from 'react-router-dom';
import { useLazyLoadQuery, useQueryLoader } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import FavouriteControls from '../components/common/FavouriteControls';

import DiagnosticReportTab from '../components/inversionSolution/DiagnosticReportTab';
import { ScaledInversionSolutionQuery } from './__generated__/ScaledInversionSolutionQuery.graphql';
import { ScaledInversionSolutionDetailTabQuery } from '../components/scaledInversionSolution/__generated__/ScaledInversionSolutionDetailTabQuery.graphql';
import ScaledInversionSolutionDetailTab, {
  scaledInversionSolutionDetailTabQuery,
} from '../components/scaledInversionSolution/ScaledInversionSolutionDetailTab';

interface ScaledInversionSolutionParams {
  id: string;
  tab: string;
}

const PREFIX = 'ScaledInversionSolution';

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

const ScaledInversionSolution: React.FC = () => {
  const { id, tab } = useParams<ScaledInversionSolutionParams>();
  const data = useLazyLoadQuery<ScaledInversionSolutionQuery>(scaledInversionSolutionQuery, { id });
  const [queryRef, loadQuery] = useQueryLoader<ScaledInversionSolutionDetailTabQuery>(
    scaledInversionSolutionDetailTabQuery,
  );
  const history = useHistory();

  useEffect(() => {
    if (tab === undefined || tab === 'ScaledInversionSolutionDetailTab') {
      loadQuery({ id });
    }
  }, [id, loadQuery, tab]);

  const renderTab = () => {
    switch (tab) {
      default:
        return (
          // prettier-ignore
          <Box className={classes.tabPanel}>
            {queryRef && <ScaledInversionSolutionDetailTab queryRef={queryRef} />}           
          </Box>
        );
      case 'DiagnosticReportTab':
        return (
          <Box className={classes.tabPanel}>
            <DiagnosticReportTab id={id} />
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
        ScaledInversionSolution: {id}&nbsp;
        <FavouriteControls id={data?.node?.id as string} producedBy={data?.node?.produced_by?.id as string} />
      </Typography>
      <Box className={classes.root}>
        <Tabs
          orientation="vertical"
          value={tab ?? 'ScaledInversionSolutionDetailTab'}
          onChange={(e, val) => history.push(`/ScaledInversionSolution/${id}/${val}`)}
        >
          <Tab
            label="Detail"
            id="ScaledInversionSolutionDetailTab"
            value="ScaledInversionSolutionDetailTab"
            className={classes.tab}
          />
          <Tab label="Solution Diags" id="DiagnosticReportTab" value="DiagnosticReportTab" className={classes.tab} />
        </Tabs>
        {renderTab()}
      </Box>
    </Root>
  );
};

const scaledInversionSolutionQuery = graphql`
  query ScaledInversionSolutionQuery($id: ID!) {
    node(id: $id) {
      __typename
      id
      ... on ScaledInversionSolution {
        file_name
        created
        produced_by {
          id
        }
        meta {
          k
          v
        }
        source_solution {
          id
          ... on InversionSolution {
            created
          }
        }
        relations {
          total_count
        }
      }
    }
  }
`;

export default ScaledInversionSolution;
