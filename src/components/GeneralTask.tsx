import React from 'react';
import { graphql } from 'babel-plugin-relay/macro';
import { useParams } from 'react-router-dom';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { GeneralTaskQuery } from './__generated__/GeneralTaskQuery.graphql';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import ChildTaskTable from './ChildTaskTable';

interface GeneralTaskParams {
  id: string;
}

const generalTaskQuery = graphql`
  query GeneralTaskQuery($id: ID!) {
    node(id: $id) {
      ... on GeneralTask {
        id
        title
        description
        created
        updated
        agent_name
        children {
          total_count
          edges {
            node {
              child {
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

const GeneralTask: React.FC = () => {
  const { id } = useParams<GeneralTaskParams>();
  const data = useLazyLoadQuery<GeneralTaskQuery>(generalTaskQuery, { id });

  if (!data?.node) {
    return (
      <Typography variant="h5" gutterBottom>
        General Task: Id Not Found
      </Typography>
    );
  }

  const createdDate = data?.node?.created ? format(new Date(data?.node?.created as string), 'PPPppp') : '-';
  const updatedDate = data?.node?.updated ? format(new Date(data?.node?.updated as string), 'PPPppp') : '-';
  const childTasks = data?.node?.children?.edges?.map((e) => e?.node?.child);

  return (
    <>
      <Typography variant="h5" gutterBottom>
        General Task: {data?.node?.title}
      </Typography>
      <Typography>
        <strong>Agent name: </strong>
        {data?.node?.agent_name}
      </Typography>
      <List dense>
        <ListItem>
          <ListItemText primary="Created" secondary={createdDate} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Updated" secondary={updatedDate} />
        </ListItem>
      </List>
      <Typography>
        <strong>Description:</strong>
      </Typography>
      <ReactMarkdown>{data?.node?.description ?? ''}</ReactMarkdown>
      <Typography>
        <strong>Child tasks:</strong>
      </Typography>
      {!!data?.node?.children?.edges?.length && <ChildTaskTable data={childTasks} />}
    </>
  );
};

export default GeneralTask;
