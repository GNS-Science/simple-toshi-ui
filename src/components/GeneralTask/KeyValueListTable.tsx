import React from 'react';
import { makeStyles, Paper, Table, TableBody, TableCell, TableHead, TableRow, withStyles } from '@material-ui/core';

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

export interface KeyValueListTableProps {
  header: string | null;
  readonly data?: readonly ({
    readonly k: string | null;
    readonly v: readonly (string | null)[] | null;
  } | null)[];
}

const renderValues = (vals: readonly (string | null)[] | null | undefined): string | null => {
  if (vals === null || vals === undefined) return '';
  if (vals.length === 1) {
    return vals[0];
  } else {
    const val_list = vals.reduce((x, accum) => accum + ', ' + x, '');
    return val_list ? val_list.slice(0, -2) : '';
  }
};

const KeyValueListTable: React.FC<KeyValueListTableProps> = ({ header, data }: KeyValueListTableProps) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Table stickyHeader size="small" className={classes.table}>
        {header && (
          <TableHead>
            <AlternatingRow>
              <TableCell colSpan={2}>{header}</TableCell>
            </AlternatingRow>
          </TableHead>
        )}
        <TableBody>
          {data?.map((kv) => (
            <AlternatingRow key={kv?.k}>
              <TableCell className={classes.tableCell}>{kv?.k}</TableCell>
              <TableCell className={classes.tableCell}>{renderValues(kv?.v)}</TableCell>
            </AlternatingRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default KeyValueListTable;
