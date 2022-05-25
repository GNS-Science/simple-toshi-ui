import React from 'react';
import { graphql } from 'babel-plugin-relay/macro';
import { useLazyLoadQuery } from 'react-relay/hooks';
import PredecessorView from '../common/PredecessorView';
import { AggregateInversionSolutionPredecessorTabQuery } from './__generated__/AggregateInversionSolutionPredecessorTabQuery.graphql';

interface AggregateInversionSolutionPredecessorTabProps {
  id: string;
}

const AggregateInversionSolutionPredecessorTab: React.FC<AggregateInversionSolutionPredecessorTabProps> = ({
  id,
}: AggregateInversionSolutionPredecessorTabProps) => {
  const data = useLazyLoadQuery<AggregateInversionSolutionPredecessorTabQuery>(
    aggregateInversionSolutionPredecessorTabQuery,
    { id },
  );
  return <PredecessorView predecessors={data?.node?.predecessors} />;
};

export const aggregateInversionSolutionPredecessorTabQuery = graphql`
  query AggregateInversionSolutionPredecessorTabQuery($id: ID!) {
    node(id: $id) {
      ... on AggregateInversionSolution {
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

export default AggregateInversionSolutionPredecessorTab;
