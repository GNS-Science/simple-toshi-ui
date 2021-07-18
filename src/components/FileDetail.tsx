import { Box, CircularProgress, makeStyles, Tab, Tabs, Theme, Typography } from '@material-ui/core';
import { graphql } from 'babel-plugin-relay/macro';
import React from 'react';
import { useLazyLoadQuery, useQueryLoader } from 'react-relay';
import { useHistory, useParams } from 'react-router-dom';
import FileDetailTab, { fileDetailTabQuery } from './FileDetailTab';
import KeyValueTable from './KeyValueTable';
import RuptureSetDiags from './RuptureSetDiags';
import { FileDetailQuery } from './__generated__/FileDetailQuery.graphql';
import { FileDetailTabQuery } from './__generated__/FileDetailTabQuery.graphql';

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

interface FileDetailParams {
  id: string;
  tab: string;
}

const fileDetailQuery = graphql`
  query FileDetailQuery($id: ID!) {
    node(id: $id) {
      ... on File {
        id
        meta {
          k
          v
        }
      }
    }
  }
`;

/**
 * Formats bytes to human readable string. Adapted from:
 * https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript/
 */
export const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const FileDetail: React.FC = () => {
  const classes = useStyles();
  const { id, tab } = useParams<FileDetailParams>();
  const data = useLazyLoadQuery<FileDetailQuery>(fileDetailQuery, { id });
  const [queryRef, loadQuery] = useQueryLoader<FileDetailTabQuery>(fileDetailTabQuery);
  const history = useHistory();

  React.useEffect(() => {
    if (tab === undefined || tab === 'FileDetail') {
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

  const metaKeys = data?.node?.meta?.map((kv) => kv?.k ?? '');
  const hasRuptureSet = ['fault_model', 'max_jump_distance', 'scaling_relationship'].every((k) =>
    metaKeys?.includes(k),
  );

  const renderTab = () => {
    switch (tab) {
      case 'RuptureSetDiagnostics':
        return <Box className={classes.tabPanel}>{hasRuptureSet && <RuptureSetDiags fileId={id} />}</Box>;
      default:
        return (
          <Box className={classes.tabPanel}>
            <React.Suspense fallback={<CircularProgress />}>
              {queryRef && <FileDetailTab queryRef={queryRef} />}
            </React.Suspense>
          </Box>
        );
    }
  };

  return (
    <>
      <Box className={classes.root}>
        <Tabs
          orientation="vertical"
          value={tab ?? 'FileDetail'}
          onChange={(e, val) => history.push(`/FileDetail/${id}/${val}`)}
          className={classes.tab}
        >
          <Tab label="File Detail" id="fileDetailTab" value="FileDetail" />
          {hasRuptureSet && <Tab label="Rupture Set Diagnostics" id="ruptureSetTab" value="RuptureSetDiagnostics" />}
        </Tabs>
        {renderTab()}
      </Box>

      {data?.node?.meta && <KeyValueTable header="Meta" data={data?.node?.meta} />}
    </>
  );
};

export default FileDetail;
