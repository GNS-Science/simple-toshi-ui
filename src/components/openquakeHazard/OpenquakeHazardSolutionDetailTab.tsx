import React from 'react';
import { graphql } from 'babel-plugin-relay/macro';
import { PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { Grid, List, ListItem, ListItemText } from '@mui/material';
import { format, formatDuration, intervalToDuration, secondsToMilliseconds } from 'date-fns';
import { Link } from 'react-router-dom';

import { OpenquakeHazardSolutionDetailTabQuery } from './__generated__/OpenquakeHazardSolutionDetailTabQuery.graphql';
import HazardTable, { HazardTableProps } from './HazardTable';
import ConfigTable from './ConfigTable';
import TaskArgsTable from './TaskArgsTable';

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
    solution_page: true,
    hazard_solution: {
      id: data?.node?.id,
      created: data?.node?.created,
      csv_archive: data?.node?.csv_archive,
      hdf5_archive: data?.node?.hdf5_archive,
    },
  };

  const duration = data?.node?.produced_by?.duration
    ? formatDuration(
        intervalToDuration({
          start: 0,
          end: secondsToMilliseconds(data?.node?.produced_by?.duration),
        }),
      )
    : '-';

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
              <ListItemText primary="Duration" secondary={duration} />
            </ListItem>
          </List>
        </Grid>
      </Grid>
      <HazardTable hazard_solution={hazard_solution.hazard_solution} solution_page={hazard_solution.solution_page} />
      <ConfigTable config={data?.node?.config} solution_page={true} />
      <TaskArgsTable task_args={data?.node?.task_args} />
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
            ... on Node {
              id
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
    }
  }
`;

export default OpenquakeHazardSolutionDetailTab;
