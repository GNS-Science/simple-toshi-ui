import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import { graphql } from 'babel-plugin-relay/macro';
import { useLazyLoadQuery } from 'react-relay';
import { AggregateInversionSolutionQuery } from './__generated__/AggregateInversionSolutionQuery.graphql';
import PredecessorView from '../components/openquakeHazard/PredecessorView';
import { styled } from '@mui/material/styles';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const PREFIX = 'AggregateInversionSolution';

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

interface AggregateInversionSolutionParams {
  id: string;
}
const AggregateInversionSolution: React.FC = () => {
  const { id } = useParams<AggregateInversionSolutionParams>();
  const data = useLazyLoadQuery<AggregateInversionSolutionQuery>(aggregateInversionSolutionQuery, { id });

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Aggregate Inversion Solution (id: {data?.node?.id as string})
      </Typography>
      <Typography>
        <strong>File name:</strong> {data?.node?.file_name}
      </Typography>
      <Typography>
        <strong>File size:</strong> {data?.node?.file_size ?? 0}
      </Typography>
      <Typography>
        <strong>Produced By:</strong>{' '}
        <Link to={`/AutomationTask/${data?.node?.produced_by?.id}`}>{data?.node?.produced_by?.id}</Link>
      </Typography>
      <Typography>
        <strong>MD5 digest:</strong> {data?.node?.md5_digest}
      </Typography>
      <Typography>
        <strong>Aggregation Function:</strong> {data?.node?.aggregation_fn}
      </Typography>
      <Typography>
        <strong>Common Rupture Set:</strong> {data?.node?.common_rupture_set ?? 'None'}
      </Typography>
      <StyledPaper>
        <Table stickyHeader size="small" className={classes.table}>
          <TableHead>
            <AlternatingRow
              classes={{
                root: classes.root,
              }}
            >
              <TableCell colSpan={2}>Source Models</TableCell>
            </AlternatingRow>
          </TableHead>
          <TableBody>
            {data?.node?.source_solutions?.map((source_solution) => (
              <>
                <AlternatingRow classes={{ root: classes.root }}>
                  <TableCell className={classes.tableCell}>{source_solution?.id ?? ''}</TableCell>
                  <TableCell className={classes.tableCell}>
                    <Link to={`/${source_solution?.__typename}/${source_solution?.id}`}>[more]</Link>
                  </TableCell>
                </AlternatingRow>
              </>
            ))}
          </TableBody>
        </Table>
        <PredecessorView predecessors={data?.node?.predecessors} />
      </StyledPaper>
    </>
  );
};

export const aggregateInversionSolutionQuery = graphql`
  query AggregateInversionSolutionQuery($id: ID!) {
    node(id: $id) {
      id
      __typename
      ... on AggregateInversionSolution {
        file_name
        file_size
        md5_digest
        created
        aggregation_fn
        common_rupture_set
        produced_by {
          ... on Node {
            id
            __typename
          }
        }
        source_solutions {
          ... on Node {
            id
            __typename
          }
        }
      }
      ... on PredecessorsInterface {
        predecessors {
          id
          typename
          depth
          relationship
          node {
            __typename
            ... on FileInterface {
              meta {
                k
                v
              }
              file_name
            }
          }
        }
      }
    }
  }
`;

export default AggregateInversionSolution;
