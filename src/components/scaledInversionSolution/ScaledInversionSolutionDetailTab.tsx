import React from 'react';
import { Link } from 'react-router-dom';
import { PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { Typography } from '@mui/material';
import { graphql } from 'babel-plugin-relay/macro';

import { formatBytes } from '../FileDetail';
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
        <strong>Source Solution:</strong> {data?.node?.source_solution?.id}
      </Typography>
      {data?.node?.meta && <KeyValueTable header="Meta" data={data?.node?.meta} />}
    </>
  );
};

export default ScaledInversionSolutionDetailTab;
