import React from 'react';
import { Card, makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

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
        <strong>Type: </strong> General Task
      </Typography>
      <Typography>
        <strong>Title:</strong> {title}
      </Typography>
      <Typography>
        <strong>Description:</strong> {description}
      </Typography>
      <Typography>
        <strong>Notes</strong> {notes}
      </Typography>
      <Typography>
        <strong>Created:</strong> {formattedDate}
      </Typography>
      <Typography>
        <strong>Total count:</strong> {total_count}
      </Typography>
      <Typography>
        <strong>Model Type:</strong> {model_type}
      </Typography>
      <Typography>
        <strong>Subtask Type</strong> {subtask_type}
      </Typography>
      <Typography>
        <strong>Subtask Result</strong> {subtask_result}
      </Typography>
      <Typography>
        <strong>Subtask Count</strong> {subtask_count}
      </Typography>
      <Typography>
        <Link to={`/GeneralTask/${id}`}>[more]</Link>
      </Typography>
    </Card>
  );
};

export default MiniGeneralTask;
