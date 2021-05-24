import React from 'react';
import { graphql } from 'babel-plugin-relay/macro';
import { useParams } from 'react-router-dom';
import { RuptureGenerationTaskQuery } from './__generated__/RuptureGenerationTaskQuery.graphql';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { Container, Grid, List, ListItem, ListItemText, makeStyles, Typography } from '@material-ui/core';
import KeyValueTable from './KeyValueTable';

interface RuptureGenerationTaskParams {
  id: string;
}

const ruptureGenerationTaskQuery = graphql`
  query RuptureGenerationTaskQuery($id: ID!) {
    node(id: $id) {
      id
      ... on RuptureGenerationTask {
        id
        duration
        created
        result
        state
        arguments {
          k
          v
        }
        environment {
          k
          v
        }
        metrics {
          k
          v
        }
      }
    }
  }
`;

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

const RuptureGenerationTask: React.FC = () => {
  const classes = useStyles();
  const { id } = useParams<RuptureGenerationTaskParams>();

  const data = useLazyLoadQuery<RuptureGenerationTaskQuery>(ruptureGenerationTaskQuery, { id });

  return (
    <Container maxWidth="md" style={{ paddingTop: '40px', wordWrap: 'break-word' }}>
      <Typography variant="h5" gutterBottom>
        Rupture Generation Task (id: {data?.node?.id ?? 'Not found'})
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={6}>
          <List dense>
            <ListItem>
              <ListItemText primary="Created" secondary={data?.node?.created as string} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Duration" secondary={data?.node?.duration} />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={6}>
          <List dense>
            <ListItem>
              <ListItemText
                primary="Result"
                secondary={data?.node?.result}
                classes={{ secondary: data?.node?.result === 'SUCCESS' ? classes.success : classes.failure }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="State"
                secondary={data?.node?.state}
                classes={{ secondary: data?.node?.state === 'DONE' ? classes.success : classes.warning }}
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
      <KeyValueTable header="Arguments" data={data?.node?.arguments} />
      <KeyValueTable header="Environment" data={data?.node?.environment} />
      <KeyValueTable header="Metrics" data={data?.node?.metrics} />
    </Container>
  );
};

export default RuptureGenerationTask;
