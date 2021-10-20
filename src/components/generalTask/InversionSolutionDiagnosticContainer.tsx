import React, { useEffect, useState } from 'react';
import { useQueryLoader } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';
import { Button, Fab, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import ShareIcon from '@material-ui/icons/Share';

import SweepArgumentFilter from './SweepArgumentFilter';
import { InversionSolutionDiagnosticContainerQuery } from './__generated__/InversionSolutionDiagnosticContainerQuery.graphql';
import { SweepArguments, ValidatedChildren } from '../../interfaces/generaltask';
import DiagnosticReportContainer from '../diagnosticReportView/DiagnosticReportContainer';
import DiagnosticReportControls from '../diagnosticReportView/DiagnosticReportControls';
import GeneralTaskDetailDrawer from '../diagnosticReportView/GeneralTaskDetailDrawer';
import { GeneralTaskDetails } from '../../interfaces/diagnosticReport';
import CommonModal from '../common/Modal/CommonModal';

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
  filteredChildren: ValidatedChildren;
  readonly sweepArgs?: SweepArguments;
  ids?: string[];
  filterCount: string;
  showList: boolean;
  showFilter: boolean;
  setShowFilter: (value: boolean) => void;
  viewOptions: string[];
  setViewOptions: (newViewOptions: string[]) => void;
  onChange: (event: React.ChangeEvent<{ value: unknown; name?: string | undefined }>) => void;
  applyFilter: () => void;
  handleViewChange: () => void;
  getUrl: () => string;
}

const InversionSolutionDiagnosticContainer: React.FC<InversionSolutionDiagnosticContainerProps> = ({
  generalTaskDetails,
  filteredChildren,
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

  useEffect(() => {
    loadQuery({ id: ids });
  }, [ids]);

  const keypressHandler = (event: KeyboardEvent) => {
    if (event.key === 's' || event.key === 'S') handleViewChange();
    if (event.key === 'f' || event.key === 'F') setShowFilter(!showFilter);
    if (event.key === 'd' || event.key === 'D') setOpenDrawer((v) => !v);
  };

  useEffect(() => {
    window.addEventListener('keypress', keypressHandler);
    return () => window.removeEventListener('keypress', keypressHandler);
  }, [filteredChildren]);

  const handleShare = () => {
    const url = getUrl();
    setSharableUrl(url);
    setShowShare(true);
  };

  return (
    <>
      <div className={classes.controlsContainer}>
        <Tooltip title="use (f/F) to open/close filters">
          <Button className={classes.control} variant="contained" onClick={() => setShowFilter(!showFilter)}>
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
        <DiagnosticReportContainer sweepArgs={sweepArgs} viewOptions={viewOptions} queryRef={queryRef} />
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
