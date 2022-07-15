import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { useHistory, useParams } from 'react-router-dom';
import { useLazyLoadQuery, useQueryLoader } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import FavouriteControls from '../components/common/FavouriteControls';

import DiagnosticReportTab from '../components/inversionSolution/DiagnosticReportTab';
import { TimeDependentInversionSolutionQuery } from './__generated__/TimeDependentInversionSolutionQuery.graphql';
import { TimeDependentInversionSolutionDetailTabQuery } from '../components/timeDependentInversionSolution/__generated__/TimeDependentInversionSolutionDetailTabQuery.graphql';
import TimeDependentInversionSolutionDetailTab, {
  timeDependentInversionSolutionDetailTabQuery,
} from '../components/timeDependentInversionSolution/TimeDependentInversionSolutionDetailTab';

interface TimeDependentInversionSolutionParams {
  id: string;
  tab: string;
}

const PREFIX = 'TimeDependentInversionSolution';

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

const TimeDependentInversionSolution: React.FC = () => {
  const { id, tab } = useParams<TimeDependentInversionSolutionParams>();
  const data = useLazyLoadQuery<TimeDependentInversionSolutionQuery>(timeDependentInversionSolutionQuery, { id });
  const [queryRef, loadQuery] = useQueryLoader<TimeDependentInversionSolutionDetailTabQuery>(
    timeDependentInversionSolutionDetailTabQuery,
  );
  const history = useHistory();

  useEffect(() => {
    if (tab === undefined || tab === 'TimeDependentInversionSolutionDetailTab') {
      loadQuery({ id });
    }
  }, [id, loadQuery, tab]);

  const renderTab = () => {
    switch (tab) {
      default:
        return (
          // prettier-ignore
          <Box className={classes.tabPanel}>
            {queryRef && <TimeDependentInversionSolutionDetailTab queryRef={queryRef} />}           
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
        TimeDependentInversionSolution: {id}&nbsp;
        <FavouriteControls id={data?.node?.id as string} producedBy={data?.node?.produced_by?.id as string} />
      </Typography>
      <Box className={classes.root}>
        <Tabs
          orientation="vertical"
          value={tab ?? 'TimeDependentInversionSolutionDetailTab'}
          onChange={(e, val) => history.push(`/TimeDependentInversionSolution/${id}/${val}`)}
        >
          <Tab
            label="Detail"
            id="TimeDependentInversionSolutionDetailTab"
            value="TimeDependentInversionSolutionDetailTab"
            className={classes.tab}
          />
          <Tab label="Solution Diags" id="DiagnosticReportTab" value="DiagnosticReportTab" className={classes.tab} />
        </Tabs>
        {renderTab()}
      </Box>
    </Root>
  );
};

const timeDependentInversionSolutionQuery = graphql`
  query TimeDependentInversionSolutionQuery($id: ID!) {
    node(id: $id) {
      __typename
      id
      ... on TimeDependentInversionSolution {
        file_name
        created
        produced_by {
          ... on Node {
            id
          }
        }
        meta {
          k
          v
        }
        source_solution {
          ... on Node {
            id
          }
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

export default TimeDependentInversionSolution;
