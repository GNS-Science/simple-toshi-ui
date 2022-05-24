import React from 'react';
import { graphql } from 'babel-plugin-relay/macro';
import { useLazyLoadQuery } from 'react-relay/hooks';
import PredecessorView from './PredecessorView';
import { OpenquakeHazardSolutionPredecessorTabQuery } from './__generated__/OpenquakeHazardSolutionPredecessorTabQuery.graphql';

interface OpenquakeHazardSolutionPredecessorTabProps {
  id: string;
}

const OpenquakeHazardSolutionPredecessorTab: React.FC<OpenquakeHazardSolutionPredecessorTabProps> = ({
  id,
}: OpenquakeHazardSolutionPredecessorTabProps) => {
  const data = useLazyLoadQuery<OpenquakeHazardSolutionPredecessorTabQuery>(
    openquakeHazardSolutionPredecessorTabQuery,
    { id },
  );
  return <PredecessorView predecessors={data?.node?.predecessors} />;
};

export const openquakeHazardSolutionPredecessorTabQuery = graphql`
  query OpenquakeHazardSolutionPredecessorTabQuery($id: ID!) {
    node(id: $id) {
      ... on OpenquakeHazardSolution {
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

export default OpenquakeHazardSolutionPredecessorTab;
