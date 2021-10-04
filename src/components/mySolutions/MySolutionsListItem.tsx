import { Card, CardContent, Grid, List, ListItem, Typography } from '@material-ui/core';
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
          <Grid container spacing={1}>
            <Grid item xs={5}>
              <List dense>
                <ListItem disableGutters={true}>
                  <Typography>
                    <strong>Produced by General Task:</strong> {parentTask?.id}&nbsp;&nbsp;
                    <Link to={`/GeneralTask/${parentTask?.id}`}>[more]</Link>
                  </Typography>
                </ListItem>
                <ListItem disableGutters={true}>
                  <Typography>
                    <strong>Title</strong> {parentTask?.title}
                  </Typography>
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={5}>
              <List dense>
                <ListItem disableGutters={true}>
                  <Typography>
                    <strong>Created</strong> {parentTask?.created}
                  </Typography>
                </ListItem>
                <ListItem disableGutters={true}>
                  <Typography>
                    <strong>Model Type</strong> {parentTask?.model_type}
                  </Typography>
                </ListItem>
              </List>
            </Grid>
          </Grid>
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
