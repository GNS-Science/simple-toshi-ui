import { graphql } from 'babel-plugin-relay/macro';
import React from 'react';
import { useLazyLoadQuery } from 'react-relay';
import { PrecessorsViewQuery } from './__generated__/PrecessorsViewQuery.graphql';

interface PrecessorsViewProps {
  id: string;
}

const PrecessorView: React.FC<PrecessorsViewProps> = ({ id }: PrecessorsViewProps) => {
  const data = useLazyLoadQuery<PrecessorsViewQuery>(precessorsViewQuery, { id });

  return (
    <>
      <p>precessors View</p>
    </>
  );
};

export default PrecessorView;

export const precessorsViewQuery = graphql`
  query PrecessorsViewQuery($id: ID!) {
    node(id: $id) {
      id
      ... on OpenquakeHazardSolution {
        id
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
