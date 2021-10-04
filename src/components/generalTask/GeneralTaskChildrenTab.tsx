import React, { useEffect, useState } from 'react';
import { graphql } from 'babel-plugin-relay/macro';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { Typography, CircularProgress } from '@material-ui/core';

import ChildTaskTable from './ChildTaskTable';
import { GeneralTaskChildrenTabQuery } from './__generated__/GeneralTaskChildrenTabQuery.graphql';
import InversionSolutionDiagnosticContainer from './InversionSolutionDiagnosticContainer';
import { FilteredArguments, ValidatedChildren, SweepArguments } from '../../interfaces/generaltask';
import {
  applyChildTaskFilter,
  getChildTaskIdArray,
  updateFilteredArguments,
  validateChildTasks,
} from '../../service/generalTask.service';
import { GeneralTaskQueryResponse } from '../../pages/__generated__/GeneralTaskQuery.graphql';

interface GeneralTaskChildrenTabProps {
  id: string;
  readonly sweepArgs?: SweepArguments;
  generalTaskData: GeneralTaskQueryResponse;
}

const GeneralTaskChildrenTab: React.FC<GeneralTaskChildrenTabProps> = ({
  id,
  sweepArgs,
  generalTaskData,
}: GeneralTaskChildrenTabProps) => {
  const [showList, setShowList] = useState(true);
  const [filteredArguments, setFilteredArguments] = useState<FilteredArguments>({ data: [] });
  const [filteredChildren, setFilteredChildren] = useState<ValidatedChildren>({ data: [] });
  const [filteredChildrenIds, setFilteredChildrenIds] = useState<string[]>([]);
  const data = useLazyLoadQuery<GeneralTaskChildrenTabQuery>(generalTaskChildrenTabQuery, { id });
  const childTasks = validateChildTasks(data);

  const handleChange = (event: React.ChangeEvent<{ value: unknown; name?: string | undefined }>) => {
    const newFilteredArguments = updateFilteredArguments(
      filteredArguments,
      event.target.value as string[],
      event.target.name as string,
    );
    setFilteredArguments(newFilteredArguments);
  };

  const applyFilter = () => {
    const filtered = applyChildTaskFilter(childTasks, filteredArguments);
    setFilteredChildren(filtered);
  };

  useEffect(() => {
    const ids = getChildTaskIdArray(filteredChildren);
    ids && setFilteredChildrenIds(ids);
  }, [filteredChildren]);

  const handleViewChange = () => {
    if (showList && filteredArguments.data.length === 0 && filteredChildren.data?.length === 0) {
      const ids = getChildTaskIdArray(childTasks);
      ids && setFilteredChildrenIds(ids);
    }
    setShowList((v) => !v);
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
      <React.Suspense fallback={<CircularProgress />}>
        <InversionSolutionDiagnosticContainer
          data={generalTaskData}
          sweepArgs={sweepArgs}
          showList={showList}
          onChange={handleChange}
          ids={filteredChildrenIds}
          childrenListLength={childTasks.data?.length ?? 0}
          applyFilter={applyFilter}
          handleViewChange={handleViewChange}
        />
      </React.Suspense>
      <React.Suspense fallback={<CircularProgress />}>
        {showList && (
          <div>
            {!!filteredChildren.data?.length ? (
              <ChildTaskTable data={childTasks} />
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
