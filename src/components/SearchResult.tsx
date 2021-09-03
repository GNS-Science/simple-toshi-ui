import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks';
import { SearchQuery } from './__generated__/SearchQuery.graphql';
import { searchQuery } from './Search';
import MiniFile from './mini/MiniFile';
import MiniRuptureGenerationTask from './mini/MiniRuptureGenerationTask';
import MiniGeneralTask from './mini/MiniGeneralTask';
import MiniAutomationTask from './mini/MiniAutomationTask';

interface SearchResultProps {
  queryRef: PreloadedQuery<SearchQuery, Record<string, unknown>>;
}
const SearchResult: React.FC<SearchResultProps> = ({ queryRef }: SearchResultProps) => {
  const data = usePreloadedQuery<SearchQuery>(searchQuery, queryRef);
  return (
    <Box>
      <Typography>Search results: {data?.search?.search_result?.total_count} items</Typography>
      <Box>
        {data?.search?.search_result?.edges?.map((edge) => {
          const searchType = edge?.node?.__typename;
          switch (searchType) {
            case searchType == 'File' || searchType == 'InversionSolution' ? searchType : null: {
              return (
                <MiniFile
                  key={edge?.node?.id}
                  id={edge?.node?.id}
                  __typename={searchType}
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
            case 'AutomationTask': {
              console.log('hello');
              return (
                <>
                  <MiniAutomationTask
                    key={edge?.node?.id}
                    id={edge?.node?.id}
                    created={edge?.node?.created ? (edge?.node?.created as string) : undefined}
                    state={edge?.node?.state}
                    result={edge?.node?.result}
                    task_type={edge?.node?.task_type}
                    model_type={edge?.node?.model_type}
                  />
                  <p>hello</p>
                </>
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
            default: {
              return <React.Fragment key={edge?.node?.id} />;
            }
          }
        })}
      </Box>
    </Box>
  );
};

export default SearchResult;
