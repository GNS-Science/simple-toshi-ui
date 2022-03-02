import { styled } from '@mui/material/styles';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Card, CardContent, Tooltip, Typography, Tabs, Tab, CircularProgress } from '@mui/material';
import { IconButton } from '@mui/material';

import FavouriteControls from '../common/FavouriteControls';
import DiagnosticReportTabPanel from './DiagnosticReportTabPanel';
import GeneralView from './GeneralView';
import NamedFaultsView from './NamedFaultsView';
import RegionalMfdView from './RegionalMfdView';
import InversionSolutionHazardCharts from '../inversionSolution/InversionSolutionHazardCharts';
import ParentFaultView from './ParentFaultViews';
import { SweepArguments, ValidatedSubtask } from '../../interfaces/generaltask';
import { MetaArguments } from '../../interfaces/mySolutions';
import { filteredMetaGT, filterMetaArguments } from '../../service/diagnosticReports.service';
import SolutionAnalysisTab from '../inversionSolution/SolutionAnalysisTab';

const PREFIX = 'DiagnosticReportCard';

const classes = {
  root: `${PREFIX}-root`,
  buttonContainer: `${PREFIX}-buttonContainer`,
  button: `${PREFIX}-button`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(() => ({
  [`& .${classes.root}`]: {
    flexGrow: 1,
  },

  [`& .${classes.buttonContainer}`]: {
    paddingLeft: '25%',
    paddingRight: '25%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  [`& .${classes.button}`]: {
    paddingLeft: 70,
    paddingRight: 70,
  },
}));

interface DiagnosticReportCardProps {
  sweepArgs?: SweepArguments;
  sweepList?: string[];
  modelType: string;
  automationTasks: ValidatedSubtask[];
  generalViews: string[];
  setGeneralViews: (selection: string[]) => void;
  namedFaultsView: string;
  setNamedFaultsView: (selection: string) => void;
  namedFaultsLocations: string[];
  setNamedFaultsLocations: (selection: string[]) => void;
  regionalViews: string[];
  setRegionalViews: (views: string[]) => void;
  changeCurrentImage?: (index: number) => void;
  reportTab?: number;
  setReportTab?: (tab: number) => void;
  parentFaultViews: string[];
  setParentFaultViews: (views: string[]) => void;
  parentFault: string;
  setParentFault: (fault: string) => void;
  disableHotkey: boolean;
  setDisableHotkey: Dispatch<SetStateAction<boolean>>;
}

const DiagnosticReportCard: React.FC<DiagnosticReportCardProps> = ({
  sweepArgs,
  sweepList,
  modelType,
  automationTasks,
  generalViews,
  setGeneralViews,
  namedFaultsView,
  setNamedFaultsView,
  namedFaultsLocations,
  setNamedFaultsLocations,
  regionalViews,
  setRegionalViews,
  changeCurrentImage,
  reportTab,
  setReportTab,
  parentFaultViews,
  setParentFaultViews,
  parentFault,
  setParentFault,
  disableHotkey,
  setDisableHotkey,
}: DiagnosticReportCardProps) => {
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [hazardId, setHazardId] = useState<string>('');
  const [filteredMeta, setFilteredMeta] = useState<MetaArguments>([]);

  useEffect(() => {
    setCurrentImage(0);
  }, [automationTasks]);

  useEffect(() => {
    if (reportTab !== 0) setCurrentTab(reportTab ?? 0);
  }, []);

  useEffect(() => {
    setReportTab && setReportTab(currentTab);
  }, [currentTab]);

  useEffect(() => {
    if (automationTasks[currentImage] && automationTasks[currentImage].inversion_solution.tables) {
      const hazardTable = automationTasks[currentImage].inversion_solution.tables?.find(
        (table) => table?.table_type === 'HAZARD_SITES',
      );
      hazardTable ? setHazardId(hazardTable?.table_id as string) : setHazardId('');
      let metaList: MetaArguments = [];
      if (sweepArgs) {
        metaList = filteredMetaGT(automationTasks[currentImage].inversion_solution.meta, sweepArgs);
      } else if (sweepList) {
        metaList = filterMetaArguments(automationTasks[currentImage].inversion_solution.meta, sweepList);
      }
      setFilteredMeta(metaList);
    }
  }, [currentImage]);

  const nextImage = () => {
    if (currentImage < automationTasks.length - 1) {
      setCurrentImage(currentImage + 1);
      changeCurrentImage && changeCurrentImage(currentImage + 1);
    }
  };

  const prevImage = () => {
    if (currentImage > 0) {
      setCurrentImage(currentImage - 1);
      changeCurrentImage && changeCurrentImage(currentImage - 1);
    }
  };

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setCurrentTab(newValue);
  };

  const hotkeyHandler = (event: KeyboardEvent) => {
    if (event.key === '>' || event.key === '.' || event.key === 'ArrowRight') nextImage();
    if (event.key === '<' || event.key === ',' || event.key === 'ArrowLeft') prevImage();
  };

  useEffect(() => {
    window.addEventListener('keyup', hotkeyHandler);
    return () => window.removeEventListener('keyup', hotkeyHandler);
  }, [currentImage]);

  if (!automationTasks[currentImage]) {
    return <Typography> There are no valid reports to show. </Typography>;
  }

  const renderTab = () => {
    switch (currentTab) {
      default:
        return (
          <DiagnosticReportTabPanel value={currentTab} index={0}>
            <GeneralView
              id={automationTasks[currentImage].inversion_solution.id}
              mfdTableId={automationTasks[currentImage].inversion_solution.mfd_table_id}
              meta={automationTasks[currentImage].inversion_solution.meta}
              generalViews={generalViews}
              setGeneralViews={setGeneralViews}
            />
          </DiagnosticReportTabPanel>
        );
      case 1:
        return (
          <DiagnosticReportTabPanel value={currentTab} index={1}>
            <RegionalMfdView
              id={automationTasks[currentImage].inversion_solution.id}
              regionalViews={regionalViews}
              setRegionalViews={setRegionalViews}
            />
          </DiagnosticReportTabPanel>
        );
      case 2:
        return (
          <DiagnosticReportTabPanel value={currentTab} index={2}>
            <NamedFaultsView
              id={automationTasks[currentImage].inversion_solution.id}
              namedFaultsView={namedFaultsView}
              setNamedFaultsView={setNamedFaultsView}
              namedFaultsLocations={namedFaultsLocations}
              setNamedFaultsLocations={setNamedFaultsLocations}
            />
          </DiagnosticReportTabPanel>
        );

      case 3:
        return (
          <DiagnosticReportTabPanel value={currentTab} index={3}>
            <ParentFaultView
              id={automationTasks[currentImage].inversion_solution.id}
              parentFaultViews={parentFaultViews}
              setParentFaultViews={setParentFaultViews}
              parentFault={parentFault}
              setParentFault={setParentFault}
              setDisableHotkey={setDisableHotkey}
            />
          </DiagnosticReportTabPanel>
        );
      case 4:
        return (
          <DiagnosticReportTabPanel value={currentTab} index={4}>
            {hazardId.length ? (
              <React.Suspense fallback={<CircularProgress />}>
                <InversionSolutionHazardCharts id={hazardId} />
              </React.Suspense>
            ) : (
              <Typography>There is no hazard table for this task.</Typography>
            )}
          </DiagnosticReportTabPanel>
        );
      case 5:
        return (
          <DiagnosticReportTabPanel value={currentTab} index={5}>
            <SolutionAnalysisTab
              id={automationTasks[currentImage].inversion_solution.id}
              setDisableHotkey={setDisableHotkey}
            />
          </DiagnosticReportTabPanel>
        );
    }
  };

  return (
    <Root>
      <Card className={classes.root}>
        <CardContent>
          <h4>
            Inversion Solution {automationTasks[currentImage].inversion_solution.id}&nbsp;&nbsp;&nbsp;
            <Link to={`/InversionSolution/${automationTasks[currentImage].inversion_solution.id}`}>[more]</Link>
          </h4>
          <Typography>
            {filteredMeta.map((kv) => (
              <span key={kv?.k}>
                {kv?.k}: {kv?.v}, &nbsp;
              </span>
            ))}
          </Typography>
          <div className={classes.buttonContainer}>
            <Tooltip title="use (<,) (>.) or arrow keys to navigate">
              <IconButton
                className={classes.button}
                color="primary"
                onClick={prevImage}
                disabled={currentImage === 0}
                size="large"
              >
                <ArrowBackIosIcon />
              </IconButton>
            </Tooltip>
            <Typography>
              {currentImage + 1}&nbsp;of&nbsp;{automationTasks.length}
            </Typography>
            <Tooltip title="use (<,) (>.) or arrow keys to navigate">
              <IconButton
                className={classes.button}
                color="primary"
                onClick={nextImage}
                disabled={currentImage === automationTasks.length - 1}
                size="large"
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </Tooltip>
            <FavouriteControls
              id={automationTasks[currentImage].inversion_solution.id}
              producedBy={automationTasks[currentImage].id}
              disableHotkey={disableHotkey}
            />
          </div>
          <Tabs value={currentTab} onChange={handleTabChange}>
            <Tab label="General" id="simple-tab-0" disableFocusRipple />
            <Tab label="Regional Solutions" id="simple-tab-1" disabled={modelType !== 'CRUSTAL'} disableFocusRipple />
            <Tab label="Named Faults" id="simple-tab-2" disabled={modelType !== 'CRUSTAL'} disableFocusRipple />
            <Tab label="Parent Faults" id="simple-tab-3" disabled={modelType !== 'CRUSTAL'} disableFocusRipple />
            <Tab label="Hazard Charts" id="simple-tab-4" disabled={!hazardId.length} disableFocusRipple />
            <Tab label="Solution Analysis" id="simple-tab-5" disableFocusRipple />
          </Tabs>
          {renderTab()}
        </CardContent>
      </Card>
    </Root>
  );
};

export default DiagnosticReportCard;
