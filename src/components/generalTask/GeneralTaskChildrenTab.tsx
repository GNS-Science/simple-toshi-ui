import React, { useContext, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { graphql } from 'babel-plugin-relay/macro';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { Typography, CircularProgress, Snackbar, Button, Tooltip, Fab, SelectChangeEvent } from '@mui/material';
import Alert from '@mui/material/Alert';
import buildUrl from 'build-url-ts';
import ShareIcon from '@mui/icons-material/Share';

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
import { useShortcut } from '../../hooks/useShortcut';
import GeneralTaskDetailDrawer from '../diagnosticReportView/GeneralTaskDetailDrawer';
import SweepArgumentFilter from './SweepArgumentFilter';
import CommonModal from '../common/Modal/CommonModal';
import { mfdPlotOptions, namedFaultsOptions } from '../../constants/nameFaultsMfds';
import { regionalSolutionMfdOptions } from '../../constants/regionalSolutionMfd';
import ControlsBar from '../common/ControlsBar';

const PREFIX = 'GeneralTaskChildrenTab';

const classes = {
  filterContainer: `${PREFIX}-filterContainer`,
  hidden: `${PREFIX}-hidden`,
  controlsContainer: `${PREFIX}-controlsContainer`,
  control: `${PREFIX}-control`,
  rightAlignControl: `${PREFIX}-rightAlignControl`,
};

const Root = styled('div')(() => ({
  [`& .${classes.filterContainer}`]: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    paddingLeft: 10,
  },

  [`& .${classes.hidden}`]: {
    display: 'none',
  },

  [`& .${classes.controlsContainer}`]: {
    display: 'flex',
    alignItems: 'center',
  },

  [`& .${classes.control}`]: {
    margin: 10,
  },

  [`& .${classes.rightAlignControl}`]: {
    margin: 10,
    position: 'absolute',
    right: '2.5%',
  },
}));

interface GeneralTaskChildrenTabProps {
  readonly sweepArgs?: SweepArguments;
  generalTaskData: GeneralTaskQueryResponse;
}

const GeneralTaskChildrenTab: React.FC<GeneralTaskChildrenTabProps> = ({
  sweepArgs,
  generalTaskData,
}: GeneralTaskChildrenTabProps) => {
  const { id } = useParams<GeneralTaskParams>();
  const {
    localStorageGeneralViews,
    setLocalStorageGeneralViews,
    localStorageNamedFaultsView,
    setLocalStorageNamedFaultsView,
    localStorageNamedFaultsLocations,
    setLocalStorageNamedFaultsLocations,
    localStorageRegionalViews,
    setLocalStorageRegionalViews,
  } = useContext(LocalStorageContext);

  const [generalViews, setGeneralViews] = useState<string[]>([options[0].displayName]);
  const [namedFaultsView, setNamedFaultsView] = useState<string>(mfdPlotOptions[0].displayName);
  const [namedFaultsLocations, setNamedFaultsLocations] = useState<string[]>([namedFaultsOptions[0].displayName]);
  const [regionalViews, setRegionalViews] = useState<string[]>([regionalSolutionMfdOptions[0].displayName]);
  const [reportTab, setReportTab] = useState<number>(0);

  const [showList, setShowList] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const [filteredArguments, setFilteredArguments] = useState<FilteredArguments>({ data: [] });
  const [filteredChildren, setFilteredChildren] = useState<ValidatedChildren>({ data: [] });

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
          setGeneralViews(res.generalViews);
          setFilteredArguments(res.filter);
          setFilteredChildren(applyChildTaskFilter(childTasks, res.filter));
          setNamedFaultsView(res.namedFaultsView);
          setNamedFaultsLocations(res.namedFaultsLocations);
          setRegionalViews(res.regionalViews);
          setReportTab(res.reportTab);
        })
        .catch(() => {
          setOpenNotification(true);
        });
    }
  }, []);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
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

  const getSharableUrl = (): string => {
    const generalViewsOption: string[] = isClipBoard ? generalViews : localStorageGeneralViews;
    const namedFaultsViewOption: string = isClipBoard ? namedFaultsView : localStorageNamedFaultsView;
    const namedFaultsLocationsOption: string[] = isClipBoard ? namedFaultsLocations : localStorageNamedFaultsLocations;
    const regionalViewsOption: string[] = isClipBoard ? regionalViews : localStorageRegionalViews;

    const sharableState = {
      filter: filteredArguments,
      showList: showList,
      showFilter: showFilter,
      generalViews: generalViewsOption,
      namedFaultsView: namedFaultsViewOption,
      namedFaultsLocations: namedFaultsLocationsOption,
      regionalViews: regionalViewsOption,
      reportTab,
    };
    const url = buildUrl(baseUrl, {
      queryParams: {
        clipBoard: btoa(JSON.stringify(sharableState)),
      },
    });
    return url ?? '';
  };

  const handleViewChange = () => {
    if (showList && filteredArguments.data.length === 0 && filteredChildren.data?.length === 0) {
      const ids = getChildTaskIdArray(childTasks);
      if (ids.length === 0) {
        setOpenAlert(true);
      }
    }
    setShowList((v) => !v);
  };

  const handleCloseNotification = () => {
    setOpenNotification(false);
    history.push(`/GeneralTask/${id}/ChildTasks`);
  };

  useShortcut(handleViewChange, ['s']);
  useShortcut(() => setShowFilter((v) => !v), ['f']);
  useShortcut(() => setOpenDrawer((v) => !v), ['d']);

  if (!data?.node) {
    return (
      <Typography variant="h5" gutterBottom>
        General Task: Id Not Found
      </Typography>
    );
  }

  return (
    <Root>
      <div className={classes.controlsContainer}>
        <Tooltip title="use (f/F) to open/close filters">
          <Button
            className={classes.control}
            color="inherit"
            variant="contained"
            onClick={() => setShowFilter((v) => !v)}
          >
            <span>
              Filter&nbsp;
              {`${filteredArguments.data.length ? filteredChildren.data?.length ?? 0 : childTasks.data?.length ?? 0}/${
                childTasks.data?.length ?? 0
              }`}
            </span>
          </Button>
        </Tooltip>
        <Tooltip title="use (s/S) to toggle between views">
          <Button color="inherit" className={classes.control} variant="contained" onClick={handleViewChange}>
            {showList ? 'Show Report' : 'Show List'}
          </Button>
        </Tooltip>
        <Tooltip title="use (d/D) to open/close details">
          <Button
            color="inherit"
            className={classes.control}
            variant="contained"
            onClick={() => setOpenDrawer((v) => !v)}
          >
            Details
          </Button>
        </Tooltip>
        <Fab className={classes.rightAlignControl} color="primary" onClick={() => setShowShare(true)}>
          <ShareIcon />
        </Fab>
      </div>
      <div className={showFilter ? classes.filterContainer : classes.hidden}>
        <ControlsBar>
          {sweepArgs?.map((argument) => (
            <SweepArgumentFilter key={`${argument?.k}-filter`} argument={argument} onChange={handleChange} />
          ))}
          <Button color="inherit" variant="contained" onClick={applyFilter}>
            Apply
          </Button>
        </ControlsBar>
      </div>
      <React.Suspense fallback={<CircularProgress />}>
        {showList ? (
          <div>
            {!!filteredChildren.data?.length ? (
              <ChildTaskTable data={filteredChildren} />
            ) : (
              data?.node?.children?.edges?.length && <ChildTaskTable data={childTasks} />
            )}
          </div>
        ) : (
          <InversionSolutionDiagnosticContainer
            sweepArgs={sweepArgs}
            modelType={data?.node?.model_type as string}
            ids={
              filteredChildren.data?.length ? getChildTaskIdArray(filteredChildren) : getChildTaskIdArray(childTasks)
            }
            generalViews={isClipBoard ? generalViews : localStorageGeneralViews}
            setGeneralViews={isClipBoard ? setGeneralViews : setLocalStorageGeneralViews}
            namedFaultsView={isClipBoard ? namedFaultsView : localStorageNamedFaultsView}
            setNamedFaultsView={isClipBoard ? setNamedFaultsView : setLocalStorageNamedFaultsView}
            namedFaultsLocations={isClipBoard ? namedFaultsLocations : localStorageNamedFaultsLocations}
            setNamedFaultsLocations={isClipBoard ? setNamedFaultsLocations : setLocalStorageNamedFaultsLocations}
            regionalViews={isClipBoard ? regionalViews : localStorageRegionalViews}
            setRegionalViews={isClipBoard ? setRegionalViews : setLocalStorageRegionalViews}
            reportTab={reportTab}
            setReportTab={setReportTab}
          />
        )}
      </React.Suspense>
      <GeneralTaskDetailDrawer
        generalTaskDetails={getGeneralTaskDetailsFromQueryResponse(generalTaskData)}
        openDrawer={openDrawer}
      />
      <CommonModal
        input={false}
        title="Share with this url"
        openModal={showShare}
        text={getSharableUrl()}
        handleClose={() => setShowShare(false)}
      />
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openNotification}
        onClose={handleCloseNotification}
      >
        <Alert variant="filled" severity="warning">
          Sorry, this URL is invalid. The clipBoard state cannot be applied.
        </Alert>
      </Snackbar>
      {openAlert && (
        <DialogAlert
          open={openAlert}
          title="Cannot Query Reports"
          text={`Reports cannot be queried when the list of filtered child tasks is over ${maxLength}.`}
          handleClose={() => setOpenAlert(false)}
        />
      )}
    </Root>
  );
};

export default GeneralTaskChildrenTab;

const generalTaskChildrenTabQuery = graphql`
  query GeneralTaskChildrenTabQuery($id: ID!) {
    node(id: $id) {
      ... on GeneralTask {
        id
        model_type
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
