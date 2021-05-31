import React from 'react';
import { makeStyles, Paper, Table, TableBody, TableCell, TableHead, TableRow, withStyles } from '@material-ui/core';
import TruncateText from './TruncateText';

const useStyles = makeStyles({
  root: {
    marginTop: '40px',
    marginBottom: '40px',
  },
  table: {
    tableLayout: 'fixed',
    wordWrap: 'break-word',
  },
  tableCell: {
    borderBottom: 'none',
  },
});

const AlternatingRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.grey[100],
    },
  },
}))(TableRow);

export interface KeyValueTableProps {
  header: string;
  readonly data?: ReadonlyArray<{
    readonly k: string | null;
    readonly v: string | null;
  } | null> | null;
}

const KeyValueTable: React.FC<KeyValueTableProps> = ({ header, data }: KeyValueTableProps) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Table stickyHeader size="small" className={classes.table}>
        <TableHead>
          <AlternatingRow>
            <TableCell colSpan={2}>{header}</TableCell>
          </AlternatingRow>
        </TableHead>
        <TableBody>
          {data?.map((kv) => (
            <AlternatingRow key={kv?.k}>
              <TableCell className={classes.tableCell}>{kv?.k}</TableCell>
              <TableCell className={classes.tableCell}>{kv?.v}</TableCell>
            </AlternatingRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default KeyValueTable;
