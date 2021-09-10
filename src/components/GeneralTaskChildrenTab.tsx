import React, { useEffect, useState } from 'react';
import { graphql } from 'babel-plugin-relay/macro';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { Typography } from '@material-ui/core';
import ChildTaskTable from './ChildTaskTable';

import { EventResult, EventState } from './__generated__/GeneralTaskChildrenTabQuery.graphql';
import { GeneralTaskChildrenTabQuery } from './__generated__/GeneralTaskChildrenTabQuery.graphql';
import GeneralTaskFilter from './GeneralTaskFilter';

interface FilteredArguments {
  data: {
    k: string;
    v: string[];
  }[];
}

export interface FilteredChildren {
  data?:
    | (
        | {
            readonly __typename: 'RuptureGenerationTask';
            readonly id: string;
            readonly created: unknown | null;
            readonly duration: number | null;
            readonly state: EventState | null;
            readonly result: EventResult | null;
            readonly arguments: ReadonlyArray<{
              readonly k: string | null;
              readonly v: string | null;
            } | null> | null;
          }
        | {
            readonly __typename: 'AutomationTask';
            readonly id: string;
            readonly created: unknown | null;
            readonly duration: number | null;
            readonly state: EventState | null;
            readonly result: EventResult | null;
            readonly arguments: ReadonlyArray<{
              readonly k: string | null;
              readonly v: string | null;
            } | null> | null;
          }
        | {
            readonly __typename: '%other';
          }
        | undefined
      )[];
}

const generalTaskChildrenTabQuery = graphql`
  query GeneralTaskChildrenTabQuery($id: ID!) {
    node(id: $id) {
      ... on GeneralTask {
        id
        children {
          edges {
            node {
              child {
                ... on AutomationTask {
                  __typename
                  id
                  created
                  duration
                  state
                  result
                  arguments {
                    k
                    v
                  }
                }
                ... on RuptureGenerationTask {
                  __typename
                  id
                  created
                  duration
                  state
                  result
                  arguments {
                    k
                    v
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

interface GeneralTaskChildrenTabProps {
  id: string;
  readonly sweepArgs?: readonly ({
    readonly k: string | null;
    readonly v: readonly (string | null)[] | null;
  } | null)[];
}

const GeneralTaskChildrenTab: React.FC<GeneralTaskChildrenTabProps> = ({
  id,
  sweepArgs,
}: GeneralTaskChildrenTabProps) => {
  const [filteredArguments, setFilteredArguments] = useState<FilteredArguments>({ data: [] });
  const [filteredChildren, setFilteredChildren] = useState<FilteredChildren>({ data: [] });
  const data = useLazyLoadQuery<GeneralTaskChildrenTabQuery>(generalTaskChildrenTabQuery, { id });
  const childTasks = data?.node?.children?.edges?.map((e) => e?.node?.child);

  useEffect(() => {
    console.log('fileredCildren array', filteredChildren);
    console.log('filtered arguments', filteredArguments);
    const filtered = childTasks?.filter((child) => {
      if (child?.__typename === 'AutomationTask' || child?.__typename === 'RuptureGenerationTask') {
        return filteredArguments.data?.every((sweepArgument) => {
          return child?.arguments?.some((argument) => {
            return sweepArgument.k.includes(argument?.k as string) && sweepArgument.v.includes(argument?.v as string);
          });
        });
      }
    });
    const currentFilteredChildren = { data: filtered };
    setFilteredChildren(currentFilteredChildren);
  }, [filteredArguments]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown; name?: string | undefined }>) => {
    const currentFilteredArguments = [...filteredArguments.data];
    const itemIndex = currentFilteredArguments.findIndex((item) => item.k === event.target.name);

    if (itemIndex !== -1) {
      currentFilteredArguments[itemIndex].v = event.target.value as string[];
    } else {
      currentFilteredArguments.push({
        k: event.target.name as string,
        v: event.target.value as string[],
      });
    }
    const newFilteredArguments = {
      data: currentFilteredArguments,
    };
    setFilteredArguments(newFilteredArguments);
  };

  if (!data?.node) {
    return (
      <Typography variant="h5" gutterBottom>
        General Task: Id Not Found
      </Typography>
    );
  }

  return (
    <div>
      {sweepArgs?.map((argument) => (
        <GeneralTaskFilter key={`${argument?.k}-filter`} argument={argument} onChange={handleChange} />
      ))}
      {!!filteredChildren.data?.length ? (
        <ChildTaskTable data={filteredChildren.data} />
      ) : (
        data?.node?.children?.edges?.length && <ChildTaskTable data={childTasks} />
      )}
    </div>
  );
};

export default GeneralTaskChildrenTab;
