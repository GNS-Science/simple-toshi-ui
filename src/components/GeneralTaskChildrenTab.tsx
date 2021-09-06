import React from 'react';
import { graphql } from 'babel-plugin-relay/macro';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { Typography } from '@material-ui/core';
import ChildTaskTable from './ChildTaskTable';

import { GeneralTaskChildrenTabQuery } from './__generated__/GeneralTaskChildrenTabQuery.graphql';

const generalTaskChildrenTabQuery = graphql`
  query GeneralTaskChildrenTabQuery($id: ID!) {
    node(id: $id) {
      ... on GeneralTask {
        id
        children {
          edges {
            node {
              child {
                ... on AutomationTask {
                  __typename
                  id
                  created
                  duration
                  state
                  result
                }
                ... on RuptureGenerationTask {
                  __typename
                  id
                  created
                  duration
                  state
                  result
                }
              }
            }
          }
        }
      }
    }
  }
`;

interface GeneralTaskChildrenTabProps {
  id: string;
}

const GeneralTaskChildrenTab: React.FC<GeneralTaskChildrenTabProps> = ({ id }: GeneralTaskChildrenTabProps) => {
  const data = useLazyLoadQuery<GeneralTaskChildrenTabQuery>(generalTaskChildrenTabQuery, { id });

  if (!data?.node) {
    return (
      <Typography variant="h5" gutterBottom>
        General Task: Id Not Found
      </Typography>
    );
  }

  const childTasks = data?.node?.children?.edges?.map((e) => e?.node?.child);

  return <>{!!data?.node?.children?.edges?.length && <ChildTaskTable data={childTasks} />}</>;
};

export default GeneralTaskChildrenTab;
