import React from 'react';
import { PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { TimeDependentInversionSolutionDetailTabQuery } from './__generated__/TimeDependentInversionSolutionDetailTabQuery.graphql';
import KeyValueTable from '../common/KeyValueTable';

export const timeDependentInversionSolutionDetailTabQuery = graphql`
  query TimeDependentInversionSolutionDetailTabQuery($id: ID!) {
    node(id: $id) {
      __typename
      id
      ... on TimeDependentInversionSolution {
        file_name
        file_url
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

interface TimeDependentInversionSolutionDetailTabProps {
  queryRef: PreloadedQuery<TimeDependentInversionSolutionDetailTabQuery, Record<string, unknown>>;
}

const TimeDependentInversionSolutionDetailTab: React.FC<TimeDependentInversionSolutionDetailTabProps> = ({
  queryRef,
}: TimeDependentInversionSolutionDetailTabProps) => {
  const data = usePreloadedQuery<TimeDependentInversionSolutionDetailTabQuery>(
    timeDependentInversionSolutionDetailTabQuery,
    queryRef,
  );
  return (
    <>
      <Typography>
        <strong>File name:</strong> {data?.node?.file_name}{' '}
        <a href={data?.node?.file_url ? data?.node?.file_url : ''}>Get file</a>
      </Typography>
      <Typography>
        <strong>Source Solution:</strong> {data?.node?.source_solution?.id}{' '}
        <Link to={`/InversionSolution/${data?.node?.source_solution?.id}`}>[more]</Link>
      </Typography>
      <Typography>
        <strong>Produced By:</strong> {data?.node?.produced_by?.id}{' '}
        <Link to={`/AutomationTask/${data?.node?.produced_by?.id}`}>[more]</Link>
      </Typography>
      {data?.node?.meta && <KeyValueTable header="Meta" data={data?.node?.meta} />}
    </>
  );
};

export default TimeDependentInversionSolutionDetailTab;
