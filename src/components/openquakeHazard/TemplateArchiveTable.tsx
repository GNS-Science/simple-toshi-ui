import React from 'react';
import { styled } from '@mui/material/styles';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const PREFIX = 'TemplateArchiveTable';

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

export interface TemplateArchiveTableProps {
  readonly template_archive:
    | {
        readonly meta: ReadonlyArray<{
          readonly k: string | null;
          readonly v: string | null;
        } | null> | null;
        readonly file_name: string | null;
        readonly file_size: number | null;
        readonly file_url: string | null;
        readonly md5_digest: string | null;
      }
    | null
    | undefined;
}

const TemplateArchiveTable: React.FC<TemplateArchiveTableProps> = ({ template_archive }: TemplateArchiveTableProps) => {
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
            <TableCell className={classes.tableCell}>{template_archive?.file_name}</TableCell>
            <TableCell className={classes.tableCell}>
              <a href={template_archive?.file_url ?? ''}>Get file</a>
            </TableCell>
          </AlternatingRow>
          {template_archive?.meta?.map((meta, index) => (
            <AlternatingRow
              key={index}
              classes={{
                root: classes.root,
              }}
            >
              <TableCell className={classes.tableCell}>{meta?.k}</TableCell>
              <TableCell className={classes.tableCell}>{meta?.v}</TableCell>
            </AlternatingRow>
          ))}
        </TableBody>
      </Table>
    </StyledPaper>
  );
};

export default TemplateArchiveTable;
