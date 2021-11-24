import React from 'react';
import { styled } from '@mui/material/styles';
// prettier-ignore
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  InputBase,
  Typography,
} from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';
import { graphql } from 'babel-plugin-relay/macro';
import { useQueryLoader } from 'react-relay/hooks';
import { SearchQuery } from './__generated__/SearchQuery.graphql';
import SearchResult from './SearchResult';

const PREFIX = 'Search';

const classes = {
  search: `${PREFIX}-search`,
  searchIcon: `${PREFIX}-searchIcon`,
  searchButton: `${PREFIX}-searchButton`,
  inputInput: `${PREFIX}-inputInput`,
  inputRoot: `${PREFIX}-inputRoot`,
  root: `${PREFIX}-root`,
  pos: `${PREFIX}-pos`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(({ theme }) => ({
  [`& .${classes.search}`]: {
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

  [`& .${classes.searchButton}`]: {
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

export const searchQuery = graphql`
  query SearchQuery($search: String!) {
    search(search_term: $search) {
      search_result {
        total_count
        edges {
          node {
            __typename
            ... on Node {
              id
            }
            ... on AutomationTask {
              created
              duration
              state
              result
              task_type
              model_type
            }
            ... on RuptureGenerationTask {
              created
              duration
              state
              result
            }
            ... on GeneralTask {
              description
              notes
              title
              created
              model_type
              subtask_type
              subtask_count
              subtask_result
              children {
                total_count
              }
            }
            ... on FileInterface {
              file_name
              file_size
            }
          }
        }
      }
    }
  }
`;

const Search: React.FC = () => {
  const [queryRef, loadQuery] = useQueryLoader<SearchQuery>(searchQuery);
  const [queryInput, setQueryInput] = React.useState('');
  const handleSearch = () => {
    loadQuery({ search: queryInput });
  };

  return (
    <Root>
      <Box className={classes.search}>
        <Box className={classes.searchIcon}>
          <SearchIcon />
        </Box>
        <Box className={classes.searchButton}>
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button>
        </Box>
        <InputBase
          placeholder="Search…"
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
              handleSearch();
            }
          }}
        />
      </Box>
      <React.Suspense fallback={<CircularProgress />}>
        {queryRef && (
          <Box>
            <SearchResult queryRef={queryRef} />
          </Box>
        )}
      </React.Suspense>
      {!queryRef && (
        <Container>
          <Card className={classes.root}>
            <CardContent>
              <Typography variant="h6">Tips</Typography>

              <Typography variant="body1">
                Search uses the ElasticSearch&nbsp;
                <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-simple-query-string-query.html#simple-query-string-syntax">
                  simple query string syntax
                </a>
                &nbsp;Here are a few examples...
              </Typography>
            </CardContent>
          </Card>
          <Card className={classes.root}>
            <CardContent>
              <Typography className={classes.pos} color="textSecondary" variant="body1">
                `title:subduction` looks for `subduction` in the title field.
              </Typography>
              <Typography className={classes.pos} color="textSecondary" variant="body1">
                `title:subduction+rupture` looks for `subduction` AND `rupture` in the title field.
              </Typography>
              <Typography className={classes.pos} color="textSecondary" variant="body1">
                `arguments.k:completion_energy` looks for the key `completion_energy` in the arguments field.
              </Typography>
              <Typography className={classes.pos} color="textSecondary" variant="body1">
                `meta.k:mfd_b_value` looks for the key `mfd_b_value` in the meta field.
              </Typography>
              <Typography className={classes.pos} color="textSecondary" variant="body1">
                `file_name:InversionSolution-CFM03_tf0.0-rnd0-t60.zip` finds the file by name.
              </Typography>
            </CardContent>
          </Card>
          <Card className={classes.root}>
            <CardContent>
              <Typography className={classes.pos} component="p">
                You don`t have to use fields, but it`ll help you get more specific results.
              </Typography>
              <Typography className={classes.pos} component="p">
                The search will never return more that 10 results.
              </Typography>
              <Typography className={classes.pos} component="p">
                The search is fuzzy so expect some inexact results, but the closest matches will be at top of the list.
              </Typography>
            </CardContent>
          </Card>
        </Container>
      )}
    </Root>
  );
};

export default Search;
