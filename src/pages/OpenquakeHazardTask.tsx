import React from 'react';
import { graphql } from 'babel-plugin-relay/macro';
import { useParams } from 'react-router-dom';
import { useLazyLoadQuery } from 'react-relay';
import { Typography } from '@mui/material';
import { OpenquakeHazardTaskQuery } from './__generated__/OpenquakeHazardTaskQuery.graphql';
import InfoTable from '../components/InfoTable';
import KeyValueTable from '../components/common/KeyValueTable';
import HazardTable from '../components/openquakeHazard/HazardTable';
import TemplateArchiveTable from '../components/openquakeHazard/TemplateArchiveTable';
import ConfigTable from '../components/openquakeHazard/ConfigTable';

interface OpenquakeHazardTaskParams {
  id: string;
}

const OpenquakeHazardTask: React.FC = () => {
  const { id } = useParams<OpenquakeHazardTaskParams>();
  const data = useLazyLoadQuery<OpenquakeHazardTaskQuery>(openquakeHazardTaskQuery, { id });

  if (!data?.node) {
    return (
      <Typography variant="h5" gutterBottom>
        File ID Not Found
      </Typography>
    );
  }

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Openquake Hazard Task (id:{data?.node?.id})
      </Typography>
      <InfoTable
        created={data?.node?.created ? (data?.node?.created as string) : undefined}
        duration={data?.node?.duration}
        state={data?.node?.state}
        result={data?.node?.result}
        task_type={'HAZARD'}
        model_type={data?.node?.model_type}
      />
      {data?.node.arguments && <KeyValueTable header="Arguments" data={data?.node.arguments} />}
      <HazardTable hazard_solution={data?.node?.hazard_solution} solution_page={false} />
      <TemplateArchiveTable template_archive={data?.node?.config?.template_archive} />
      <ConfigTable config={data?.node?.config} solution_page={false} />
    </>
  );
};

const openquakeHazardTaskQuery = graphql`
  query OpenquakeHazardTaskQuery($id: ID!) {
    node(id: $id) {
      ... on OpenquakeHazardTask {
        id
        state
        result
        duration
        created
        model_type
        hazard_solution {
          id
          created
          csv_archive {
            id
            file_name
            file_size
            file_url
          }
          hdf5_archive {
            id
            file_name
            file_size
            file_url
          }
        }
        metrics {
          k
          v
        }
        arguments {
          k
          v
        }
        config {
          id
          created
          source_models {
            ... on Node {
              id
              __typename
            }
            ... on FileInterface {
              file_name
              file_url
              meta {
                k
                v
              }
            }
          }
          template_archive {
            meta {
              k
              v
            }
            file_name
            file_size
            file_url
            md5_digest
          }
        }
      }
    }
  }
`;

export default OpenquakeHazardTask;
