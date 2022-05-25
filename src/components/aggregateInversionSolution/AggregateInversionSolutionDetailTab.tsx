import React from 'react';
import { Link } from 'react-router-dom';
import { PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { Typography, styled } from '@mui/material';
import { graphql } from 'babel-plugin-relay/macro';
import KeyValueTable from '../common/KeyValueTable';
import { AggregateInversionSolutionDetailTabQuery } from './__generated__/AggregateInversionSolutionDetailTabQuery.graphql';
import { formatBytes } from '../FileDetail';

interface AggregateInversionSolutionDetailTabProps {
  queryRef: PreloadedQuery<AggregateInversionSolutionDetailTabQuery, Record<string, unknown>>;
}

const DetailText = styled(Typography)({
  fontSize: '0.875rem',
  margin: 2,
});

export const AggregateInversionSolutionDetailTab: React.FC<AggregateInversionSolutionDetailTabProps> = ({
  queryRef,
}: AggregateInversionSolutionDetailTabProps) => {
  const data = usePreloadedQuery<AggregateInversionSolutionDetailTabQuery>(
    aggregateInversionSolutionDetailTabQuery,
    queryRef,
  );

  return (
    <>
      <DetailText>
        <strong>File name:</strong> {data?.node?.file_name}
      </DetailText>
      <DetailText>
        <strong>File size:</strong> {formatBytes(Number(data?.node?.file_size)) ?? 0}
      </DetailText>
      <DetailText>
        <strong>Produced By:</strong>{' '}
        <Link to={`/AutomationTask/${data?.node?.produced_by?.id}`}>{data?.node?.produced_by?.id}</Link>
      </DetailText>
      <DetailText>
        <strong>MD5 digest:</strong> {data?.node?.md5_digest}
      </DetailText>
      <DetailText>
        <strong>Aggregation Function:</strong> {data?.node?.aggregation_fn}
      </DetailText>
      <DetailText>
        <strong>Common Rupture Set: </strong>{' '}
        <Link to={`/FileDetail/${data?.node?.common_rupture_set?.id}`}>{data?.node?.common_rupture_set?.id}</Link>
      </DetailText>
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
        common_rupture_set {
          ... on File {
            id
          }
        }
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
