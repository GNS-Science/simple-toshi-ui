import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Paper, Table, TableBody, TableCell, TableHead, TableRow, withStyles } from '@material-ui/core';

import { EventResult, EventState } from './__generated__/GeneralTaskChildrenTabQuery.graphql';
import { formatDuration, intervalToDuration, secondsToMilliseconds, format } from 'date-fns';
import FavouriteStatus from '../common/FavouriteStatus';

const useStyles = makeStyles((theme) => ({
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
  success: {
    color: theme.palette.success.main,
  },
  failure: {
    color: theme.palette.error.main,
  },
  warning: {
    color: theme.palette.warning.main,
  },
}));

const AlternatingRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.grey[100],
    },
  },
}))(TableRow);

export interface ChildTaskTableProps {
  data?:
    | (
        | {
            readonly __typename: 'RuptureGenerationTask';
            readonly id: string;
            readonly created: unknown | null;
            readonly duration: number | null;
            readonly state: EventState | null;
            readonly result: EventResult | null;
            readonly arguments: ReadonlyArray<{
              readonly k: string | null;
              readonly v: string | null;
            } | null> | null;
          }
        | {
            readonly __typename: 'AutomationTask';
            readonly id: string;
            readonly created: unknown | null;
            readonly duration: number | null;
            readonly state: EventState | null;
            readonly result: EventResult | null;
            readonly arguments: ReadonlyArray<{
              readonly k: string | null;
              readonly v: string | null;
            } | null> | null;
          }
        | {
            readonly __typename: '%other';
          }
        | undefined
      )[];
}

const ChildTaskTable: React.FC<ChildTaskTableProps> = ({ data }: ChildTaskTableProps) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Table stickyHeader size="small" className={classes.table}>
        <colgroup>
          <col style={{ width: '35%' }} />
          <col style={{ width: '25%' }} />
        </colgroup>
        <TableHead>
          <AlternatingRow>
            <TableCell>Created</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Result</TableCell>
            <TableCell>Status</TableCell>
          </AlternatingRow>
        </TableHead>
        <TableBody>
          {data
            ?.sort((e1, e2) => {
              if (e1?.__typename === 'RuptureGenerationTask' && e2?.__typename === 'RuptureGenerationTask') {
                const created1 = e1?.created ? (e1?.created as string) : '';
                const created2 = e2?.created ? (e2?.created as string) : '';
                return created1.localeCompare(created2);
              }
              return 0;
            })
            ?.map((e) => {
              if (e?.__typename === 'RuptureGenerationTask') {
                return (
                  <AlternatingRow key={e?.id}>
                    <TableCell className={classes.tableCell}>
                      {e?.created ? format(new Date(e?.created as string), 'PPPppp') : ''}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {e?.duration
                        ? formatDuration(
                            intervalToDuration({
                              start: 0,
                              end: secondsToMilliseconds(e?.duration),
                            }),
                          )
                        : '-'}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <span className={e?.state === 'DONE' ? classes.success : classes.warning}> {e?.state}</span>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <span className={e?.result === 'SUCCESS' ? classes.success : classes.failure}> {e?.result}</span>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <Link to={`/RuptureGenerationTask/${e?.id}`}>[more]</Link>
                    </TableCell>
                  </AlternatingRow>
                );
              } else if (e?.__typename === 'AutomationTask') {
                return (
                  <AlternatingRow key={e?.id}>
                    <TableCell className={classes.tableCell}>
                      {e?.created ? format(new Date(e?.created as string), 'PPPppp') : ''}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {e?.duration
                        ? formatDuration(
                            intervalToDuration({
                              start: 0,
                              end: secondsToMilliseconds(e?.duration),
                            }),
                          )
                        : '-'}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <span className={e?.state === 'DONE' ? classes.success : classes.warning}> {e?.state}</span>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <span className={e?.result === 'SUCCESS' ? classes.success : classes.failure}> {e?.result}</span>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <Link to={`/AutomationTask/${e?.id}`}>[more]</Link>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <FavouriteStatus id={e?.id} />
                    </TableCell>
                  </AlternatingRow>
                );
              }
              return <></>;
            })}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ChildTaskTable;
