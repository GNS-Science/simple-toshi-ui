import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { useHistory, useParams } from 'react-router-dom';
import { useLazyLoadQuery, useQueryLoader } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';
import { Box, CircularProgress, Tab, Tabs, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { ScaledInversionSolutionQuery } from './__generated__/ScaledInversionSolutionQuery.graphql';
import { ScaledInversionSolutionDetailTabQuery } from '../components/scaledInversionSolution/__generated__/ScaledInversionSolutionDetailTabQuery.graphql';
import ScaledInversionSolutionDetailTab, {
  scaledInversionSolutionDetailTabQuery,
} from '../components/scaledInversionSolution/ScaledInversionSolutionDetailTab';
import KeyValueTable from '../components/common/KeyValueTable';

interface ScaledInversionSolutionParams {
  id: string;
  tab: string;
}

const ScaledInversionSolution: React.FC = () => {
  const { id, tab } = useParams<ScaledInversionSolutionParams>();
  const data = useLazyLoadQuery<ScaledInversionSolutionQuery>(scaledInversionSolutionQuery, { id });
  // const [queryRef, loadQuery] = useQueryLoader<ScaledInversionSolutionDetailTabQuery>(
  //   scaledInversionSolutionDetailTabQuery,
  // );
  return (
    <>
      <Typography>
        <strong>File name:</strong> {data?.node?.file_name}
      </Typography>
      <Typography>
        <strong>Source Solution:</strong> {data?.node?.source_solution?.id}{' '}
        <Link to={`/InversionSolution/${data?.node?.source_solution?.id}`}>[more]</Link>
      </Typography>
      {data?.node?.meta && <KeyValueTable header="Meta" data={data?.node?.meta} />}
    </>
  );
};

const scaledInversionSolutionQuery = graphql`
  query ScaledInversionSolutionQuery($id: ID!) {
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

export default ScaledInversionSolution;
