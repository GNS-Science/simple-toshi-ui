import React from 'react';
import { graphql } from 'babel-plugin-relay/macro';
import { Link, useParams } from 'react-router-dom';
import { RuptureGenerationTaskQuery } from './__generated__/RuptureGenerationTaskQuery.graphql';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { Typography } from '@material-ui/core';
import KeyValueTable from './KeyValueTable';
import InfoTable from './InfoTable';
import FileTable from './FileTable';

const REFRESH_PERIOD = 3600000;

interface RuptureGenerationTaskParams {
  id: string;
}

const ruptureGenerationTaskQuery = graphql`
  query RuptureGenerationTaskQuery($id: ID!) {
    node(id: $id) {
      id
      ... on RuptureGenerationTask {
        id
        duration
        created
        result
        state
        files {
          edges {
            node {
              id
              role
              file {
                ... on File {
                  id
                  file_name
                  file_url
                }
              }
            }
          }
        }
        arguments {
          k
          v
        }
        environment {
          k
          v
        }
        metrics {
          k
          v
        }
        parents {
          edges {
            node {
              parent {
                ... on GeneralTask {
                  id
                }
              }
            }
          }
        }
      }
    }
  }
`;

const RuptureGenerationTask: React.FC = () => {
  const { id } = useParams<RuptureGenerationTaskParams>();
  const [fetchKey, setFetchKey] = React.useState<number>(0);

  React.useEffect(() => {
    const timeout = setTimeout(() => setFetchKey(fetchKey + 1), REFRESH_PERIOD);
    return () => {
      clearTimeout(timeout);
    };
  }, [fetchKey]);

  const data = useLazyLoadQuery<RuptureGenerationTaskQuery>(
    ruptureGenerationTaskQuery,
    { id },
    {
      fetchKey: fetchKey,
      fetchPolicy: 'network-only',
    },
  );

  if (!data?.node) {
    return (
      <Typography variant="h5" gutterBottom>
        Rupture Generation Task: Id Not Found
      </Typography>
    );
  }

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Rupture Generation Task (id: {data?.node?.id})
      </Typography>
      <InfoTable
        created={data?.node?.created ? (data?.node?.created as string) : undefined}
        duration={data?.node?.duration}
        state={data?.node?.state}
        result={data?.node?.result}
      />
      <Typography>
        <strong>Parent tasks: </strong>
        {data?.node?.parents?.edges?.map((e, i, { length }) => {
          return (
            <React.Fragment key={e?.node?.parent?.id}>
              <Link to={`/GeneralTask/${e?.node?.parent?.id}`}>
                {Buffer.from(e?.node?.parent?.id ?? '', 'base64').toString()}
              </Link>
              {i + 1 !== length && <span>, </span>}
            </React.Fragment>
          );
        })}
      </Typography>
      {!!data?.node?.files?.edges?.length && <FileTable data={data?.node?.files?.edges} />}
      {data?.node?.arguments && <KeyValueTable header="Arguments" data={data?.node?.arguments} />}
      {data?.node?.environment && <KeyValueTable header="Environment" data={data?.node?.environment} />}
      {data?.node?.metrics && <KeyValueTable header="Metrics" data={data?.node?.metrics} />}
    </>
  );
};

export default RuptureGenerationTask;
