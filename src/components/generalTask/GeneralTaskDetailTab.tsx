import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import KeyValueListTable from './KeyValueListTable';
import { GeneralTaskQueryResponse } from './__generated__/GeneralTaskQuery.graphql';
import { SweepArguments } from '../../interfaces/generaltask';

interface GeneralTaskDetailTabProps {
  data: GeneralTaskQueryResponse;
  sweepArgs: SweepArguments;
}
const GeneralTaskDetailTab: React.FC<GeneralTaskDetailTabProps> = ({ data, sweepArgs }: GeneralTaskDetailTabProps) => {
  const createdDate = data?.node?.created ? format(new Date(data?.node?.created as string), 'PPPppp') : '';
  const updatedDate = data?.node?.updated ? format(new Date(data?.node?.updated as string), 'PPPppp') : '';
  return (
    <>
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
          {data?.node?.argument_lists && <KeyValueListTable header={null} data={sweepArgs} />}
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
    </>
  );
};

export default GeneralTaskDetailTab;
