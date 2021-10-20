import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { graphql } from 'babel-plugin-relay/macro';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { Typography, CircularProgress, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import buildUrl from 'build-url-ts';

import ChildTaskTable from './ChildTaskTable';
import { GeneralTaskChildrenTabQuery } from './__generated__/GeneralTaskChildrenTabQuery.graphql';
import InversionSolutionDiagnosticContainer from './InversionSolutionDiagnosticContainer';
import { FilteredArguments, ValidatedChildren, SweepArguments, GeneralTaskParams } from '../../interfaces/generaltask';
import { diagnosticReportViewOptions as options } from '../../constants/diagnosticReport';
import {
  applyChildTaskFilter,
  getChildTaskIdArray,
  getGeneralTaskDetailsFromQueryResponse,
  maxLength,
  updateFilteredArguments,
  validateChildTasks,
  getClipBoardObject,
  determineClipBoard,
} from '../../service/generalTask.service';
import { GeneralTaskQueryResponse } from '../../pages/__generated__/GeneralTaskQuery.graphql';
import DialogAlert from '../common/DialogAlert';
import LocalStorageContext from '../../contexts/localStorage';

interface GeneralTaskChildrenTabProps {
  readonly sweepArgs?: SweepArguments;
  generalTaskData: GeneralTaskQueryResponse;
}

const GeneralTaskChildrenTab: React.FC<GeneralTaskChildrenTabProps> = ({
  sweepArgs,
  generalTaskData,
}: GeneralTaskChildrenTabProps) => {
  const { id } = useParams<GeneralTaskParams>();
  const { reportViewSelections, setReportViewSelections } = useContext(LocalStorageContext);

  const [showList, setShowList] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [filteredArguments, setFilteredArguments] = useState<FilteredArguments>({ data: [] });
  const [filteredChildren, setFilteredChildren] = useState<ValidatedChildren>({ data: [] });
  const [filteredChildrenIds, setFilteredChildrenIds] = useState<string[]>([]);
  const [viewOptions, setViewOptions] = useState<string[]>([options[0].finalPath]);
  const [openAlert, setOpenAlert] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);

  const data = useLazyLoadQuery<GeneralTaskChildrenTabQuery>(generalTaskChildrenTabQuery, { id });
  const childTasks = validateChildTasks(data);
  const search = useLocation().search;
  const history = useHistory();
  const baseUrl = `${process.env.REACT_APP_ROOT_PATH}/GeneralTask/${id}/ChildTasks`;
  const isClipBoard: boolean = determineClipBoard(search);

  useEffect(() => {
    if (isClipBoard) {
      getClipBoardObject(search)
        .then((res) => {
          setShowList(res.showList);
          setShowFilter(res.showFilter);
          setViewOptions(res.viewOptions);
          setFilteredArguments(res.filter);
          setFilteredChildren(applyChildTaskFilter(childTasks, res.filter));
        })
        .catch(() => {
          setOpenNotification(true);
        });
    }
  }, []);

  const getSharableUrl = (): string => {
    const shareViewOptions: string[] = isClipBoard ? viewOptions : reportViewSelections;
    const sharableState = {
      filter: filteredArguments,
      showList: showList,
      showFilter: showFilter,
      viewOptions: shareViewOptions,
    };
    const url = buildUrl(baseUrl, {
      queryParams: {
        clipBoard: btoa(JSON.stringify(sharableState)),
      },
    });
    return url ?? '';
  };

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

  const handleCloseNotification = () => {
    setOpenNotification(false);
    history.push(`/GeneralTask/${id}/ChildTasks`);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openNotification}
        onClose={handleCloseNotification}
      >
        <MuiAlert variant="filled" severity="warning">
          Sorry, this is a broken URL.
        </MuiAlert>
      </Snackbar>
      {openAlert && (
        <DialogAlert
          open={openAlert}
          title="Cannot Query Reports"
          text={`Reports cannot be queried when the list of filtered child tasks is over ${maxLength}.`}
          handleClose={handleClose}
        />
      )}
      <React.Suspense fallback={<CircularProgress />}>
        <InversionSolutionDiagnosticContainer
          generalTaskDetails={getGeneralTaskDetailsFromQueryResponse(generalTaskData)}
          filteredChildren={filteredChildren}
          sweepArgs={sweepArgs}
          ids={filteredChildrenIds}
          filterCount={`${filteredChildren.data?.length ?? 0}/${childTasks.data?.length ?? 0}`}
          showList={showList}
          showFilter={showFilter}
          setShowFilter={setShowFilter}
          viewOptions={isClipBoard ? viewOptions : reportViewSelections}
          setViewOptions={isClipBoard ? setViewOptions : setReportViewSelections}
          onChange={handleChange}
          applyFilter={applyFilter}
          handleViewChange={handleViewChange}
          getUrl={getSharableUrl}
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
