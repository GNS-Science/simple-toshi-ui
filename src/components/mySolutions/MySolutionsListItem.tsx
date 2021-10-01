import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { SolutionItem } from '../../interfaces/mySolutions';

const useStyles = makeStyles(() => ({
  card: {
    margin: 10,
  },
}));

interface MySolutionsListItemProps {
  automationTask: SolutionItem;
}
const MySolutionsListItem: React.FC<MySolutionsListItemProps> = ({ automationTask }: MySolutionsListItemProps) => {
  const classes = useStyles();
  const parentTask = automationTask?.parents?.edges[0]?.node?.parent;
  const inversionSolution = automationTask?.inversion_solution;
  return (
    <>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5">Inversion solution: {inversionSolution?.id}</Typography>
          <Typography>
            <strong>Produced by General Task:</strong> {parentTask?.id}&nbsp;&nbsp;
            <Link to={`/GeneralTask/${parentTask?.id}`}>[more]</Link>
          </Typography>
          <Typography>
            <strong>Title</strong> {parentTask?.title}
          </Typography>
          <Typography>
            <strong>Created</strong> {parentTask?.created}
          </Typography>
          <Typography>
            <strong>Model Type</strong> {parentTask?.model_type}
          </Typography>
          {parentTask?.description && (
            <>
              <Typography>
                <strong>Description: </strong>
              </Typography>
              <ReactMarkdown>{parentTask.description}</ReactMarkdown>
            </>
          )}
          {parentTask?.notes && (
            <>
              <Typography>
                <strong>Notes: </strong>
              </Typography>
              <ReactMarkdown>{parentTask?.notes}</ReactMarkdown>
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default MySolutionsListItem;
