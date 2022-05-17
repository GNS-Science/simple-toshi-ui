import React from 'react';
import { graphql } from 'babel-plugin-relay/macro';
import { useParams } from 'react-router-dom';
import { useLazyLoadQuery } from 'react-relay';
import { Typography, Grid, List, ListItem, ListItemText } from '@mui/material';
import { OpenquakeHazardSolutionQuery } from './__generated__/OpenquakeHazardSolutionQuery.graphql';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import HazardTable, { HazardTableProps } from '../components/openquakeHazard/HazardTable';
import ConfigTable from '../components/openquakeHazard/ConfigTable';

interface OpenquakeHazardSolutionParams {
  id: string;
}

const OpenquakeHazardSolution: React.FC = () => {
  const { id } = useParams<OpenquakeHazardSolutionParams>();
  const data = useLazyLoadQuery<OpenquakeHazardSolutionQuery>(openquakeHazardSolutionQuery, { id });
  const created = data?.node?.created ? (data?.node?.created as string) : undefined;
  const formattedDate = created ? format(new Date(created), 'PPPppp') : '';

  const hazard_solution: HazardTableProps = {
    hazard_solution: {
      created: data?.node?.created,
      csv_archive: data?.node?.csv_archive,
      hdf5_archive: data?.node?.hdf5_archive,
    },
  };

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
        Openquake Hazard Solution (id:{data?.node?.id})
      </Typography>
      <Grid container wrap={'wrap'}>
        <List dense>
          <ListItem>
            <ListItemText primary="Created" secondary={formattedDate} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Produced By" secondary={data?.node?.produced_by?.id} />
            <Link
              style={{ position: 'relative', top: 8, left: 10 }}
              to={`/OpenquakeHazardTask/${data?.node?.produced_by?.id}`}
            >
              [more]
            </Link>
          </ListItem>
        </List>
      </Grid>
      <ConfigTable config={data?.node?.config} />
      <HazardTable hazard_solution={hazard_solution.hazard_solution} />
    </>
  );
};

const openquakeHazardSolutionQuery = graphql`
  query OpenquakeHazardSolutionQuery($id: ID!) {
    node(id: $id) {
      ... on OpenquakeHazardSolution {
        id
        created
        produced_by {
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

export default OpenquakeHazardSolution;
