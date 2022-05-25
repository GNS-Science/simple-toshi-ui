import React from 'react';
import { graphql } from 'babel-plugin-relay/macro';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { AggregateInversionSolutionSourcesTabQuery } from './__generated__/AggregateInversionSolutionSourcesTabQuery.graphql';
import { Link } from 'react-router-dom';
import TruncateText from '../TruncateText';
import { styled } from '@mui/material/styles';

const PREFIX = 'AggregateInversionSolutionSourcesTab';

const classes = {
  root: `${PREFIX}-root`,
  root2: `${PREFIX}-root2`,
  table: `${PREFIX}-table`,
  tableCell: `${PREFIX}-tableCell`,
};

const StyledPaper = styled(Paper)({
  [`& .${classes.root2}`]: {
    marginTop: '40px',
    marginBottom: '40px',
  },
  [`& .${classes.table}`]: {
    tableLayout: 'fixed',
    wordWrap: 'break-word',
  },
  [`& .${classes.tableCell}`]: {
    borderBottom: 'none',
  },
});

const AlternatingRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

interface AggregateInversionSolutionSourcesTabProps {
  id: string;
}

const AggregateInversionSolutionSourcesTab: React.FC<AggregateInversionSolutionSourcesTabProps> = ({
  id,
}: AggregateInversionSolutionSourcesTabProps) => {
  const data = useLazyLoadQuery<AggregateInversionSolutionSourcesTabQuery>(aggregateInversionSolutionSourcesTabQuery, {
    id,
  });
  return (
    <StyledPaper className={classes.root}>
      <Table stickyHeader size="small" className={classes.table}>
        <TableHead>
          <AlternatingRow
            classes={{
              root: classes.root,
            }}
          >
            <TableCell colSpan={4}>Source Models</TableCell>
          </AlternatingRow>
        </TableHead>
        <TableBody>
          {data?.node?.source_solutions?.map((source_model, i) => (
            <AlternatingRow key={i}>
              <TableCell colSpan={2}>
                <TruncateText text={source_model?.file_name ?? ''} />
              </TableCell>
              <TableCell>
                <a href={source_model?.file_url ?? ''}>Get file</a>
              </TableCell>
              <TableCell>
                <Link to={`/${source_model?.__typename}/${source_model?.id}`}>[more]</Link>
              </TableCell>
            </AlternatingRow>
          ))}
        </TableBody>
      </Table>
    </StyledPaper>
  );
};

export const aggregateInversionSolutionSourcesTabQuery = graphql`
  query AggregateInversionSolutionSourcesTabQuery($id: ID!) {
    node(id: $id) {
      id
      __typename
      ... on AggregateInversionSolution {
        source_solutions {
          ... on Node {
            id
            __typename
          }
          ... on FileInterface {
            file_name
            file_url
          }
        }
      }
    }
  }
`;

export default AggregateInversionSolutionSourcesTab;
