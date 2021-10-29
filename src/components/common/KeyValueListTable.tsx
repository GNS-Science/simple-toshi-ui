import React from 'react';
import { makeStyles, Paper, Table, TableBody, TableCell, TableHead, TableRow, withStyles } from '@material-ui/core';
import { GeneralTaskKeyValueListPairs } from '../../interfaces/generaltask';
import { renderArrayAsString } from '../../utils';

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
  readonly data?: GeneralTaskKeyValueListPairs;
}

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
              <TableCell className={classes.tableCell}>{renderArrayAsString(kv?.v)}</TableCell>
            </AlternatingRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default KeyValueListTable;
