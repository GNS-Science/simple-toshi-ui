import { Card, CardContent, Grid, List, ListItem, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { SolutionItem } from '../../interfaces/mySolutions';

const PREFIX = 'MySolutionsListItem';

const classes = {
  card: `${PREFIX}-card`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(() => ({
  [`& .${classes.card}`]: {
    margin: 10,
  },
}));

interface MySolutionsListItemProps {
  automationTask: SolutionItem;
}
const MySolutionsListItem: React.FC<MySolutionsListItemProps> = ({ automationTask }: MySolutionsListItemProps) => {
  const parentTask = automationTask?.parents?.edges[0]?.node?.parent;

  console.log(automationTask);
  return (
    <Root>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5">
            {automationTask?.task_type === 'TIME_DEPENDENT_SOLUTION'
              ? 'Time Dependent Solution'
              : automationTask?.task_type === 'SCALE_SOLUTION'
              ? 'Scaled Inversion Solution'
              : 'Inversion Solution'}
            :&nbsp;
            {automationTask?.id}
            &nbsp;&nbsp;
            {() => {
              switch (automationTask?.task_type) {
                case 'TIME_DEPENDENT_SOLUTION':
                  <Link to={`/TimeDependentSolution/${automationTask?.id}`}>[more]</Link>;
                  break;
                case 'INVERSION':
                  <Link to={`/InversionSolution/${automationTask?.id}`}>[more]</Link>;
                  break;
                case 'SCALE_SOLUTION':
                  <Link to={`/ScaledInversionSolution/${automationTask?.id}`}>[more]</Link>;
                  break;
              }
            }}
          </Typography>
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
    </Root>
  );
};

export default MySolutionsListItem;
