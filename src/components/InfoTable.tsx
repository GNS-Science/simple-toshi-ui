import React from 'react';
import { styled } from '@mui/material/styles';
import { Grid, List, ListItem, ListItemText } from '@material-ui/core';
import { format, formatDuration, intervalToDuration, secondsToMilliseconds } from 'date-fns';

const PREFIX = 'InfoTable';

const classes = {
  success: `${PREFIX}-success`,
  failure: `${PREFIX}-failure`,
  warning: `${PREFIX}-warning`,
};

const StyledGrid = styled(Grid)(({ theme }) => ({
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

export interface InfoTableProps {
  created?: string;
  duration?: number | null;
  result?: string | null;
  state?: string | null;
  task_type?: string | null;
  model_type?: string | null;
}

const InfoTable: React.FC<InfoTableProps> = ({
  created,
  duration,
  result,
  state,
  task_type,
  model_type,
}: InfoTableProps) => {
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
    <StyledGrid container spacing={0} wrap={'nowrap'}>
      <Grid item xs={6}>
        <List dense>
          <ListItem>
            <ListItemText primary="Created" secondary={formattedDate} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Duration" secondary={durationInterval} />
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={4}>
        <List dense>
          <ListItem>
            <ListItemText
              primary="Result"
              secondary={result}
              classes={{ secondary: result === 'SUCCESS' ? classes.success : classes.failure }}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="State"
              secondary={state}
              classes={{ secondary: state === 'DONE' ? classes.success : classes.warning }}
            />
          </ListItem>
        </List>
      </Grid>
      {(task_type !== undefined || model_type !== undefined) && (
        <Grid item xs={4}>
          <List dense>
            <ListItem>
              <ListItemText primary="Task Type" secondary={task_type} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Model Type" secondary={model_type} />
            </ListItem>
          </List>
        </Grid>
      )}
    </StyledGrid>
  );
};

export default InfoTable;
