import React from 'react';
import { graphql } from 'babel-plugin-relay/macro';
import { useParams } from 'react-router-dom';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { Typography, CircularProgress } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { GeneralTaskQuery } from './__generated__/GeneralTaskQuery.graphql';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import GeneralTaskChildrenTab from './GeneralTaskChildrenTab';
import KeyValueListTable from './KeyValueListTable';

interface GeneralTaskParams {
  id: string;
}

interface KeyValueListPair {
  readonly k: string | null;
  readonly v: readonly (string | null)[] | null;
}

type KeyValueListPairs = readonly (KeyValueListPair | null)[];

const generalTaskQuery = graphql`
  query GeneralTaskQuery($id: ID!) {
    node(id: $id) {
      ... on GeneralTask {
        id
        title
        description
        notes
        created
        updated
        agent_name
        model_type
        subtask_type
        subtask_count
        subtask_result
        argument_lists {
          k
          v
        }
        swept_arguments
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

  const sweptArguments = data?.node?.swept_arguments ?? [''];
  const argumentLists = data?.node?.argument_lists ?? [];

  const sweepsList = (arg_lists: KeyValueListPairs, sweeps: readonly (string | null)[]) => {
    if (arg_lists) return arg_lists.filter((el) => sweeps.includes(el ? el.k : ''));
    return [];
  };

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
      <Typography>
        <strong>Created: </strong> {createdDate}
      </Typography>
      {updatedDate && (
        <Typography>
          <strong>Updated: </strong> {updatedDate}
        </Typography>
      )}

      <Typography>
        <strong>Description:</strong>
      </Typography>
      <ReactMarkdown>{data?.node?.description ?? ''}</ReactMarkdown>
      {data?.node?.notes && (
        <span>
          <Typography>
            <strong>Notes:</strong>
          </Typography>
          <ReactMarkdown>{data?.node?.notes}</ReactMarkdown>
        </span>
      )}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>
            <strong>Swept Arguments</strong>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {data?.node?.argument_lists && (
            <KeyValueListTable header={null} data={sweepsList(argumentLists, sweptArguments)} />
          )}
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>
            <strong>All Arguments</strong>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {data?.node?.argument_lists && <KeyValueListTable header={null} data={data?.node?.argument_lists} />}
        </AccordionDetails>
      </Accordion>

      <Accordion TransitionProps={{ unmountOnExit: true }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>
            <strong>Child tasks</strong>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <React.Suspense fallback={<CircularProgress />}>
            <GeneralTaskChildrenTab sweepArgs={sweepsList(argumentLists, sweptArguments)} id={id} />
          </React.Suspense>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default GeneralTask;
