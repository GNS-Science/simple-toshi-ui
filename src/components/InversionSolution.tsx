import { Box, CircularProgress, makeStyles, Tab, Tabs, Theme, Typography } from '@material-ui/core';
import { graphql } from 'babel-plugin-relay/macro';
import React from 'react';
import { useLazyLoadQuery, useQueryLoader } from 'react-relay';
import { useHistory, useParams } from 'react-router-dom';
import InversionSolutionDetailTab, { inversionSolutionDetailTabQuery } from './InversionSolutionDetailTab';
import InversionSolutionMfdTab from './InversionSolutionMfdTab';
import InversionSolutionHazardTab from './InversionSolutionHazardTab';

import { InversionSolutionQuery } from './__generated__/InversionSolutionQuery.graphql';
import { InversionSolutionDetailTabQuery } from './__generated__/InversionSolutionDetailTabQuery.graphql';

import RuptureSetDiags from './RuptureSetDiags';
import { FileDetailQuery } from './__generated__/FileDetailQuery.graphql';
import { fileDetailQuery } from './FileDetail';

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

  // //const ruptureSetId = data?.node?.produced_by_id;
  const ruptureSetId = data?.node?.meta?.filter((kv) => kv?.k == 'rupture_set_file_id')[0]?.v;

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
              {queryRef && <InversionSolutionHazardTab queryRef={queryRef} />}
            </React.Suspense>
          </Box>
        );
      case 'RuptureSetDiagnosticsTab':
        return (
          <Box className={classes.tabPanel}>
            {ruptureSetId && <RuptureSetDiags fileId={ruptureSetId} metaAsString={metaAsString} />}
          </Box>
        );
    }
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>
        InversionSolution: {data?.node?.id}
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
          {/* <Tab
            label="Hazard map"
            id="inversionSolutionHazardTab"
            value="InversionSolutionHazardTab"
            className={classes.tab}
          />
          */}
          {ruptureSetId && (
            <Tab label="Rupture Diags" id="ruptureSetTab" value="RuptureSetDiagnosticsTab" className={classes.tab} />
          )}
        </Tabs>
        {renderTab()}
      </Box>
    </>
  );
};

export default InversionSolution;
