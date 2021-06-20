import React from 'react';
import { Card, makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { format, formatDuration, intervalToDuration, secondsToMilliseconds } from 'date-fns';

interface MiniRuptureGenerationTaskProps {
  id?: string;
  created?: string | null;
  duration?: number | null;
  state?: string | null;
  result?: string | null;
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: `${theme.spacing(2)}px 0px`,
    padding: theme.spacing(1),
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
const MiniRuptureGenerationTask: React.FC<MiniRuptureGenerationTaskProps> = ({
  id,
  created,
  duration,
  state,
  result,
}: MiniRuptureGenerationTaskProps) => {
  const classes = useStyles();
  const durationInterval = duration
    ? formatDuration(
        intervalToDuration({
          start: 0,
          end: secondsToMilliseconds(duration),
        }),
      )
    : '-';

  const formattedDate = created ? format(new Date(created), 'PPPppp') : '';
  return (
    <Card className={classes.root}>
      <Typography>
        <strong>Type: </strong> Rupture Generation Task
      </Typography>
      <Typography>
        <strong>Created:</strong> {formattedDate}
      </Typography>
      <Typography>
        <strong>Duration:</strong> {durationInterval}
      </Typography>
      <Typography>
        <strong>State:</strong>
        <span className={state === 'DONE' ? classes.success : classes.warning}> {state}</span>
      </Typography>
      <Typography>
        <strong>Result:</strong>
        <span className={result === 'SUCCESS' ? classes.success : classes.failure}> {result}</span>
      </Typography>
      <Typography>
        <Link to={`/RuptureGenerationTask/${id}`}>[more]</Link>
      </Typography>
    </Card>
  );
};

export default MiniRuptureGenerationTask;
