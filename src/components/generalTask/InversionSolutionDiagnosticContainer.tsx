import React, { useEffect, useState } from 'react';
import { useQueryLoader } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';
import { Button, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import SweepArgumentFilter from './SweepArgumentFilter';
import { InversionSolutionDiagnosticContainerQuery } from './__generated__/InversionSolutionDiagnosticContainerQuery.graphql';
import { SweepArguments } from '../../interfaces/generaltask';
import DiagnosticReportContainer from '../diagnosticReportView/DiagnosticReportContainer';
import DiagnosticReportControls from '../diagnosticReportView/DiagnosticReportControls';
import { diagnosticReportViewOptions as options } from '../../constants/diagnosticReport';
import GeneralTaskDetailDrawer from '../diagnosticReportView/GeneralTaskDetailDrawer';
import ControlsBar from '../common/ControlsBar';
import { GeneralTaskQueryResponse } from '../../pages/__generated__/GeneralTaskQuery.graphql';
import { GeneralTaskDetails } from '../../interfaces/diagnosticReport';

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
}));

interface InversionSolutionDiagnosticContainerProps {
  readonly sweepArgs?: SweepArguments;
  showList: boolean;
  showFilter: boolean;
  setShowFilter: (value: boolean) => void;
  onChange: (event: React.ChangeEvent<{ value: unknown; name?: string | undefined }>) => void;
  ids?: string[];
  filterCount: string;
  applyFilter: () => void;
  data: GeneralTaskQueryResponse;
  handleViewChange: () => void;
}

const InversionSolutionDiagnosticContainer: React.FC<InversionSolutionDiagnosticContainerProps> = ({
  sweepArgs,
  showList,
  showFilter,
  setShowFilter,
  onChange,
  ids,
  filterCount,
  applyFilter,
  data,
  handleViewChange,
}: InversionSolutionDiagnosticContainerProps) => {
  const classes = useStyles();
  const [viewOptions, setViewOptions] = useState<string[]>([options[0].finalPath]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [queryRef, loadQuery] = useQueryLoader<InversionSolutionDiagnosticContainerQuery>(
    inversionSolutionDiagnosticContainerQuery,
  );

  useEffect(() => {
    loadQuery({ id: ids });
  }, [ids]);

  const generalTaskDetails: GeneralTaskDetails = {
    title: data?.node?.title ?? '',
    id: data?.node?.id ?? '',
    created: (data?.node?.created as string) ?? '',
    model_type: data?.node?.model_type ?? '',
    description: data?.node?.description ?? '',
    notes: data?.node?.notes ?? '',
    swept_arguments: (data?.node?.swept_arguments as string[]) ?? [],
    argument_lists: data?.node?.argument_lists ?? [],
  };

  const keypressHandler = (event: KeyboardEvent) => {
    if (event.key === 's' || event.key === 'S') handleViewChange();
    if (event.key === 'f' || event.key === 'F') setShowFilter(!showFilter);
    if (event.key === 'd' || event.key === 'D') setOpenDrawer((v) => !v);
  };

  useEffect(() => {
    window.addEventListener('keypress', keypressHandler);
    return () => window.removeEventListener('keypress', keypressHandler);
  }, [showFilter]);

  return (
    <>
      <ControlsBar>
        <Tooltip title="use (f/F) to open/close filters">
          <Button variant="contained" color="default" onClick={() => setShowFilter(!showFilter)}>
            <span>Filter&nbsp;({filterCount})</span>
          </Button>
        </Tooltip>
        <Tooltip title="use (s/S) to toggle between views">
          <Button color="default" variant="contained" onClick={handleViewChange}>
            {showList ? 'Show Report' : 'Show List'}
          </Button>
        </Tooltip>
        <Tooltip title="use (d/D) to open/close details">
          <Button color="default" variant="contained" onClick={() => setOpenDrawer((v) => !v)}>
            Details
          </Button>
        </Tooltip>
        <DiagnosticReportControls setViewOption={setViewOptions} />
      </ControlsBar>
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
