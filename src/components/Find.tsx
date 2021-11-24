import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Button, Card, CardContent, CircularProgress, Container, InputBase, Typography } from '@material-ui/core';
import makeStyles from '@material-ui/styles/makeStyles';
import SearchIcon from '@material-ui/icons/Search';
import { graphql } from 'babel-plugin-relay/macro';
import { useQueryLoader } from 'react-relay/hooks';
import { FindQuery } from './__generated__/FindQuery.graphql';
import FindResult from './FindResult';
import { useParams } from 'react-router-dom';

const PREFIX = 'Find';

const classes = {
  find: `${PREFIX}-find`,
  searchIcon: `${PREFIX}-searchIcon`,
  findButton: `${PREFIX}-findButton`,
  inputInput: `${PREFIX}-inputInput`,
  inputRoot: `${PREFIX}-inputRoot`,
  root: `${PREFIX}-root`,
  pos: `${PREFIX}-pos`,
};

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.find}`]: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    marginBottom: theme.spacing(2),
  },

  [`& .${classes.searchIcon}`]: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  [`& .${classes.findButton}`]: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99,
    right: 0,
  },

  [`& .${classes.inputInput}`]: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
    height: '35px',
    boxShadow: theme.shadows[5],
    '&:focus': {
      border: '2px solid #6cbbf7',
    },
    borderRadius: '12px',
  },

  [`& .${classes.inputRoot}`]: {
    width: '100%',
  },

  [`& .${classes.root}`]: {
    minWidth: 275,
  },

  [`& .${classes.pos}`]: {
    marginBottom: 3,
  },
}));

interface FindParams {
  id: string;
}

export const findQuery = graphql`
  query FindQuery($id: ID!) {
    node(id: $id) {
      __typename
      id
    }
  }
`;

const Find: React.FC = () => {
  const { id } = useParams<FindParams>();
  const [queryRef, loadQuery] = useQueryLoader<FindQuery>(findQuery);
  const [queryInput, setQueryInput] = React.useState('');
  const handleFind = () => {
    loadQuery({ id: queryInput });
  };

  React.useEffect(() => {
    if (id) {
      loadQuery({ id });
    }
  }, [id]);

  return (
    <Root>
      <Box className={classes.find}>
        <Box className={classes.searchIcon}>
          <SearchIcon />
        </Box>
        <Box className={classes.findButton}>
          <Button variant="contained" color="primary" onClick={handleFind}>
            Find
          </Button>
        </Box>
        <InputBase
          placeholder="Find by ID"
          classes={{
            input: classes.inputInput,
            root: classes.inputRoot,
          }}
          inputProps={{ 'aria-label': 'search' }}
          onChange={(event) => {
            setQueryInput(event.target.value);
          }}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              handleFind();
            }
          }}
          defaultValue={id}
        />
      </Box>
      <React.Suspense fallback={<CircularProgress />}>
        {queryRef && (
          <Box>
            <FindResult queryRef={queryRef} />
          </Box>
        )}
      </React.Suspense>
      {!queryRef && (
        <Container>
          <Card className={classes.root}>
            <CardContent>
              <Typography variant="h6">Tips</Typography>
              <Typography variant="body1" color="secondary">
                Enter a Toshi ID e.g. <strong>R2VuZXJhbFRhc2s6Mzk5NmpTZ1k=</strong>.
              </Typography>
              <Typography variant="body1" color="secondary">
                Or use the <strong>/Find/{'{NodeID}'}</strong> URL e.g.&nbsp;
                <strong>/Find/R2VuZXJhbFRhc2s6Mzk5NmpTZ1k=</strong>
              </Typography>
            </CardContent>
          </Card>
        </Container>
      )}
    </Root>
  );
};

export default Find;
