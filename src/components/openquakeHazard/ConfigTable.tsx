import React from 'react';
import { styled } from '@mui/material/styles';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';
import TruncateText from '../TruncateText';
import { format } from 'date-fns';

const PREFIX = 'ConfigTable';

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

export interface ConfigTableProps {
  readonly config?:
    | {
        readonly id: string;
        readonly created: unknown | null;
        readonly source_models: ReadonlyArray<{
          readonly id?: string | undefined;
          readonly file_name?: string | null | undefined;
          readonly file_url?: string | null | undefined;
          readonly meta?:
            | ReadonlyArray<{
                readonly k: string | null;
                readonly v: string | null;
              } | null>
            | null
            | undefined;
        } | null> | null;
        readonly template_archive: {
          readonly meta: ReadonlyArray<{
            readonly k: string | null;
            readonly v: string | null;
          } | null> | null;
          readonly file_name: string | null;
          readonly file_size: unknown | null;
          readonly file_url: string | null;
          readonly md5_digest: string | null;
        } | null;
      }
    | null
    | undefined;
}

const ConfigTable: React.FC<ConfigTableProps> = ({ config }) => {
  const created = config?.created ? (config?.created as string) : undefined;
  const formattedDate = created ? format(new Date(created), 'PPPppp') : '';
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
            <TableCell colSpan={3}>Config</TableCell>
          </AlternatingRow>
        </TableHead>
        <TableBody>
          <AlternatingRow classes={{ root: classes.root }}>
            <TableCell>ID</TableCell>
            <TableCell colSpan={2}>{config?.id}</TableCell>
          </AlternatingRow>
          <AlternatingRow classes={{ root: classes.root }}>
            <TableCell>Created</TableCell>
            <TableCell colSpan={2}>{formattedDate}</TableCell>
          </AlternatingRow>
        </TableBody>
        <TableHead>
          <AlternatingRow
            classes={{
              root: classes.root,
            }}
          >
            <TableCell colSpan={3}>Source Models</TableCell>
          </AlternatingRow>
        </TableHead>
        <TableBody>
          {config?.source_models?.map((source_model) => (
            <>
              <AlternatingRow key={Math.random()} classes={{ root: classes.root }}>
                <TableCell>
                  <TruncateText text={source_model?.file_name ?? ''} />
                </TableCell>
                <TableCell>
                  <a href={source_model?.file_url ?? ''}>Get file</a>
                </TableCell>
                <TableCell>
                  <Link to={`/InversionSolutionNrml/${source_model?.id}`}>[more]</Link>
                </TableCell>
              </AlternatingRow>
            </>
          ))}
        </TableBody>
      </Table>
    </StyledPaper>
  );
};

export default ConfigTable;
