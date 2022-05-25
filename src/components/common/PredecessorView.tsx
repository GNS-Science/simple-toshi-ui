import React from 'react';
import { Card, Accordion, AccordionDetails, AccordionSummary, Typography, styled } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyValueTable from '../common/KeyValueTable';

export type Predecessor =
  | ReadonlyArray<{
      readonly id: string | null;
      readonly typename: string | null;
      readonly relationship: string | null;
      readonly depth: number | null;
      readonly node: {
        readonly file_name?: string | null | undefined;
        readonly meta?:
          | ReadonlyArray<{
              readonly k: string | null;
              readonly v: string | null;
            } | null>
          | null
          | undefined;
      } | null;
    } | null>
  | null
  | undefined;

const PredecessorCard = styled(Card)({
  marginBottom: 5,
});

const PredecessorContainer = styled(Card)({
  padding: 5,
  borderRadius: 5,
  fontSize: '0.875rem',
});

const PredecessorTitle = styled(Typography)({
  fontWeight: 500,
  fontSize: '0.875rem',
  padding: 5,
});

interface PredecessorViewProps {
  predecessors:
    | ReadonlyArray<{
        readonly id: string | null;
        readonly typename: string | null;
        readonly relationship: string | null;
        readonly depth: number | null;
        readonly node: {
          readonly file_name?: string | null | undefined;
          readonly meta?:
            | ReadonlyArray<{
                readonly k: string | null;
                readonly v: string | null;
              } | null>
            | null
            | undefined;
        } | null;
      } | null>
    | null
    | undefined;
}

const getType = (type: string) => {
  if (type === 'File') {
    return 'FileDetail';
  } else {
    return type;
  }
};

const PredecessorView: React.FC<PredecessorViewProps> = ({ predecessors }: PredecessorViewProps) => {
  return (
    <>
      <PredecessorContainer>
        <PredecessorTitle>Predecessors</PredecessorTitle>
        {predecessors &&
          predecessors.map((predecessor) => {
            if (predecessor !== null) {
              return (
                <PredecessorCard key={Math.random()}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <strong>{predecessor.relationship}:</strong>&nbsp;{predecessor.typename}&nbsp;&nbsp;
                    </AccordionSummary>
                    <AccordionDetails>
                      {predecessor.node?.meta && <KeyValueTable header="Meta" data={predecessor.node?.meta} />}
                      <Typography>
                        <br />
                        <a href={`/${getType(predecessor.typename as string)}/${predecessor.id}`}>[more]</a>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </PredecessorCard>
              );
            }
          })}
      </PredecessorContainer>
    </>
  );
};

export default PredecessorView;
