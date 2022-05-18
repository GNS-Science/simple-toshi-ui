import React from 'react';
import { Link } from 'react-router-dom';
import { PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { Typography } from '@mui/material';
import { graphql } from 'babel-plugin-relay/macro';

import { formatBytes } from '../FileDetail';
import { InversionSolutionDetailTabQuery } from './__generated__/InversionSolutionDetailTabQuery.graphql';
import KeyValueTable from '../common/KeyValueTable';

export const inversionSolutionDetailTabQuery = graphql`
  query InversionSolutionDetailTabQuery($id: ID!) {
    node(id: $id) {
      ... on InversionSolution {
        id
        produced_by_id
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
  const producedByIdString = Buffer.from(data?.node?.produced_by_id ?? '', 'base64').toString();
  const producedByType = producedByIdString.slice(0, producedByIdString.indexOf(':'));
  return (
    <>
      <Typography>
        <strong>File name:</strong> {data?.node?.file_name}
      </Typography>
      <Typography>
        <strong>Produced by:</strong>{' '}
        <Link to={`/${producedByType}/${data?.node?.produced_by_id}`}>
          {Buffer.from(data?.node?.produced_by_id ?? '', 'base64').toString()}
        </Link>
      </Typography>
      <Typography>
        <strong>File size:</strong> {formatBytes((data?.node?.file_size as number) ?? 0)}
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
