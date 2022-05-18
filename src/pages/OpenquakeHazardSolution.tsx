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
import PredecessorView, { Predecessor } from '../components/predecessorView/PredecessorView';

const predecessors: Predecessor = [
  {
    id: 'SW52ZXJzaW9uU29sdXRpb25Ocm1sOjEwMDg2Nw==',
    typename: 'InversionSolutionNrml',
    relationship: 'Parent',
    depth: -1,
    node: {
      file_name: 'NZSHM22_ScaledInversionSolution-QXV0b21hdGlvblRhc2s6MTAwODk0_nrml.zip',
      meta: [
        {
          k: 'rupture_sampling_distance_km',
          v: '0.5',
        },
        {
          k: 'investigation_time_years',
          v: '1.0',
        },
        {
          k: 'tectonic_region_type',
          v: 'Subduction Interface',
        },
        {
          k: 'solution_id',
          v: 'U2NhbGVkSW52ZXJzaW9uU29sdXRpb246MTAwODYz',
        },
        {
          k: 'file_name',
          v: 'NZSHM22_ScaledInversionSolution-QXV0b21hdGlvblRhc2s6MTAwODk0.zip',
        },
        {
          k: 'model_type',
          v: 'SUBDUCTION',
        },
        {
          k: 'prefix',
          v: 'U2NhbGVkSW52ZXJzaW9uU29sdXRpb246MTAwODYz',
        },
      ],
    },
  },
  {
    id: 'U2NhbGVkSW52ZXJzaW9uU29sdXRpb246MTAwODYz',
    typename: 'ScaledInversionSolution',
    relationship: 'Grandparent',
    depth: -2,
    node: {
      file_name: 'NZSHM22_ScaledInversionSolution-QXV0b21hdGlvblRhc2s6MTAwODk0.zip',
      meta: [
        {
          k: 'scale',
          v: '0.61',
        },
        {
          k: 'model_type',
          v: 'SUBDUCTION',
        },
      ],
    },
  },
  {
    id: 'SW52ZXJzaW9uU29sdXRpb246MTAwODYx',
    typename: 'InversionSolution',
    relationship: 'Great_Grandparent',
    depth: -3,
    node: {
      file_name: 'NZSHM22_InversionSolution-QXV0b21hdGlvblRhc2s6MTAwODkx.zip',
      meta: [
        {
          k: 'round',
          v: '0',
        },
        {
          k: 'config_type',
          v: 'subduction',
        },
        {
          k: 'rupture_set_file_id',
          v: 'RmlsZToyMzAxLjBSZWthZg==',
        },
        {
          k: 'rupture_set',
          v: '/work/chrisdc/NZSHM-WORKING/TEST/downloads/RmlsZToyMzAxLjBSZWthZg==/RupSet_Sub_FM(SBD_0_3_HKR_LR_30)_mnSbS(2)_mnSSPP(2)_mxSSL(0.5)_ddAsRa(2.0,5.0,5)_ddMnFl(0.1)_ddPsCo(0.0)_ddSzCo(0.0)_thFc(0.0).zip',
        },
        {
          k: 'completion_energy',
          v: '0.0',
        },
        {
          k: 'max_inversion_time',
          v: '1',
        },
        {
          k: 'mfd_equality_weight',
          v: '10000.0',
        },
        {
          k: 'mfd_inequality_weight',
          v: '0',
        },
        {
          k: 'slip_rate_weighting_type',
          v: 'BOTH',
        },
        {
          k: 'slip_rate_normalized_weight',
          v: '1000.0',
        },
        {
          k: 'slip_rate_unnormalized_weight',
          v: '100000.0',
        },
        {
          k: 'mfd_mag_gt_5',
          v: '11.6',
        },
        {
          k: 'mfd_b_value',
          v: '0.97',
        },
        {
          k: 'mfd_transition_mag',
          v: '9.15',
        },
        {
          k: 'mfd_min_mag',
          v: '7.0',
        },
        {
          k: 'mfd_uncertainty_weight',
          v: '0',
        },
        {
          k: 'mfd_uncertainty_power',
          v: '0.001',
        },
        {
          k: 'mfd_uncertainty_scalar',
          v: '0.1',
        },
        {
          k: 'selection_interval_secs',
          v: '1',
        },
        {
          k: 'threads_per_selector',
          v: '4',
        },
        {
          k: 'averaging_threads',
          v: '4',
        },
        {
          k: 'averaging_interval_secs',
          v: '30',
        },
        {
          k: 'non_negativity_function',
          v: 'TRY_ZERO_RATES_OFTEN',
        },
        {
          k: 'perturbation_function',
          v: 'EXPONENTIAL_SCALE',
        },
        {
          k: 'scaling_relationship',
          v: 'SIMPLE_SUBDUCTION',
        },
        {
          k: 'scaling_recalc_mag',
          v: 'True',
        },
        {
          k: 'deformation_model',
          v: 'SBD_0_2A_HKR_LR_30',
        },
        {
          k: 'scaling_c_val',
          v: '4.0',
        },
        {
          k: 'initial_solution_id',
          v: 'None',
        },
        {
          k: 'b_and_n',
          v: "{'tag': 'b = 0.97, N = 11.6', 'b': 0.97, 'N': 11.6}",
        },
      ],
    },
  },
  {
    id: 'RmlsZToyMzAxLjBSZWthZg==',
    typename: 'File',
    relationship: 'Great_Great_Grandparent',
    depth: -4,
    node: {
      file_name:
        'RupSet_Sub_FM(SBD_0_3_HKR_LR_30)_mnSbS(2)_mnSSPP(2)_mxSSL(0.5)_ddAsRa(2.0,5.0,5)_ddMnFl(0.1)_ddPsCo(0.0)_ddSzCo(0.0)_thFc(0.0).zip',
      meta: [
        {
          k: 'fault_model',
          v: 'SBD_0_3_HKR_LR_30',
        },
        {
          k: 'min_aspect_ratio',
          v: '2.0',
        },
        {
          k: 'max_aspect_ratio',
          v: '5.0',
        },
        {
          k: 'aspect_depth_threshold',
          v: '5',
        },
        {
          k: 'min_fill_ratio',
          v: '0.1',
        },
        {
          k: 'growth_position_epsilon',
          v: '0.0',
        },
        {
          k: 'growth_size_epsilon',
          v: '0.0',
        },
        {
          k: 'scaling_relationship',
          v: 'TMG_SUB_2017',
        },
        {
          k: 'slip_along_rupture_model',
          v: 'UNIFORM',
        },
        {
          k: 'deformation_model',
          v: '',
        },
      ],
    },
  },
];

interface OpenquakeHazardSolutionParams {
  id: string;
}

const OpenquakeHazardSolution: React.FC = () => {
  const { id } = useParams<OpenquakeHazardSolutionParams>();
  const data = useLazyLoadQuery<OpenquakeHazardSolutionQuery>(openquakeHazardSolutionQuery, { id });
  const created = data?.node?.created ? (data?.node?.created as string) : undefined;
  const formattedDate = created ? format(new Date(created), 'PPPppp') : '';

  // const hazard_solution: HazardTableProps = {
  //   hazard_solution: {
  //     created: data?.node?.created,
  //     csv_archive: data?.node?.csv_archive,
  //     hdf5_archive: data?.node?.hdf5_archive,
  //   },
  // };

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
      {/* <ConfigTable config={data?.node?.config} /> */}
      {/* <HazardTable hazard_solution={hazard_solution.hazard_solution} /> */}
      <PredecessorView predecessors={predecessors} />
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
      }
    }
  }
`;

export default OpenquakeHazardSolution;
