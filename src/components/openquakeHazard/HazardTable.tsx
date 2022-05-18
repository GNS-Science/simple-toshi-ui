import React from 'react';
import { styled } from '@mui/material/styles';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import TruncateText from '../TruncateText';
import { Link } from 'react-router-dom';

const PREFIX = 'HazardTable';

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

export interface HazardTableProps {
  readonly hazard_solution?:
    | {
        readonly id: string | undefined;
        readonly created: unknown | null;
        readonly csv_archive:
          | {
              readonly id: string;
              readonly file_name: string | null;
              readonly file_size: unknown | null;
              readonly file_url: string | null;
            }
          | null
          | undefined;
        readonly hdf5_archive:
          | {
              readonly id: string;
              readonly file_name: string | null;
              readonly file_size: unknown | null;
              readonly file_url: string | null;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
}

const HazardTable: React.FC<HazardTableProps> = ({ hazard_solution }: HazardTableProps) => {
  return (
    <StyledPaper className={classes.root}>
      <Table stickyHeader size="small" className={classes.table}>
        <colgroup>
          <col style={{ width: '50%' }} />
        </colgroup>
        <TableHead>
          <AlternatingRow
            classes={{
              root: classes.root,
            }}
          >
            <TableCell colSpan={3}>Hazard Solution</TableCell>
          </AlternatingRow>
        </TableHead>
        <TableBody>
          <AlternatingRow
            classes={{
              root: classes.root,
            }}
          >
            <TableCell colSpan={2}>{hazard_solution?.id}</TableCell>
            <TableCell>
              <Link to={`/HazardSolution/${hazard_solution?.id}`}>[more]</Link>
            </TableCell>
          </AlternatingRow>
          <AlternatingRow
            classes={{
              root: classes.root,
            }}
          >
            <TableCell>
              <TruncateText text={hazard_solution?.csv_archive?.file_name ?? ''} />
            </TableCell>
            <TableCell>
              <a href={hazard_solution?.csv_archive?.file_url ?? ''}>Get file</a>
            </TableCell>
            <TableCell>
              <Link to={`/FileDetail/${hazard_solution?.csv_archive?.id}`}>[more]</Link>
            </TableCell>
          </AlternatingRow>
          <AlternatingRow
            classes={{
              root: classes.root,
            }}
          >
            <TableCell>
              <TruncateText text={hazard_solution?.hdf5_archive?.file_name ?? ''} />
            </TableCell>
            <TableCell>
              <a href={hazard_solution?.hdf5_archive?.file_url ?? ''}>Get file</a>
            </TableCell>
            <TableCell>
              <Link to={`/FileDetail/${hazard_solution?.hdf5_archive?.id}`}>[more]</Link>
            </TableCell>
          </AlternatingRow>
        </TableBody>
      </Table>
    </StyledPaper>
  );
};

export default HazardTable;
