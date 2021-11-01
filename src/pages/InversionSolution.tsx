import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useLazyLoadQuery, useQueryLoader } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';
import { Box, CircularProgress, makeStyles, Tab, Tabs, Theme, Typography } from '@material-ui/core';

import FavouriteControls from '../components/common/FavouriteControls';
import InversionSolutionDetailTab, {
  inversionSolutionDetailTabQuery,
} from '../components/inversionSolution/InversionSolutionDetailTab';
import InversionSolutionMfdTab from '../components/inversionSolution/InversionSolutionMfdTab';
import InversionSolutionHazardTab from '../components/inversionSolution/InversionSolutionHazardTab';
import RuptureSetDiags from '../components/RuptureSetDiags';
import { InversionSolutionQuery } from './__generated__/InversionSolutionQuery.graphql';
import { InversionSolutionDetailTabQuery } from '../components/inversionSolution/__generated__/InversionSolutionDetailTabQuery.graphql';
import DiagnosticReportTab from '../components/inversionSolution/DiagnosticReportTab';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
  },
  tabPanel: {
    width: '80%',
    padding: theme.spacing(2),
  },
  tab: {
    width: '20%',
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

interface InversionSolutionParams {
  id: string;
  tab: string;
}

const InversionSolution: React.FC = () => {
  const classes = useStyles();
  const { id, tab } = useParams<InversionSolutionParams>();
  const data = useLazyLoadQuery<InversionSolutionQuery>(inversionSolutionQuery, { id });
  const [queryRef, loadQuery] = useQueryLoader<InversionSolutionDetailTabQuery>(inversionSolutionDetailTabQuery);

  const history = useHistory();

  React.useEffect(() => {
    if (tab === undefined || tab === 'InversionSolutionDetailTab') {
      loadQuery({ id });
    }
  }, [tab]);

  if (!data?.node) {
    return (
      <Typography variant="h5" gutterBottom>
        File ID Not Found
      </Typography>
    );
  }

  const ruptureSetId = data?.node?.meta?.filter((kv) => kv?.k == 'rupture_set_file_id')[0]?.v;

  const tables = data.node?.tables;
  const hazardTable = tables?.find((table) => table?.table_type === 'HAZARD_SITES');
  const hazardTableId = hazardTable?.table_id as string;

  const mfdTableId = (): string => {
    if (data?.node?.mfd_table_id) return data?.node?.mfd_table_id;
    const new_mfd_table = data?.node?.tables?.filter((ltr) => ltr?.table_type == 'MFD_CURVES')[0];
    if (new_mfd_table) return new_mfd_table.table_id || '';
    return '';
  };

  const renderTab = () => {
    switch (tab) {
      default:
        return (
          // prettier-ignore
          <Box className={classes.tabPanel}>
            {queryRef && <InversionSolutionDetailTab queryRef={queryRef} />}           
          </Box>
        );
      case 'InversionSolutionMfdTab':
        return (
          <Box className={classes.tabPanel}>
            <React.Suspense fallback={<CircularProgress />}>
              {mfdTableId && <InversionSolutionMfdTab mfdTableId={mfdTableId()} meta={data?.node?.meta} />}
            </React.Suspense>
          </Box>
        );
      case 'InversionSolutionHazardTab':
        return (
          <Box className={classes.tabPanel}>
            <React.Suspense fallback={<CircularProgress />}>
              {hazardTableId && <InversionSolutionHazardTab id={hazardTableId} />}
            </React.Suspense>
          </Box>
        );
      case 'RuptureSetDiagnosticsTab':
        return (
          <Box className={classes.tabPanel}>
            {ruptureSetId && <RuptureSetDiags fileId={ruptureSetId} metaAsString={''} />}
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

  return (
    <>
      <Typography variant="h5" gutterBottom>
        InversionSolution: {data?.node?.id}&nbsp;
        <FavouriteControls id={data?.node?.id as string} producedBy={data?.node?.produced_by_id as string} />
      </Typography>
      <Box className={classes.root}>
        <Tabs
          orientation="vertical"
          value={tab ?? 'InversionSolutionDetailTab'}
          onChange={(e, val) => history.push(`/InversionSolution/${id}/${val}`)}
        >
          <Tab
            label="Detail"
            id="inversionSolutionDetailTab"
            value="InversionSolutionDetailTab"
            className={classes.tab}
          />
          <Tab label="MFD plot" id="inversionSolutionMfdTab" value="InversionSolutionMfdTab" className={classes.tab} />
          <Tab label="Solution Diags" id="DiagnosticReportTab" value="DiagnosticReportTab" className={classes.tab} />
          {ruptureSetId && (
            <Tab label="Rupture Diags" id="ruptureSetTab" value="RuptureSetDiagnosticsTab" className={classes.tab} />
          )}
          {hazardTableId && <Tab label="Hazard" value="InversionSolutionHazardTab" className={classes.tab} />}
        </Tabs>
        {renderTab()}
      </Box>
    </>
  );
};

export default InversionSolution;

const inversionSolutionQuery = graphql`
  query InversionSolutionQuery($id: ID!) {
    node(id: $id) {
      ... on InversionSolution {
        id
        mfd_table_id
        hazard_table_id
        produced_by_id
        created
        meta {
          k
          v
        }
        tables {
          table_id
          table_type
          created
        }
      }
    }
  }
`;