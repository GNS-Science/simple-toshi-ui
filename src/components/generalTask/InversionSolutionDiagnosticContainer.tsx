import React, { useEffect, useState } from 'react';
import { useQueryLoader } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';
import { Button, Fab, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import ShareIcon from '@material-ui/icons/Share';

import SweepArgumentFilter from './SweepArgumentFilter';
import { InversionSolutionDiagnosticContainerQuery } from './__generated__/InversionSolutionDiagnosticContainerQuery.graphql';
import { SweepArguments } from '../../interfaces/generaltask';
import DiagnosticReportContainer from '../diagnosticReportView/DiagnosticReportContainer';
import DiagnosticReportControls from '../diagnosticReportView/DiagnosticReportControls';
import GeneralTaskDetailDrawer from '../diagnosticReportView/GeneralTaskDetailDrawer';
import { GeneralTaskDetails } from '../../interfaces/diagnosticReport';
import CommonModal from '../common/Modal/CommonModal';
import { useShortcut } from '../../hooks/useShortcut';
import MultiSelect from '../common/MultiSelect';
import { mfdPlotOptions, NamedFaultsOption, namedFaultsOptions } from '../../constants/nameFaultsMfds';

const useStyles = makeStyles(() => ({
  filterContainer: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    paddingLeft: 10,
  },
  hidden: {
    display: 'none',
  },
  controlsContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  control: {
    margin: 10,
  },
  rightAlignControl: {
    margin: 10,
    position: 'absolute',
    right: '2.5%',
  },
}));

interface InversionSolutionDiagnosticContainerProps {
  generalTaskDetails: GeneralTaskDetails;
  readonly sweepArgs?: SweepArguments;
  ids?: string[];
  filterCount: string;
  showList: boolean;
  showFilter: boolean;
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
  viewOptions: string[];
  setViewOptions: (newViewOptions: string[]) => void;
  onChange: (event: React.ChangeEvent<{ value: unknown; name?: string | undefined }>) => void;
  applyFilter: () => void;
  handleViewChange: () => void;
  getUrl: () => string;
}

const InversionSolutionDiagnosticContainer: React.FC<InversionSolutionDiagnosticContainerProps> = ({
  generalTaskDetails,
  sweepArgs,
  ids,
  filterCount,
  showList,
  showFilter,
  setShowFilter,
  viewOptions,
  setViewOptions,
  onChange,
  applyFilter,
  handleViewChange,
  getUrl,
}: InversionSolutionDiagnosticContainerProps) => {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [queryRef, loadQuery] = useQueryLoader<InversionSolutionDiagnosticContainerQuery>(
    inversionSolutionDiagnosticContainerQuery,
  );
  const [showShare, setShowShare] = useState(false);
  const [sharableUrl, setSharableUrl] = useState<string>('');
  const [namedFaultsSelection, setNamedFaultsSelection] = useState<NamedFaultsOption[]>([namedFaultsOptions[0]]);

  useEffect(() => {
    loadQuery({ id: ids });
  }, [ids]);

  useShortcut(handleViewChange, ['s']);
  useShortcut(() => setShowFilter((v) => !v), ['f']);
  useShortcut(() => setOpenDrawer((v) => !v), ['d']);

  const handleShare = () => {
    const url = getUrl();
    setSharableUrl(url);
    setShowShare(true);
  };

  const faultOptions: string[] = [];

  namedFaultsOptions.map((option) => {
    faultOptions.push(option.displayName);
  });

  const handleNamedFaultsSelect = (selection: string[]) => {
    const filtered = namedFaultsOptions.filter((option) => {
      const result = selection.includes(option.displayName);
      return result;
    });
    setNamedFaultsSelection(filtered);
  };

  return (
    <>
      <div className={classes.controlsContainer}>
        <Tooltip title="use (f/F) to open/close filters">
          <Button className={classes.control} variant="contained" onClick={() => setShowFilter((v) => !v)}>
            <span>Filter&nbsp;({filterCount})</span>
          </Button>
        </Tooltip>
        <Tooltip title="use (s/S) to toggle between views">
          <Button className={classes.control} variant="contained" onClick={handleViewChange}>
            {showList ? 'Show Report' : 'Show List'}
          </Button>
        </Tooltip>
        <Tooltip title="use (d/D) to open/close details">
          <Button className={classes.control} variant="contained" onClick={() => setOpenDrawer((v) => !v)}>
            Details
          </Button>
        </Tooltip>
        <DiagnosticReportControls viewOptions={viewOptions} setViewOption={setViewOptions} />
        <MultiSelect name="Named Faults" options={faultOptions} setOptions={handleNamedFaultsSelect} />
        <Fab className={classes.rightAlignControl} color="primary" onClick={handleShare}>
          <ShareIcon />
        </Fab>
      </div>
      <div className={showFilter ? classes.filterContainer : classes.hidden}>
        {sweepArgs?.map((argument) => (
          <SweepArgumentFilter key={`${argument?.k}-filter`} argument={argument} onChange={onChange} />
        ))}
        <Button color="primary" variant="contained" onClick={applyFilter}>
          Apply
        </Button>
      </div>
      {queryRef && !showList && (
        <DiagnosticReportContainer
          namedFaults={namedFaultsSelection}
          sweepArgs={sweepArgs}
          viewOptions={viewOptions}
          queryRef={queryRef}
        />
      )}
      <GeneralTaskDetailDrawer generalTaskDetails={generalTaskDetails} openDrawer={openDrawer} />
      <CommonModal
        input={false}
        title="Share with this url"
        openModal={showShare}
        text={sharableUrl}
        handleClose={() => setShowShare(false)}
      />
    </>
  );
};

export default InversionSolutionDiagnosticContainer;

export const inversionSolutionDiagnosticContainerQuery = graphql`
  query InversionSolutionDiagnosticContainerQuery($id: [ID!]) {
    nodes(id_in: $id) {
      result {
        edges {
          node {
            __typename
            ... on AutomationTask {
              created
              task_type
              id
              inversion_solution {
                id
                file_name
                meta {
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
`;
