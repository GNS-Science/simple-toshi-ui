import { styled } from '@mui/material/styles';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Card, CardContent, Typography, Tabs, Tab, CircularProgress } from '@mui/material';
import { IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';

// import json
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

const Info = styled(Typography)(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  flexDirection: 'row',
  alignContent: 'space-between',
}));

const infoStyle = {
  padding: 0,
  margin: 0,
};

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
  automationTasks,
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
  const [regional, setRegional] = useState<boolean>(true);

  useEffect(() => {
    setCurrentImage(0);
  }, [automationTasks]);

  useEffect(() => {
    if (reportTab !== 0) setCurrentTab(reportTab ?? 0);
  }, [reportTab]);

  useEffect(() => {
    setReportTab && setReportTab(currentTab);
  }, [setReportTab, currentTab]);

  useEffect(() => {
    if (automationTasks[currentImage]) {
      const tvzValue = automationTasks[currentImage].inversion_solution?.meta?.filter(
        (kv) => kv?.k && kv?.k === 'enable_tvz_mfd',
      )[0]?.v;
      if (tvzValue === 'False') {
        setRegional(false);
      } else if (tvzValue === 'True') {
        setRegional(true);
      }
    }
  }, [automationTasks]);

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
  }, [sweepArgs, sweepList, automationTasks, currentImage]);

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
    if (disableHotkey === false) {
      if (event.key === '>' || event.key === '.' || event.key === 'ArrowRight') nextImage();
      if (event.key === '<' || event.key === ',' || event.key === 'ArrowLeft') prevImage();
    }
  };

  const tagToolTip = (v: string | null) => {
    try {
      if (v && 'tag' in JSON.parse(v.replaceAll("'", '"'))) {
        return (
          <Tooltip title={v}>
            <span style={{ display: 'inline-flex' }}>
              {JSON.parse(v.replaceAll("'", '"')).tag}
              <InfoIcon sx={{ fontSize: 20, position: 'relative', top: 1, left: 2 }} color="disabled" />
            </span>
          </Tooltip>
        );
      } else {
        return <span>{v}</span>;
      }
    } catch {
      return <span>{v}</span>;
    }
  };

  useEffect(() => {
    window.addEventListener('keyup', hotkeyHandler);
    return () => window.removeEventListener('keyup', hotkeyHandler);
  });

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
          <Info>
            {filteredMeta.map((kv) => (
              <p style={infoStyle} key={kv?.k}>
                <strong>{kv?.k}:</strong> {tagToolTip(kv?.v)} &nbsp;
              </p>
            ))}
          </Info>
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
            <Tab label="MFD Solutions" id="simple-tab-1" disabled={modelType !== 'CRUSTAL'} disableFocusRipple />
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
