import React from 'react';
import { Box, InputBase, makeStyles, debounce, CircularProgress } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { graphql } from 'babel-plugin-relay/macro';
import { useQueryLoader } from 'react-relay/hooks';
import { SearchQuery } from './__generated__/SearchQuery.graphql';
import SearchResult from './SearchResult';

const useStyles = makeStyles((theme) => ({
  search: {
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
            ... on RuptureGenerationTask {
              created
              id
              duration
              state
              result
            }
            ... on GeneralTask {
              description
              title
              created
              children {
                total_count
              }
            }
            ... on File {
              id
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
  const classes = useStyles();
  const [queryRef, loadQuery] = useQueryLoader<SearchQuery>(searchQuery);
  const debounceOnQueryChange = debounce(loadQuery, 500);

  return (
    <>
      <Box className={classes.search}>
        <Box className={classes.searchIcon}>
          <SearchIcon />
        </Box>
        <InputBase
          placeholder="Search…"
          classes={{
            input: classes.inputInput,
            root: classes.inputRoot,
          }}
          inputProps={{ 'aria-label': 'search' }}
          onChange={(event) => {
            debounceOnQueryChange({ search: event.target.value });
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
    </>
  );
};

export default Search;
