import React from 'react';
import { styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Link } from 'react-router-dom';
import { format, formatDuration, intervalToDuration, secondsToMilliseconds } from 'date-fns';

const PREFIX = 'MiniRuptureGenerationTask';

const classes = {
  root: `${PREFIX}-root`,
  success: `${PREFIX}-success`,
  failure: `${PREFIX}-failure`,
  warning: `${PREFIX}-warning`,
};

const StyledCard = styled(Card)(({ theme }) => ({
  [`&.${classes.root}`]: {
    margin: `${theme.spacing(2)} 0px`,
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

interface MiniRuptureGenerationTaskProps {
  id?: string;
  created?: string | null;
  duration?: number | null;
  state?: string | null;
  result?: string | null;
}

const MiniRuptureGenerationTask: React.FC<MiniRuptureGenerationTaskProps> = ({
  id,
  created,
  duration,
  state,
  result,
}: MiniRuptureGenerationTaskProps) => {
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
    </StyledCard>
  );
};

export default MiniRuptureGenerationTask;
