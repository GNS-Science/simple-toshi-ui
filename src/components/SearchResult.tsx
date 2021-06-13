import React from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks';
import { SearchQuery } from './__generated__/SearchQuery.graphql';
import { searchQuery } from './Search';
import MiniFile from './mini/MiniFile';
import MiniRuptureGenerationTask from './mini/MiniRuptureGenerationTask';
import MiniGeneralTask from './mini/MiniGeneralTask';

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    boxShadow: theme.shadows[5],
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
  },
  inputRoot: {
    width: '100%',
    height: '50px',
  },
}));

interface SearchResultProps {
  queryRef: PreloadedQuery<SearchQuery, Record<string, unknown>>;
}

const SearchResult: React.FC<SearchResultProps> = ({ queryRef }: SearchResultProps) => {
  const classes = useStyles();
  const data = usePreloadedQuery<SearchQuery>(searchQuery, queryRef);
  return (
    <Box>
      <Typography>Search results: {data?.search?.search_result?.total_count} items</Typography>
      <Box>
        {data?.search?.search_result?.edges?.map((edge) => {
          const searchType = edge?.node?.__typename;
          switch (searchType) {
            case 'File': {
              return (
                <MiniFile
                  key={edge?.node?.id}
                  id={edge?.node?.id}
                  file_size={edge?.node?.file_size}
                  file_name={edge?.node?.file_name}
                />
              );
            }
            case 'RuptureGenerationTask': {
              return (
                <MiniRuptureGenerationTask
                  key={edge?.node?.id}
                  id={edge?.node?.id}
                  created={edge?.node?.created ? (edge?.node?.created as string) : undefined}
                  duration={edge?.node?.duration}
                  state={edge?.node?.state}
                  result={edge?.node?.result}
                />
              );
            }
            case 'GeneralTask': {
              return (
                <MiniGeneralTask
                  key={edge?.node?.id}
                  id={edge?.node?.id}
                  created={edge?.node?.created ? (edge?.node?.created as string) : undefined}
                  title={edge?.node?.title}
                  description={edge?.node?.description}
                  total_count={edge?.node?.children?.total_count}
                />
              );
            }
          }
        })}
      </Box>
    </Box>
  );
};

export default SearchResult;
