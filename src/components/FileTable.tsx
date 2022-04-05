import React from 'react';
import { styled } from '@mui/material/styles';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import TruncateText from './TruncateText';
import { FileRole } from './__generated__/RuptureGenerationTaskQuery.graphql';
import { Link } from 'react-router-dom';

const PREFIX = 'FileTable';

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

export interface FileTableProps {
  data?: ReadonlyArray<{
    readonly node: {
      readonly role: FileRole;
      readonly file: {
        readonly __typename: string;
        readonly id?: string | undefined;
        readonly file_name?: string | null | undefined;
        readonly file_url?: string | null | undefined;
      } | null;
    } | null;
  } | null>;
}

const FileTable: React.FC<FileTableProps> = ({ data }: FileTableProps) => {
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
            <TableCell>File</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Download</TableCell>
          </AlternatingRow>
        </TableHead>
        <TableBody>
          {data?.map((e) => (
            <AlternatingRow
              key={e?.node?.file?.id}
              classes={{
                root: classes.root,
              }}
            >
              <TableCell className={classes.tableCell}>
                <TruncateText text={e?.node?.file?.file_name ?? ''} />
              </TableCell>
              <TableCell className={classes.tableCell}>{e?.node?.role}</TableCell>
              <TableCell className={classes.tableCell}>
                <a href={e?.node?.file?.file_url ?? ''}>Get file</a>
              </TableCell>
              <TableCell className={classes.tableCell}>
                {e?.node?.file?.__typename == 'InversionSolution' ? (
                  <Link to={`/InversionSolution/${e?.node?.file?.id}`}>[more]</Link>
                ) : e?.node?.file?.__typename == 'ScaledInversionSolution' ? (
                  <Link to={`/ScaledInversionSolution/${e?.node?.file?.id}`}>[more]</Link>
                ) : (
                  <Link to={`/FileDetail/${e?.node?.file?.id}`}>[more]</Link>
                )}
              </TableCell>
            </AlternatingRow>
          ))}
        </TableBody>
      </Table>
    </StyledPaper>
  );
};

export default FileTable;
