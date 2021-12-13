import React from 'react';
import { styled } from '@mui/material/styles';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { GeneralTaskKeyValueListPairs } from '../../interfaces/generaltask';
import { renderArrayAsString } from '../../utils';

const PREFIX = 'KeyValueListTable';

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

export interface KeyValueListTableProps {
  header: string | null;
  readonly data?: GeneralTaskKeyValueListPairs;
}

const KeyValueListTable: React.FC<KeyValueListTableProps> = ({ header, data }: KeyValueListTableProps) => {
  return (
    <StyledPaper className={classes.root}>
      <Table stickyHeader size="small" className={classes.table}>
        {header && (
          <TableHead>
            <AlternatingRow
              classes={{
                root: classes.root,
              }}
            >
              <TableCell colSpan={2}>{header}</TableCell>
            </AlternatingRow>
          </TableHead>
        )}
        <TableBody>
          {data?.map((kv) => (
            <AlternatingRow
              key={kv?.k}
              classes={{
                root: classes.root,
              }}
            >
              <TableCell className={classes.tableCell}>{kv?.k}</TableCell>
              <TableCell className={classes.tableCell}>{renderArrayAsString(kv?.v)}</TableCell>
            </AlternatingRow>
          ))}
        </TableBody>
      </Table>
    </StyledPaper>
  );
};

export default KeyValueListTable;
