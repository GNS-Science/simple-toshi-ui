import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const PREFIX = 'TaskArgsTable';

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

export interface TaskArgsTableProps {
  readonly task_args?:
    | {
        readonly file_name: string | null;
        readonly file_url: string | null;
        readonly id: string;
      }
    | null
    | undefined;
}

const TaskArgsTable: React.FC<TaskArgsTableProps> = ({ task_args }: TaskArgsTableProps) => {
  return (
    <StyledPaper className={classes.root}>
      <Table stickyHeader size="small" className={classes.table}>
        <TableHead>
          <AlternatingRow
            classes={{
              root: classes.root,
            }}
          >
            <TableCell colSpan={2}>Template Archive</TableCell>
          </AlternatingRow>
        </TableHead>
        <TableBody>
          <AlternatingRow classes={{ root: classes.root }}>
            <TableCell className={classes.tableCell}>{task_args?.file_name}</TableCell>
            <TableCell className={classes.tableCell}>
              <a href={task_args?.file_url ?? ''}>Get file</a>
              <Link style={{ marginLeft: '45%' }} to={`/FileDetail/${task_args?.id}`}>
                [more]
              </Link>
            </TableCell>
          </AlternatingRow>
        </TableBody>
      </Table>
    </StyledPaper>
  );
};

export default TaskArgsTable;
