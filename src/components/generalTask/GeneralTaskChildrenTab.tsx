import React, { useEffect, useState } from 'react';
import { graphql } from 'babel-plugin-relay/macro';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { Typography, CircularProgress } from '@material-ui/core';

import ChildTaskTable from './ChildTaskTable';
import { GeneralTaskChildrenTabQuery } from './__generated__/GeneralTaskChildrenTabQuery.graphql';
import SweepArgumentFilterContainer from './InversionSolutionDiagnosticContainer';
import { FilteredArguments, FilteredChildren, SweepArguments } from '../../interfaces/generaltask';

interface GeneralTaskChildrenTabProps {
  id: string;
  readonly sweepArgs?: SweepArguments;
}

const GeneralTaskChildrenTab: React.FC<GeneralTaskChildrenTabProps> = ({
  id,
  sweepArgs,
}: GeneralTaskChildrenTabProps) => {
  const [showList, setShowList] = useState(true);
  const [filteredArguments, setFilteredArguments] = useState<FilteredArguments>({ data: [] });
  const [filteredChildren, setFilteredChildren] = useState<FilteredChildren>({ data: [] });
  const data = useLazyLoadQuery<GeneralTaskChildrenTabQuery>(generalTaskChildrenTabQuery, { id });
  const childTasks = data?.node?.children?.edges?.map((e) => e?.node?.child);

  const handleChange = (event: React.ChangeEvent<{ value: unknown; name?: string | undefined }>) => {
    const currentFilteredArguments = [...filteredArguments.data];
    const itemIndex = currentFilteredArguments.findIndex((item) => item.k === event.target.name);

    if (itemIndex !== -1) {
      currentFilteredArguments[itemIndex].v = event.target.value as string[];
      currentFilteredArguments[itemIndex].v.length === 0 && currentFilteredArguments.splice(itemIndex, 1);
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

  useEffect(() => {
    const filtered = childTasks?.filter((child) => {
      if (child?.__typename === 'AutomationTask' || child?.__typename === 'RuptureGenerationTask') {
        return filteredArguments.data?.every((sweepArgument) => {
          return child?.arguments?.some((argument) => {
            return sweepArgument.k.includes(argument?.k as string) && sweepArgument.v.includes(argument?.v as string);
          });
        });
      }
    });
    const newFilteredChildren = { data: filtered };
    setFilteredChildren(newFilteredChildren);
  }, [filteredArguments]);

  if (!data?.node) {
    return (
      <Typography variant="h5" gutterBottom>
        General Task: Id Not Found
      </Typography>
    );
  }

  return (
    <div>
      <React.Suspense fallback={<CircularProgress />}>
        <SweepArgumentFilterContainer
          sweepArgs={sweepArgs}
          setShowList={setShowList}
          onChange={handleChange}
          filteredChildren={filteredChildren}
          childrenListLength={childTasks?.length ?? 0}
        />
      </React.Suspense>
      <React.Suspense fallback={<CircularProgress />}>
        {showList && (
          <div>
            {!!filteredChildren.data?.length ? (
              <ChildTaskTable data={filteredChildren.data} />
            ) : (
              data?.node?.children?.edges?.length && <ChildTaskTable data={childTasks} />
            )}
          </div>
        )}
      </React.Suspense>
    </div>
  );
};

export default GeneralTaskChildrenTab;

export const generalTaskChildrenTabQuery = graphql`
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
