import { Typography } from '@material-ui/core';
import { graphql } from 'babel-plugin-relay/macro';
import React from 'react';
import { PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { formatBytes } from './FileDetail';
import { FileDetailTabQuery } from './__generated__/FileDetailTabQuery.graphql';
import KeyValueTable from './common/KeyValueTable';

export const fileDetailTabQuery = graphql`
  query FileDetailTabQuery($id: ID!) {
    node(id: $id) {
      ... on File {
        id
        file_name
        file_size
        file_url
        md5_digest
        meta {
          k
          v
        }
      }
    }
  }
`;

interface FileDetailTabProps {
  queryRef: PreloadedQuery<FileDetailTabQuery, Record<string, unknown>>;
}

const FileDetailTab: React.FC<FileDetailTabProps> = ({ queryRef }: FileDetailTabProps) => {
  const data = usePreloadedQuery<FileDetailTabQuery>(fileDetailTabQuery, queryRef);

  return (
    <>
      <Typography variant="h5" gutterBottom>
        File Detail (id: {data?.node?.id})
      </Typography>
      <Typography>
        <strong>File name:</strong> {data?.node?.file_name}
      </Typography>
      <Typography>
        <strong>File size:</strong> {formatBytes(data?.node?.file_size ?? 0)}
      </Typography>
      <Typography>
        <strong>MD5 digest:</strong> {data?.node?.md5_digest}
      </Typography>
      <Typography>
        <a href={data?.node?.file_url ?? ''}>Download</a>
      </Typography>
      {data?.node?.meta && <KeyValueTable header="Meta" data={data?.node?.meta} />}
    </>
  );
};

export default FileDetailTab;
