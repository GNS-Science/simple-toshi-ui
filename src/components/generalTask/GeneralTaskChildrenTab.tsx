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
  maxLength,
  updateFilteredArguments,
  validateChildTasks,
} from '../../service/generalTask.service';
import { GeneralTaskQueryResponse } from '../../pages/__generated__/GeneralTaskQuery.graphql';
import Alert from '../common/Alert';

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
  const [openAlert, setOpenAlert] = useState(false);
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
    if ((filtered?.data?.length ?? 0) > maxLength) {
      setOpenAlert(true);
    }
  };

  useEffect(() => {
    const ids = getChildTaskIdArray(filteredChildren);
    ids && setFilteredChildrenIds(ids);
  }, [filteredChildren]);

  const handleViewChange = () => {
    if (showList && filteredArguments.data.length === 0 && filteredChildren.data?.length === 0) {
      const ids = getChildTaskIdArray(childTasks);
      ids && setFilteredChildrenIds(ids);
      if (ids.length === 0) {
        setOpenAlert(true);
      }
    }
    setShowList((v) => !v);
  };

  const handleClose = () => {
    setOpenAlert(false);
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
      {openAlert && (
        <Alert
          open={openAlert}
          title="Cannot Query Reports"
          text={`Reports cannot be queried when the list of filtered child tasks is over ${maxLength}.`}
          handleClose={handleClose}
        />
      )}
      <React.Suspense fallback={<CircularProgress />}>
        <InversionSolutionDiagnosticContainer
          filteredChildren={filteredChildren}
          data={generalTaskData}
          sweepArgs={sweepArgs}
          showList={showList}
          onChange={handleChange}
          ids={filteredChildrenIds}
          filterCount={`${filteredChildren.data?.length ?? 0}/${childTasks.data?.length ?? 0}`}
          applyFilter={applyFilter}
          handleViewChange={handleViewChange}
        />
      </React.Suspense>
      <React.Suspense fallback={<CircularProgress />}>
        {showList && (
          <div>
            {!!filteredChildren.data?.length ? (
              <ChildTaskTable data={filteredChildren} />
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
