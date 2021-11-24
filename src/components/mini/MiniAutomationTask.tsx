import React from 'react';
import { styled } from '@mui/material/styles';
import { Card, Typography } from '@material-ui/core';
import makeStyles from '@material-ui/styles/makeStyles';
import { Link } from 'react-router-dom';
import { format, formatDuration, intervalToDuration, secondsToMilliseconds } from 'date-fns';

const PREFIX = 'MiniAutomationTask';

const classes = {
  root: `${PREFIX}-root`,
  success: `${PREFIX}-success`,
  failure: `${PREFIX}-failure`,
  warning: `${PREFIX}-warning`,
};

const StyledCard = styled(Card)(({ theme }) => ({
  [`&.${classes.root}`]: {
    margin: `${theme.spacing(2)}px 0px`,
    padding: theme.spacing(1),
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

interface MiniAutomationTaskProps {
  id?: string;
  created?: string | null;
  duration?: number | null;
  state?: string | null;
  result?: string | null;
  task_type?: string | null;
  model_type?: string | null;
}

const MiniAutomationTask: React.FC<MiniAutomationTaskProps> = ({
  id,
  created,
  duration,
  state,
  result,
  task_type,
  model_type,
}: MiniAutomationTaskProps) => {
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
    <StyledCard className={classes.root}>
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
    </StyledCard>
  );
};

export default MiniAutomationTask;
