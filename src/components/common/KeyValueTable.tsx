import React from 'react';
import { styled } from '@mui/material/styles';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { ArgumentKeyValuePair } from '../../interfaces/common';

const PREFIX = 'KeyValueTable';

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

const AlternatingRow = TableRow;

export interface KeyValueTableProps {
  header: string;
  readonly data?: ReadonlyArray<ArgumentKeyValuePair | null> | null;
}

const KeyValueTable: React.FC<KeyValueTableProps> = ({ header, data }: KeyValueTableProps) => {
  return (
    <StyledPaper className={classes.root}>
      <Table stickyHeader size="small" className={classes.table}>
        <TableHead>
          <AlternatingRow
            classes={{
              root: classes.root,
            }}
          >
            <TableCell colSpan={2}>{header}</TableCell>
          </AlternatingRow>
        </TableHead>
        <TableBody>
          {data?.map((kv) => (
            <AlternatingRow
              key={kv?.k}
              classes={{
                root: classes.root,
              }}
            >
              <TableCell className={classes.tableCell}>{kv?.k}</TableCell>
              <TableCell className={classes.tableCell}>{kv?.v}</TableCell>
            </AlternatingRow>
          ))}
        </TableBody>
      </Table>
    </StyledPaper>
  );
};

export default KeyValueTable;
