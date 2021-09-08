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
  data?: (
    | {
        readonly __typename: 'RuptureGenerationTask';
        readonly id: string;
        readonly created: unknown | null;
        readonly duration: number | null;
        readonly state: EventState | null;
        readonly result: EventResult | null;
      }
    | {
        readonly __typename: 'AutomationTask';
        readonly id: string;
        readonly created: unknown | null;
        readonly duration: number | null;
        readonly state: EventState | null;
        readonly result: EventResult | null;
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
  console.log(data);

  // useEffect(() => {
  //   const currentFilteredChildren = filteredChildren;
  //   const filtered = childTasks?.filter((child) => {
  //     child?.arguments?.map((argument) => {
  //       return filteredArguments.data.some((sweepArgument) => {
  //         return sweepArgument.k === argument.k && sweepArgument.v.some((v) => v === argument.v);
  //       });
  //     });
  //   });
  //   currentFilteredChildren.data = filtered;
  //   setFilteredChildren(currentFilteredChildren);
  // }, [filteredArguments]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown; name?: string | undefined }>) => {
    console.log(filteredArguments);
    const currentFilteredArguments: FilteredArguments = filteredArguments;
    const itemIndex = currentFilteredArguments.data.findIndex((item) => item.k === event.target.name);

    if (itemIndex !== -1) {
      if (currentFilteredArguments.data[itemIndex].v.some((value) => value === event.target.value)) {
        currentFilteredArguments.data[itemIndex].v.push(event.target.value as string);
      } else {
        return;
      }
    } else {
      currentFilteredArguments.data.push({
        k: event.target.name as string,
        v: [event.target.value as string],
      });
    }

    setFilteredArguments(currentFilteredArguments);
  };

  if (!data?.node) {
    return (
      <Typography variant="h5" gutterBottom>
        General Task: Id Not Found
      </Typography>
    );
  }

  const childTasks = data?.node?.children?.edges?.map((e) => e?.node?.child);

  return (
    <div>
      <GeneralTaskFilter data={sweepArgs} onChange={handleChange} />
      {!!filteredChildren.data?.length ? (
        <ChildTaskTable data={filteredChildren.data} />
      ) : (
        data?.node?.children?.edges?.length && <ChildTaskTable data={childTasks} />
      )}
    </div>
  );
};

export default GeneralTaskChildrenTab;
