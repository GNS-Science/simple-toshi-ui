import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Card, CardContent, IconButton, makeStyles, Tooltip, Typography, Tabs, Tab } from '@material-ui/core';
import buildUrl from 'build-url-ts';

import { ReportItem } from '../../interfaces/diagnosticReport';
import FavouriteControls from '../common/FavouriteControls';
import DiagnosticReportTabPanel from './DiagnosticReportTabPanel';
import { mfdPlotOptions, NamedFaultsOption, namedFaultsOptions, PlotOption } from '../../constants/nameFaultsMfds';
import SelectControl from '../common/SelectControl';
import MultiSelect from '../common/MultiSelect';
import GeneralView from './GeneralView';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  buttonContainer: {
    paddingLeft: '25%',
    paddingRight: '25%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    paddingLeft: 70,
    paddingRight: 70,
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  image: {
    padding: '5px',
    maxHeight: '80vh',
    width: '25%',
    objectFit: 'contain',
    flexGrow: 3,
    flexShrink: 4,
  },
}));

interface DiagnosticReportCardProps {
  modelType: string;
  automationTasks: ReportItem[];
  generalViews: string[];
  setGeneralViews: (selection: string[]) => void;
  namedFaultsView: string;
  setNamedFaultsView: (selection: string) => void;
  namedFaultsLocations: string[];
  setNamedFaultsLocations: (selection: string[]) => void;
  changeCurrentImage?: (index: number) => void;
  reportTab?: number;
  setReportTab?: (tab: number) => void;
}

const DiagnosticReportCard: React.FC<DiagnosticReportCardProps> = ({
  modelType,
  automationTasks,
  generalViews,
  setGeneralViews,
  namedFaultsView,
  setNamedFaultsView,
  namedFaultsLocations,
  setNamedFaultsLocations,
  changeCurrentImage,
  reportTab,
  setReportTab,
}: DiagnosticReportCardProps) => {
  const classes = useStyles();
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [currentTab, setCurrentTab] = useState<number>(0);
  const reportBaseUrl = process.env.REACT_APP_REPORTS_URL;

  useEffect(() => {
    if (reportTab === 1) setCurrentTab(1);
  }, []);

  useEffect(() => {
    setReportTab && setReportTab(currentTab);
  }, [currentTab]);

  const [namedFaultsSelection, setNamedFaultsSelection] = useState<NamedFaultsOption[]>([namedFaultsOptions[0]]);
  const [mfdPlotSelection, setMfdPlotSelection] = useState<PlotOption>(mfdPlotOptions[0]);

  useEffect(() => {
    const filtered = namedFaultsOptions.filter((option) => {
      const result = namedFaultsLocations?.includes(option.displayName);
      return result;
    });
    setNamedFaultsSelection(filtered);
    mfdPlotOptions.map((option) => {
      if (namedFaultsView === option.displayName) {
        setMfdPlotSelection(option);
      }
    });
  }, [namedFaultsView, namedFaultsLocations]);

  const namedFaultsUrl = (id: string, typePath: string, faultPath: string, typeSuffix: string) => {
    return buildUrl(reportBaseUrl, {
      path: `/opensha/DATA/${id}/named_fault_mfds/${typePath}/${faultPath}${typeSuffix}`,
    });
  };

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
  const faultOptions: string[] = [];

  namedFaultsOptions.map((option) => {
    faultOptions.push(option.displayName);
  });

  const mfdPlot: string[] = [];

  mfdPlotOptions.map((option) => {
    mfdPlot.push(option.displayName);
  });

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <h4>
            Inversion Solution {automationTasks[currentImage].inversion_solution.id}&nbsp;&nbsp;&nbsp;
            <Link to={`/InversionSolution/${automationTasks[currentImage].inversion_solution.id}`}>[more]</Link>
          </h4>
          <Typography>
            {automationTasks[currentImage].inversion_solution.meta.map((kv) => (
              <span key={kv?.k}>
                {kv?.k}: {kv?.v}, &nbsp;
              </span>
            ))}
          </Typography>
          <div className={classes.buttonContainer}>
            <Tooltip title="use (<,) (>.) or arrow keys to navigate">
              <IconButton className={classes.button} color="primary" onClick={prevImage} disabled={currentImage === 0}>
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
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </Tooltip>
            <FavouriteControls
              id={automationTasks[currentImage].inversion_solution.id}
              producedBy={automationTasks[currentImage].id}
            />
          </div>
          <Tabs value={currentTab} onChange={handleTabChange}>
            <Tab label="General" id="simple-tab-0" />
            <Tab label="Named Faults" id="simple-tab-1" disabled={modelType !== 'CRUSTAL'} />
          </Tabs>
          <DiagnosticReportTabPanel value={currentTab} index={0}>
            <GeneralView
              id={automationTasks[currentImage].inversion_solution.id}
              generalViews={generalViews}
              setGeneralViews={setGeneralViews}
            />
          </DiagnosticReportTabPanel>
          <DiagnosticReportTabPanel value={currentTab} index={1}>
            <MultiSelect name="Named Faults" options={faultOptions} setOptions={setNamedFaultsLocations} />
            <SelectControl name="Mfd Plot Views" options={mfdPlot} setOptions={setNamedFaultsView} />
            <div className={classes.imageContainer}>
              {namedFaultsSelection?.map((item) => (
                <img
                  key={item.path}
                  className={classes.image}
                  src={namedFaultsUrl(
                    automationTasks[currentImage].inversion_solution.id,
                    mfdPlotSelection.typePath as string,
                    item.path,
                    mfdPlotSelection?.path as string,
                  )}
                />
              ))}
            </div>
          </DiagnosticReportTabPanel>
        </CardContent>
      </Card>
    </>
  );
};

export default DiagnosticReportCard;
