import React from 'react';
import { graphql } from 'babel-plugin-relay/macro';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { OpenquakeHazardSolutionSourcesTabQuery } from './__generated__/OpenquakeHazardSolutionSourcesTabQuery.graphql';
import { Link } from 'react-router-dom';
import TruncateText from '../TruncateText';
import { styled } from '@mui/material/styles';

const PREFIX = 'OpenquakeHazardSolutionSourcesTab';

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

interface OpenquakeHazardSolutionSourcesTabProps {
  id: string;
}

const OpenquakeHazardSolutionSourcesTab: React.FC<OpenquakeHazardSolutionSourcesTabProps> = ({
  id,
}: OpenquakeHazardSolutionSourcesTabProps) => {
  const data = useLazyLoadQuery<OpenquakeHazardSolutionSourcesTabQuery>(openquakeHazardSolutionSourcesTabQuery, { id });
  return (
    <StyledPaper className={classes.root}>
      <Table stickyHeader size="small" className={classes.table}>
        <TableHead>
          <AlternatingRow
            classes={{
              root: classes.root,
            }}
          >
            <TableCell colSpan={3}>Source Models</TableCell>
          </AlternatingRow>
        </TableHead>
        <TableBody>
          {data?.node?.config?.source_models?.map((source_model) => (
            <>
              <AlternatingRow>
                <TableCell>
                  <TruncateText text={source_model?.file_name ?? ''} />
                </TableCell>
                <TableCell>
                  <a href={source_model?.file_url ?? ''}>Get file</a>
                </TableCell>
                <TableCell>
                  <Link to={`/${source_model?.__typename}/${source_model?.id}`}>[more]</Link>
                </TableCell>
              </AlternatingRow>
              {source_model?.meta && (
                <AlternatingRow>
                  <TableCell colSpan={3}>
                    <strong>Meta</strong>
                  </TableCell>
                </AlternatingRow>
              )}
              {source_model?.meta &&
                source_model?.meta?.map((kv) => (
                  <AlternatingRow
                    key={kv?.k}
                    classes={{
                      root: classes.root,
                    }}
                  >
                    <TableCell className={classes.tableCell}>{kv?.k}</TableCell>
                    <TableCell colSpan={2} className={classes.tableCell}>
                      {kv?.v}
                    </TableCell>
                  </AlternatingRow>
                ))}
            </>
          ))}
        </TableBody>
      </Table>
    </StyledPaper>
  );
};

export const openquakeHazardSolutionSourcesTabQuery = graphql`
  query OpenquakeHazardSolutionSourcesTabQuery($id: ID!) {
    node(id: $id) {
      ... on OpenquakeHazardSolution {
        config {
          id
          created
          source_models {
            id
            __typename
            file_name
            file_url
            meta {
              k
              v
            }
          }
        }
      }
    }
  }
`;

export default OpenquakeHazardSolutionSourcesTab;
