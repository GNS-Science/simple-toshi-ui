import { styled } from '@mui/material/styles';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Tabs, Tab, CircularProgress } from '@mui/material';

import DiagnosticReportTabPanel from './DiagnosticReportTabPanel';
import { GeneralView } from './GeneralView';
import NamedFaultsView from './NamedFaultsView';
import RegionalMfdView from './RegionalMfdView';
import InversionSolutionHazardCharts from '../inversionSolution/InversionSolutionHazardCharts';
import ParentFaultView from './ParentFaultViews';
import { SweepArguments, UnifiedInversionSolution, UnifiedInversionSolutionType } from '../../interfaces/generaltask';
import { MetaArguments } from '../../interfaces/mySolutions';
import { filteredMetaGT, filterMetaArguments } from '../../service/diagnosticReports.service';
import SolutionAnalysisTab from '../inversionSolution/SolutionAnalysisTab';
import { MetaToolTip } from '../common/MetaToolTip';
import FlipChartControls from './utils/FlipChartControls';

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
  unifiedInversionSolutions: UnifiedInversionSolution[];
  sweepArgs?: SweepArguments;
  sweepList?: string[];
  modelType: string;
  generalViews: string[];
  setGeneralViews: (selection: string[]) => void;
  namedFaultsView: string;
  setNamedFaultsView: (selection: string) => void;
  namedFaultsLocations: string[];
  setNamedFaultsLocations: (selection: string[]) => void;
  regionalViews: string[];
  setRegionalViews: (views: string[]) => void;
  nonRegionalViews: string[];
  setNonRegionalViews: (views: string[]) => void;
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
  unifiedInversionSolutions,
  generalViews,
  setGeneralViews,
  namedFaultsView,
  setNamedFaultsView,
  namedFaultsLocations,
  setNamedFaultsLocations,
  regionalViews,
  setRegionalViews,
  nonRegionalViews,
  setNonRegionalViews,
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
  const [regional, setRegional] = useState<boolean>(false);
  const [solutionType, setSolutionType] = useState<string>('');

  useEffect(() => {
    if (unifiedInversionSolutions[currentImage]) {
      switch (unifiedInversionSolutions[currentImage].type) {
        case UnifiedInversionSolutionType.SCALED_INVERSION_SOLUTION:
          setSolutionType('SCALED_INVERSION_SOLUTION');
          break;
        case UnifiedInversionSolutionType.INVERSION_SOLUTION:
          setSolutionType('INVERSION_SOLUTION');
          break;
        case UnifiedInversionSolutionType.TIME_DEPENDENT_SOLUTION:
          setSolutionType('TIME_DEPENDENT_SOLUTION');
          break;
      }
    }
  }, [unifiedInversionSolutions, currentImage]);

  useEffect(() => {
    setCurrentImage(0);
  }, [unifiedInversionSolutions]);

  useEffect(() => {
    if (reportTab !== 0) setCurrentTab(reportTab ?? 0);
  }, [reportTab]);

  useEffect(() => {
    setReportTab && setReportTab(currentTab);
  }, [setReportTab, currentTab]);

  useEffect(() => {
    if (unifiedInversionSolutions[currentImage]) {
      const tvzValue = unifiedInversionSolutions[currentImage].solution?.meta?.filter(
        (kv) => kv?.k && kv?.k === 'enable_tvz_mfd',
      )[0]?.v;
      const sourceTvz = unifiedInversionSolutions[currentImage].solution?.source_solution?.meta?.filter(
        (kv) => kv?.k && kv?.k === 'enable_tvz_mfd',
      )[0]?.v;
      if (tvzValue === 'False' || sourceTvz === 'False') {
        setRegional(false);
      } else if (tvzValue === 'True' || sourceTvz === 'True') {
        setRegional(true);
      }
    }
  }, [currentImage, unifiedInversionSolutions]);

  useEffect(() => {
    if (unifiedInversionSolutions[currentImage]) {
      const hazardTableId = unifiedInversionSolutions[currentImage].solution.hazardId;
      hazardTableId ? setHazardId(hazardTableId) : setHazardId('');
      let metaList: MetaArguments = [];
      if (sweepArgs) {
        metaList = filteredMetaGT(unifiedInversionSolutions[currentImage].solution.meta, sweepArgs);
      } else if (sweepList) {
        metaList = filterMetaArguments(unifiedInversionSolutions[currentImage].solution.meta, sweepList);
      }
      setFilteredMeta(metaList);
    }
  }, [currentImage, sweepList, sweepArgs, unifiedInversionSolutions]);

  const nextImage = () => {
    if (currentImage < unifiedInversionSolutions.length - 1) {
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
    if (disableHotkey === false) {
      if (event.key === '>' || event.key === '.' || event.key === 'ArrowRight') nextImage();
      if (event.key === '<' || event.key === ',' || event.key === 'ArrowLeft') prevImage();
    }
  };

  useEffect(() => {
    window.addEventListener('keyup', hotkeyHandler);
    return () => window.removeEventListener('keyup', hotkeyHandler);
  });

  if (!unifiedInversionSolutions[currentImage]) {
    return <Typography> There are no valid reports to show. </Typography>;
  }

  const renderTab = () => {
    switch (currentTab) {
      default:
        return (
          <DiagnosticReportTabPanel value={currentTab} index={0}>
            <GeneralView
              id={unifiedInversionSolutions[currentImage].solution.id}
              mfdTableId={unifiedInversionSolutions[currentImage].solution.mfdTableId as string}
              meta={unifiedInversionSolutions[currentImage].solution.meta}
              filteredMeta={filteredMeta}
              currentImage={currentImage}
              automationTasksLength={unifiedInversionSolutions.length}
              generalViews={generalViews}
              setGeneralViews={setGeneralViews}
              solutionType={solutionType}
            />
          </DiagnosticReportTabPanel>
        );
      case 1:
        return (
          <DiagnosticReportTabPanel value={currentTab} index={1}>
            <RegionalMfdView
              id={unifiedInversionSolutions[currentImage].solution.id}
              regionalViews={regionalViews}
              setRegionalViews={setRegionalViews}
              nonRegionalViews={nonRegionalViews}
              setNonRegionalViews={setNonRegionalViews}
              regional={regional}
            />
          </DiagnosticReportTabPanel>
        );
      case 2:
        return (
          <DiagnosticReportTabPanel value={currentTab} index={2}>
            <NamedFaultsView
              id={unifiedInversionSolutions[currentImage].solution.id}
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
              id={unifiedInversionSolutions[currentImage].solution.id}
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
              id={unifiedInversionSolutions[currentImage].solution.id}
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
            {solutionType === 'SCALED_INVERSION_SOLUTION'
              ? 'Scaled Inversion Solution'
              : solutionType === 'INVERSION_SOLUTION'
              ? 'Inversion Solution'
              : 'Time Dependent Inversion Solution'}
            :&nbsp;
            {unifiedInversionSolutions[currentImage].solution.id}&nbsp;&nbsp;&nbsp;
            <Link
              to={
                solutionType === 'SCALED_INVERSION_SOLUTION'
                  ? `/ScaledInversionSolution/${unifiedInversionSolutions[currentImage].solution.id}`
                  : solutionType === 'INVERSION_SOLUTION'
                  ? `/InversionSolution/${unifiedInversionSolutions[currentImage].solution.id}`
                  : `/TimeDependentInversionSolution/${unifiedInversionSolutions[currentImage].solution.id}`
              }
            >
              [more]
            </Link>
          </h4>
          <MetaToolTip meta={filteredMeta} />
          <FlipChartControls
            id={unifiedInversionSolutions[currentImage].solution.id}
            producedBy={unifiedInversionSolutions[currentImage].id}
            currentImage={currentImage}
            handlePrev={prevImage}
            handleNext={nextImage}
            totalLength={unifiedInversionSolutions.length}
            disableHotkey={disableHotkey}
          />
          <Tabs value={currentTab} onChange={handleTabChange}>
            <Tab label="General" id="simple-tab-0" disableFocusRipple />
            <Tab
              label="MFD Solutions"
              id="simple-tab-1"
              disabled={modelType !== 'CRUSTAL' || solutionType === 'SCALED_INVERSION_SOLUTION'}
              disableFocusRipple
            />
            <Tab
              label="Named Faults"
              id="simple-tab-2"
              disabled={modelType !== 'CRUSTAL' || solutionType === 'SCALED_INVERSION_SOLUTION'}
              disableFocusRipple
            />
            <Tab
              label="Parent Faults"
              id="simple-tab-3"
              disabled={modelType !== 'CRUSTAL' || solutionType === 'SCALED_INVERSION_SOLUTION'}
              disableFocusRipple
            />
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
