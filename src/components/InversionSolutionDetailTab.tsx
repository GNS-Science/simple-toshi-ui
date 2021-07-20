import { Typography } from '@material-ui/core';
import { graphql } from 'babel-plugin-relay/macro';
import React from 'react';
import { PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { formatBytes } from './FileDetail';
import { InversionSolutionDetailTabQuery } from './__generated__/InversionSolutionDetailTabQuery.graphql';
import KeyValueTable from './KeyValueTable';

export const inversionSolutionDetailTabQuery = graphql`
  query InversionSolutionDetailTabQuery($id: ID!) {
    node(id: $id) {
      ... on InversionSolution {
        id
        file_name
        file_size
        file_url
        md5_digest
        meta {
          k
          v
        }
        metrics {
          k
          v
        }
      }
    }
  }
`;

interface InversionSolutionDetailTabProps {
  queryRef: PreloadedQuery<InversionSolutionDetailTabQuery, Record<string, unknown>>;
}

const InversionSolutionDetailTab: React.FC<InversionSolutionDetailTabProps> = ({
  queryRef,
}: InversionSolutionDetailTabProps) => {
  const data = usePreloadedQuery<InversionSolutionDetailTabQuery>(inversionSolutionDetailTabQuery, queryRef);

  return (
    <>
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
      {data?.node?.metrics && <KeyValueTable header="Metrics" data={data?.node?.metrics} />}
    </>
  );
};

export default InversionSolutionDetailTab;
