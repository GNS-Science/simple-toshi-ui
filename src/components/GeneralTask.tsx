import React from 'react';
import { graphql } from 'babel-plugin-relay/macro';
import { useParams } from 'react-router-dom';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { List, ListItem, ListItemText, Typography, CircularProgress } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { GeneralTaskQuery } from './__generated__/GeneralTaskQuery.graphql';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import GeneralTaskChildrenTab from './GeneralTaskChildrenTab';

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
        model_type
        subtask_type
        subtask_count
        subtask_result
        children {
          total_count
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

  const createdDate = data?.node?.created ? format(new Date(data?.node?.created as string), 'PPPppp') : '';
  const updatedDate = data?.node?.updated ? format(new Date(data?.node?.updated as string), 'PPPppp') : '';

  return (
    <>
      <Typography variant="h5" gutterBottom>
        General Task: {data?.node?.title}
      </Typography>

      <Typography>
        <strong>Model type:</strong> {data?.node?.model_type}
      </Typography>
      <Typography>
        <strong>Subtask type:</strong> {data?.node?.subtask_type}
      </Typography>
      <Typography>
        <strong>Subtask result:</strong> {data?.node?.subtask_result}
      </Typography>
      <Typography>
        <strong>Subtask count:</strong> {data?.node?.subtask_count}
      </Typography>
      <Typography>
        <strong>Agent name: </strong> {data?.node?.agent_name}
      </Typography>

      <List dense>
        <ListItem>
          <ListItemText primary="Created" secondary={createdDate} />
        </ListItem>
        {updatedDate && (
          <ListItem>
            <ListItemText primary="Updated" secondary={updatedDate} />
          </ListItem>
        )}
      </List>

      <Typography>
        <strong>Description:</strong>
      </Typography>
      <ReactMarkdown>{data?.node?.description ?? ''}</ReactMarkdown>

      <Accordion TransitionProps={{ unmountOnExit: true }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Child tasks:</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <React.Suspense fallback={<CircularProgress />}>
            <GeneralTaskChildrenTab id={id} />
          </React.Suspense>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default GeneralTask;
