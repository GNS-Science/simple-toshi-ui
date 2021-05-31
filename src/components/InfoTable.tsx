import React from 'react';
import { Grid, List, ListItem, ListItemText, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
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

export interface InfoTableProps {
  created?: string;
  duration?: number | null;
  result?: string | null;
  state?: string | null;
}

const InfoTable: React.FC<InfoTableProps> = ({ created, duration, result, state }: InfoTableProps) => {
  const classes = useStyles();
  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <List dense>
          <ListItem>
            <ListItemText primary="Created" secondary={created} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Duration" secondary={duration} />
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={6}>
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
    </Grid>
  );
};

export default InfoTable;
