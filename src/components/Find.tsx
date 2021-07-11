import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  InputBase,
  makeStyles,
  Typography,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { graphql } from 'babel-plugin-relay/macro';
import { useQueryLoader } from 'react-relay/hooks';
import { FindQuery } from './__generated__/FindQuery.graphql';
import FindResult from './FindResult';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  find: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  findButton: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99,
    right: 0,
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    width: '100%',
    height: '35px',
    boxShadow: theme.shadows[5],
    '&:focus': {
      border: '2px solid #6cbbf7',
    },
    borderRadius: '12px',
  },
  inputRoot: {
    width: '100%',
  },
  root: {
    minWidth: 275,
  },
  pos: {
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
  const classes = useStyles();
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
    <>
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
              <Typography variant="body1">Enter a Toshi ID e.g. RmlsZTo4NTkuMDM2Z2Rw</Typography>
            </CardContent>
          </Card>
        </Container>
      )}
    </>
  );
};

export default Find;
