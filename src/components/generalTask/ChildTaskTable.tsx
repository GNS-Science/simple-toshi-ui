import React from 'react';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

import { formatDuration, intervalToDuration, secondsToMilliseconds, format } from 'date-fns';
import FavouriteStatus from '../common/FavouriteStatus';
import { ValidatedChildren } from '../../interfaces/generaltask';

const PREFIX = 'ChildTaskTable';

const classes = {
  root: `${PREFIX}-root`,
  root2: `${PREFIX}-root2`,
  table: `${PREFIX}-table`,
  tableCell: `${PREFIX}-tableCell`,
  success: `${PREFIX}-success`,
  failure: `${PREFIX}-failure`,
  warning: `${PREFIX}-warning`,
};

const StyledPaper = styled(Paper)(({ theme }) => ({
  [`& .${classes.root2}`]: {
    marginTop: '40px',
    marginBottom: '40px',
  },

  [`& .${classes.table}`]: {
    tableLayout: 'fixed',
    wordWrap: 'break-word',
    paddingLeft: '15%',
    paddingRight: '15%',
  },

  [`& .${classes.tableCell}`]: {
    borderBottom: 'none',
  },

  [`& .${classes.success}`]: {
    color: theme.palette.success.main,
  },

  [`& .${classes.failure}`]: {
    color: theme.palette.error.main,
  },

  [`& .${classes.warning}`]: {
    color: theme.palette.warning.main,
  },
}));

const AlternatingRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export interface ChildTaskTableProps {
  data?: ValidatedChildren;
}

const ChildTaskTable: React.FC<ChildTaskTableProps> = ({ data }: ChildTaskTableProps) => {
  return (
    <StyledPaper className={classes.root}>
      <Table stickyHeader size="small" className={classes.table}>
        <colgroup>
          <col style={{ width: '35%' }} />
          <col style={{ width: '25%' }} />
        </colgroup>
        <TableHead>
          <AlternatingRow
            classes={{
              root: classes.root,
            }}
          >
            <TableCell>Created</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Result</TableCell>
            <TableCell>Status</TableCell>
          </AlternatingRow>
        </TableHead>
        <TableBody>
          {data?.data
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
                  <AlternatingRow
                    key={e?.id}
                    classes={{
                      root: classes.root,
                    }}
                  >
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
              } else if (e?.__typename === 'AutomationTask' || 'OpenquakeHazardTask') {
                return (
                  <AlternatingRow
                    key={e?.id}
                    classes={{
                      root: classes.root,
                    }}
                  >
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
                      <Link
                        to={
                          e?.__typename === 'AutomationTask'
                            ? `/AutomationTask/${e?.id}`
                            : `/OpenquakeHazardTask/${e?.id}`
                        }
                      >
                        [more]
                      </Link>
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
    </StyledPaper>
  );
};

export default ChildTaskTable;
