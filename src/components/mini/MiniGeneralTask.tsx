import React from 'react';
import { Card, Grid, List, ListItem, makeStyles, Tooltip, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';

interface MiniGeneralTaskProps {
  id?: string;
  title?: string | null;
  description?: string | null;
  created?: string | null;
  total_count?: number | null;
  model_type?: string | null;
  subtask_type?: string | null;
  subtask_result?: string | null;
  notes?: string | null;
  subtask_count?: number | null;
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: `${theme.spacing(2)}px 0px`,
    padding: theme.spacing(1),
  },
}));
const MiniGeneralTask: React.FC<MiniGeneralTaskProps> = ({
  id,
  title,
  description,
  created,
  total_count,
  model_type,
  subtask_type,
  subtask_result,
  notes,
  subtask_count,
}: MiniGeneralTaskProps) => {
  const classes = useStyles();
  const formattedDate = created ? format(new Date(created), 'PPPppp') : '';
  return (
    <Card className={classes.root}>
      <Typography>
        <strong>Type: General Task</strong>
      </Typography>
      <Typography>
        <strong>Title: </strong> {title}
      </Typography>
      <Typography>
        <strong>Created: </strong> {formattedDate}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={5}>
          <List dense>
            <ListItem disableGutters={true}>
              <Typography>
                <strong>Subtask Type: </strong> {subtask_type}
              </Typography>
            </ListItem>
            <ListItem disableGutters={true}>
              <Typography>
                <strong>Count: </strong>
                <Tooltip title="totle count">
                  <span>{total_count ?? 0}</span>
                </Tooltip>
                <Tooltip title="subtask count">
                  <span>/{subtask_count}</span>
                </Tooltip>
              </Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={6}>
          <List dense>
            <ListItem disableGutters={true}>
              <Typography>
                <strong>Model Type: </strong> {model_type}
              </Typography>
            </ListItem>
            <ListItem disableGutters={true}>
              <Typography>
                <strong>Subtask Result: </strong> {subtask_result}
              </Typography>
            </ListItem>
          </List>
        </Grid>
      </Grid>
      {description && (
        <Typography>
          <strong>Description: </strong>
          <ReactMarkdown>{description}</ReactMarkdown>
        </Typography>
      )}
      {notes && (
        <Typography>
          <strong>Notes: </strong>
          <ReactMarkdown>{notes}</ReactMarkdown>
        </Typography>
      )}
      <Typography>
        <Link to={`/GeneralTask/${id}`}>[more]</Link>
      </Typography>
    </Card>
  );
};

export default MiniGeneralTask;
