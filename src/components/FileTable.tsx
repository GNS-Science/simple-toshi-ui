import React from 'react';
import { makeStyles, Paper, Table, TableBody, TableCell, TableHead, TableRow, withStyles } from '@material-ui/core';
import TruncateText from './TruncateText';
import { FileRole } from './__generated__/RuptureGenerationTaskQuery.graphql';
import { Link } from 'react-router-dom';

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

export interface FileTableProps {
  data?: readonly ({
    readonly node: {
      readonly role: FileRole;
      readonly file: {
        readonly __typename: string;
        readonly id?: string | undefined;
        readonly file_name?: string | null | undefined;
        readonly file_url?: string | null | undefined;
      };
    } | null;
  } | null)[];
}

const FileTable: React.FC<FileTableProps> = ({ data }: FileTableProps) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Table stickyHeader size="small" className={classes.table}>
        <colgroup>
          <col style={{ width: '50%' }} />
        </colgroup>
        <TableHead>
          <AlternatingRow>
            <TableCell>File</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Download</TableCell>
          </AlternatingRow>
        </TableHead>
        <TableBody>
          {data?.map((e) => (
            <AlternatingRow key={e?.node?.file?.id}>
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
                ) : (
                  <Link to={`/FileDetail/${e?.node?.file?.id}`}>[more]</Link>
                )}
              </TableCell>
            </AlternatingRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default FileTable;
