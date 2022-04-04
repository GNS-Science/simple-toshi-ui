import React from 'react';
import { PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { ScaledInversionSolutionDetailTabQuery } from './__generated__/ScaledInversionSolutionDetailTabQuery.graphql';
import KeyValueTable from '../common/KeyValueTable';

export const scaledInversionSolutionDetailTabQuery = graphql`
  query ScaledInversionSolutionDetailTabQuery($id: ID!) {
    node(id: $id) {
      __typename
      id
      ... on ScaledInversionSolution {
        file_name
        created
        produced_by {
          id
        }
        meta {
          k
          v
        }
        source_solution {
          id
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

interface ScaledInversionSolutionDetailTabProps {
  queryRef: PreloadedQuery<ScaledInversionSolutionDetailTabQuery, Record<string, unknown>>;
}

const ScaledInversionSolutionDetailTab: React.FC<ScaledInversionSolutionDetailTabProps> = ({
  queryRef,
}: ScaledInversionSolutionDetailTabProps) => {
  const data = usePreloadedQuery<ScaledInversionSolutionDetailTabQuery>(
    scaledInversionSolutionDetailTabQuery,
    queryRef,
  );
  return (
    <>
      <Typography>
        <strong>File name:</strong> {data?.node?.file_name}
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

export default ScaledInversionSolutionDetailTab;
