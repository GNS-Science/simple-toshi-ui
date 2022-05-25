import React from 'react';
import { Link } from 'react-router-dom';
import { PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { Typography } from '@mui/material';
import { graphql } from 'babel-plugin-relay/macro';
import KeyValueTable from '../common/KeyValueTable';
import { AggregateInversionSolutionDetailTabQuery } from './__generated__/AggregateInversionSolutionDetailTabQuery.graphql';
import { formatBytes } from '../FileDetail';

interface AggregateInversionSolutionDetailTabProps {
  queryRef: PreloadedQuery<AggregateInversionSolutionDetailTabQuery, Record<string, unknown>>;
}

export const AggregateInversionSolutionDetailTab: React.FC<AggregateInversionSolutionDetailTabProps> = ({
  queryRef,
}: AggregateInversionSolutionDetailTabProps) => {
  const data = usePreloadedQuery<AggregateInversionSolutionDetailTabQuery>(
    aggregateInversionSolutionDetailTabQuery,
    queryRef,
  );

  return (
    <>
      <Typography>
        <strong>File name:</strong> {data?.node?.file_name}
      </Typography>
      <Typography>
        <strong>File size:</strong> {formatBytes(Number(data?.node?.file_size)) ?? 0}
      </Typography>
      <Typography>
        <strong>Produced By:</strong>{' '}
        <Link to={`/AutomationTask/${data?.node?.produced_by?.id}`}>{data?.node?.produced_by?.id}</Link>
      </Typography>
      <Typography>
        <strong>MD5 digest:</strong> {data?.node?.md5_digest}
      </Typography>
      <Typography>
        <strong>Aggregation Function:</strong> {data?.node?.aggregation_fn}
      </Typography>
      <KeyValueTable header={'Meta'} data={data?.node?.meta ?? []} />
    </>
  );
};

export const aggregateInversionSolutionDetailTabQuery = graphql`
  query AggregateInversionSolutionDetailTabQuery($id: ID!) {
    node(id: $id) {
      id
      __typename
      ... on AggregateInversionSolution {
        file_name
        file_size
        md5_digest
        created
        meta {
          k
          v
        }
        aggregation_fn
        # common_rupture_set
        produced_by {
          ... on Node {
            id
            __typename
          }
        }
      }
    }
  }
`;

export default AggregateInversionSolutionDetailTab;
