import React from 'react';
import { graphql } from 'babel-plugin-relay/macro';
import { PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { Grid, List, ListItem, ListItemText, Box } from '@mui/material';
import { OpenquakeHazardSolutionDetailTabQuery } from './__generated__/OpenquakeHazardSolutionDetailTabQuery.graphql';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import HazardTable, { HazardTableProps } from './HazardTable';
import ConfigTable from './ConfigTable';
import TaskArgsTable from './TaskArgsTable';
import PredecessorView from './PredecessorView';

interface OpenquakeHazardSolutionDetailTabProps {
  queryRef: PreloadedQuery<OpenquakeHazardSolutionDetailTabQuery, Record<string, unknown>>;
}

const OpenquakeHazardSolutionDetailTab: React.FC<OpenquakeHazardSolutionDetailTabProps> = ({
  queryRef,
}: OpenquakeHazardSolutionDetailTabProps) => {
  const data = usePreloadedQuery<OpenquakeHazardSolutionDetailTabQuery>(
    openquakeHazardSolutionDetailTabQuery,
    queryRef,
  );
  const created = data?.node?.created ? (data?.node?.created as string) : undefined;
  const formattedDate = created ? format(new Date(created), 'PPPppp') : '';

  const hazard_solution: HazardTableProps = {
    hazard_solution: {
      id: data?.node?.id,
      created: data?.node?.created,
      csv_archive: data?.node?.csv_archive,
      hdf5_archive: data?.node?.hdf5_archive,
    },
  };

  return (
    <>
      <Grid container spacing={0} wrap={'nowrap'}>
        <Grid item xs={6}>
          <List dense>
            <ListItem>
              <ListItemText primary="Created" secondary={formattedDate} />
            </ListItem>
          </List>
          <ListItem>
            <ListItemText
              primary="Produced By"
              secondary={
                <Link to={`/OpenquakeHazardTask/${data?.node?.produced_by?.id}`}>{data?.node?.produced_by?.id}</Link>
              }
            />
          </ListItem>
        </Grid>
        <Grid item>
          <List>
            <ListItem>
              <ListItemText primary="Model Type" secondary={data?.node?.produced_by?.model_type} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Duration"
                secondary={`${Math.round(Number(data?.node?.produced_by?.duration))} seconds`}
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
      <ConfigTable config={data?.node?.config} />
      <TaskArgsTable task_args={data?.node?.task_args} />
      <HazardTable hazard_solution={hazard_solution.hazard_solution} />
      <Box>
        <PredecessorView predecessors={data?.node?.predecessors} />
      </Box>
    </>
  );
};

export const openquakeHazardSolutionDetailTabQuery = graphql`
  query OpenquakeHazardSolutionDetailTabQuery($id: ID!) {
    node(id: $id) {
      ... on OpenquakeHazardSolution {
        id
        created
        produced_by {
          id
          model_type
          duration
          state
          result
        }
        task_args {
          file_name
          file_url
          id
        }
        config {
          id
          created
          source_models {
            id
            file_name
            file_url
            meta {
              k
              v
            }
            source_solution {
              id
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
        predecessors {
          id
          typename
          relationship
          depth
          node {
            ... on FileInterface {
              file_name
              meta {
                k
                v
              }
            }
          }
        }
      }
    }
  }
`;

export default OpenquakeHazardSolutionDetailTab;
