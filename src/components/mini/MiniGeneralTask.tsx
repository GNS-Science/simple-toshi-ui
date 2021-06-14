import React from 'react';
import { Card, makeStyles, Typography } from '@material-ui/core';
import { format } from 'date-fns';

interface MiniGeneralTaskProps {
  id?: string;
  title?: string | null;
  description?: string | null;
  created?: string | null;
  total_count?: number | null;
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: `${theme.spacing(2)}px 0px`,
    padding: theme.spacing(1),
  },
}));
const MiniGeneralTask: React.FC<MiniGeneralTaskProps> = ({
  title,
  description,
  created,
  total_count,
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
        <strong>Created:</strong> {formattedDate}
      </Typography>
      <Typography>
        <strong>Total count:</strong> {total_count}
      </Typography>
    </Card>
  );
};

export default MiniGeneralTask;
