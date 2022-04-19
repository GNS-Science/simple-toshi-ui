import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { graphql } from 'babel-plugin-relay/macro';
import { useLazyLoadQuery } from 'react-relay';
import { InversionSolutionNrmlQuery } from './__generated__/InversionSolutionNrmlQuery.graphql';
import KeyValueTable from '../components/common/KeyValueTable';
import { UnifiedInversionSolutionType } from '../interfaces/generaltask';

interface InversionSolutionNrmlParams {
  id: string;
}

const InversionSolutionNrml: React.FC = () => {
  const [sourceSolutionType, setSourceSolutionType] = useState<UnifiedInversionSolutionType>(
    UnifiedInversionSolutionType.INVERSION_SOLUTION,
  );
  const { id } = useParams<InversionSolutionNrmlParams>();
  const data = useLazyLoadQuery<InversionSolutionNrmlQuery>(inversionSolutionNrmlQuery, { id });

  useEffect(() => {
    if (data?.node?.__typename === 'InversionSolutionNrml') {
      const decoded = atob(data?.node?.source_solution?.id as string);
      decoded.includes('ScaledInversionSolution')
        ? setSourceSolutionType(UnifiedInversionSolutionType.SCALED_INVERSION_SOLUTION)
        : setSourceSolutionType(UnifiedInversionSolutionType.INVERSION_SOLUTION);
    }
  }, [data]);

  return (
    <>
      {data?.node?.__typename === 'InversionSolutionNrml' ? (
        <Box>
          <Typography variant="h5" gutterBottom>
            Inversion Solution Nrml (id: {data?.node?.id as string})
          </Typography>
          <Typography>
            <strong>File name:</strong> {data?.node?.file_name}
          </Typography>
          <Typography>
            <strong>File size:</strong> {data?.node?.file_size ?? 0}
          </Typography>
          <Typography>
            <strong>MD5 digest:</strong> {data?.node?.md5_digest}
          </Typography>
          <Typography>
            <strong>Source Solution:</strong>{' '}
            <a
              href={
                sourceSolutionType === UnifiedInversionSolutionType.INVERSION_SOLUTION
                  ? `/InversionSolution/${data?.node?.source_solution?.id}`
                  : `/ScaledInversionSolution/${data?.node?.source_solution?.id}`
              }
            >
              {data?.node?.source_solution?.id}
            </a>
          </Typography>
          <Typography>
            <a href={data?.node?.file_url ?? ''}>Download</a>
          </Typography>
          {data?.node?.meta && <KeyValueTable header="Meta" data={data?.node?.meta} />}
        </Box>
      ) : (
        <Typography>id not found</Typography>
      )}
    </>
  );
};

export default InversionSolutionNrml;

const inversionSolutionNrmlQuery = graphql`
  query InversionSolutionNrmlQuery($id: ID!) {
    node(id: $id) {
      __typename
      ... on InversionSolutionNrml {
        id
        source_solution {
          id
        }
        meta {
          k
          v
        }
        file_size
        md5_digest
        file_name
        file_url
      }
    }
  }
`;
