import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { graphql } from 'babel-plugin-relay/macro';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { Typography, CircularProgress } from '@material-ui/core';
import buildUrl from 'build-url-ts';

import ChildTaskTable from './ChildTaskTable';
import { GeneralTaskChildrenTabQuery } from './__generated__/GeneralTaskChildrenTabQuery.graphql';
import InversionSolutionDiagnosticContainer from './InversionSolutionDiagnosticContainer';
import { FilteredArguments, ValidatedChildren, SweepArguments } from '../../interfaces/generaltask';
import { diagnosticReportViewOptions as options } from '../../constants/diagnosticReport';
import {
  applyChildTaskFilter,
  getChildTaskIdArray,
  getGeneralTaskDetailsFromQueryResponse,
  setStateFromSearchParams,
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
  const [showFilter, setShowFilter] = useState(false);
  const [filteredArguments, setFilteredArguments] = useState<FilteredArguments>({ data: [] });
  const [filteredChildren, setFilteredChildren] = useState<ValidatedChildren>({ data: [] });
  const [filteredChildrenIds, setFilteredChildrenIds] = useState<string[]>([]);
  const [viewOptions, setViewOptions] = useState<string[]>([options[0].finalPath]);
  const data = useLazyLoadQuery<GeneralTaskChildrenTabQuery>(generalTaskChildrenTabQuery, { id });
  const childTasks = validateChildTasks(data);
  const baseUrl = `/GeneralTask/${id}/ChildTasks`;
  const search = useLocation().search;

  useEffect(() => {
    try {
      setStateFromSearchParams(search, 'showList', setShowList);
      setStateFromSearchParams(search, 'showFilter', setShowFilter);
      setStateFromSearchParams(search, 'viewOptions', setViewOptions);
      setStateFromSearchParams(search, 'filter', setFilteredArguments, (filter: FilteredArguments) => {
        const currentFilteredChildren = applyChildTaskFilter(childTasks, filter);
        setFilteredChildren(currentFilteredChildren);
      });
    } catch (e) {
      history.replaceState(null, '', baseUrl);
    }
  }, []);

  useEffect(() => {
    if (filteredArguments.data.length || viewOptions.length || showFilter === true || showList === false) {
      const url = buildUrl(baseUrl, {
        queryParams: {
          filter: JSON.stringify(filteredArguments),
          showList: JSON.stringify(showList),
          showFilter: JSON.stringify(showFilter),
          viewOptions: JSON.stringify(viewOptions),
        },
      });
      history.replaceState(null, '', url);
    } else {
      history.replaceState(null, '', baseUrl);
    }
  }, [filteredArguments, showList, showFilter, viewOptions]);

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
          generalTaskDetails={getGeneralTaskDetailsFromQueryResponse(generalTaskData)}
          sweepArgs={sweepArgs}
          ids={filteredChildrenIds}
          filterCount={`${filteredChildren.data?.length ?? 0}/${childTasks.data?.length ?? 0}`}
          showList={showList}
          showFilter={showFilter}
          setShowFilter={setShowFilter}
          viewOptions={viewOptions}
          setViewOptions={setViewOptions}
          onChange={handleChange}
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
