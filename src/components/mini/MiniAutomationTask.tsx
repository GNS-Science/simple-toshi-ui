import React from 'react';
import { Card, makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { format, formatDuration, intervalToDuration, secondsToMilliseconds } from 'date-fns';

interface MiniAutomationTaskProps {
  id?: string;
  created?: string | null;
  duration?: number | null;
  state?: string | null;
  result?: string | null;
  task_type?: string | null;
  model_type?: string | null;
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

const MiniAutomationTask: React.FC<MiniAutomationTaskProps> = ({
  id,
  created,
  duration,
  state,
  result,
  task_type,
  model_type,
}: MiniAutomationTaskProps) => {
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
        <strong>Type: </strong> Automation Task
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
        <strong>Task Type:</strong> {task_type}
      </Typography>
      <Typography>
        <strong>Model Type:</strong> {model_type}
      </Typography>
      <Typography>
        <Link to={`/AutomationTask/${id}`}>[more]</Link>
      </Typography>
    </Card>
  );
};

export default MiniAutomationTask;
