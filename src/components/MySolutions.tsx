import { graphql } from 'babel-plugin-relay/macro';
import React, { useContext, useState } from 'react';
import { useLazyLoadQuery } from 'react-relay';
import LocalStorageContext from '../contexts/localStorage';
import { MySolutionsQuery } from './__generated__/MySolutionsQuery.graphql';

const MySolutions: React.FC = () => {
  const { ISFavourites } = useContext(LocalStorageContext);
  const [showList, setShowList] = useState(true);
  const id: string[] = [];

  for (const inversionSolution in ISFavourites) {
    id.push(ISFavourites[inversionSolution].producedBy);
  }

  const data = useLazyLoadQuery<MySolutionsQuery>(mySolutionsQuery, { id });
  console.log(data);
  return <>hello</>;
};

export default MySolutions;

export const mySolutionsQuery = graphql`
  query MySolutionsQuery($id: [ID!]) {
    nodes(id_in: $id) {
      result {
        edges {
          node {
            __typename
            ... on AutomationTask {
              id
              parents {
                edges {
                  node {
                    parent {
                      ... on GeneralTask {
                        id
                        created
                        title
                        description #hover
                        model_type
                        swept_arguments
                        notes #hover
                      }
                    }
                  }
                }
              }
              inversion_solution {
                id
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
  }
`;
