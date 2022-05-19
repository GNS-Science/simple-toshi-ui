import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { useHistory, useParams } from 'react-router-dom';
import { useLazyLoadQuery, useQueryLoader } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';
import { Box, CircularProgress, Tab, Tabs, Typography } from '@mui/material';

import FavouriteControls from '../components/common/FavouriteControls';
import InversionSolutionDetailTab, {
  inversionSolutionDetailTabQuery,
} from '../components/inversionSolution/InversionSolutionDetailTab';
import InversionSolutionMfdTab from '../components/inversionSolution/InversionSolutionMfdTab';
import RuptureSetDiags from '../components/RuptureSetDiags';
import { InversionSolutionQuery } from './__generated__/InversionSolutionQuery.graphql';
import { InversionSolutionDetailTabQuery } from '../components/inversionSolution/__generated__/InversionSolutionDetailTabQuery.graphql';
import DiagnosticReportTab from '../components/inversionSolution/DiagnosticReportTab';
import InversionSolutionHazardCharts from '../components/inversionSolution/InversionSolutionHazardCharts';
import SolutionAnalysisTab from '../components/inversionSolution/SolutionAnalysisTab';

const PREFIX = 'InversionSolution';

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

interface InversionSolutionParams {
  id: string;
  tab: string;
}

const InversionSolution: React.FC = () => {
  const { id, tab } = useParams<InversionSolutionParams>();
  const data = useLazyLoadQuery<InversionSolutionQuery>(inversionSolutionQuery, { id });
  const [queryRef, loadQuery] = useQueryLoader<InversionSolutionDetailTabQuery>(inversionSolutionDetailTabQuery);

  const [mfdIsV2, setMfdIsV2] = useState<boolean>(false);
  const [mfdTableId, setMfdTableId] = useState<string>('');

  const history = useHistory();

  React.useEffect(() => {
    if (tab === undefined || tab === 'InversionSolutionDetailTab') {
      loadQuery({ id });
    }
  }, [id, loadQuery, tab]);

  const ruptureSetId = data?.node?.meta?.filter((kv) => kv?.k == 'rupture_set_file_id')[0]?.v;

  const tables = data.node?.tables;
  const hazardTable = tables?.find((table) => table?.table_type === 'HAZARD_SITES');
  const hazardTableId = hazardTable?.table_id as string;

  useEffect(() => {
    const V2table = tables?.find((table) => table?.table_type === 'MFD_CURVES_V2');
    const V1table = tables?.find((table) => table?.table_type === 'MFD_CURVES');
    tables?.some((table) => table?.table_type === 'MFD_CURVES_V2') && setMfdIsV2(true);
    V2table ? setMfdTableId(V2table?.table_id || '') : setMfdTableId(V1table?.table_id || '');
  }, [tables, data]);

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
              {mfdTableId && <InversionSolutionMfdTab isV2={mfdIsV2} mfdTableId={mfdTableId} meta={data?.node?.meta} />}
            </React.Suspense>
          </Box>
        );
      case 'InversionSolutionHazardTab':
        return (
          <Box className={classes.tabPanel}>
            <React.Suspense fallback={<CircularProgress />}>
              {hazardTableId && <InversionSolutionHazardCharts id={hazardTableId} />}
            </React.Suspense>
          </Box>
        );

      case 'SolutionAnalysisTab':
        return (
          <Box className={classes.tabPanel}>
            <SolutionAnalysisTab id={id} />
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
        InversionSolution: {data?.node?.id}&nbsp;
        <FavouriteControls id={data?.node?.id as string} producedBy={data?.node?.produced_by?.id as string} />
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
          {hazardTableId && <Tab label="Hazard Curves" value="InversionSolutionHazardTab" className={classes.tab} />}
          <Tab label="Solution Analysis" id="solutionAnalysisTab" value="SolutionAnalysisTab" className={classes.tab} />
          <Tab label="Solution Diags" id="DiagnosticReportTab" value="DiagnosticReportTab" className={classes.tab} />
          {ruptureSetId && (
            <Tab label="Rupture Diags" id="ruptureSetTab" value="RuptureSetDiagnosticsTab" className={classes.tab} />
          )}
        </Tabs>
        {renderTab()}
      </Box>
    </Root>
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
        tables {
          table_id
          table_type
          created
        }
      }
    }
  }
`;
