import React, { useEffect, useState } from 'react';
import { useQueryLoader } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';
import { Button } from '@material-ui/core';
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
  onChange: (event: React.ChangeEvent<{ value: unknown; name?: string | undefined }>) => void;
  ids?: string[];
  childrenListLength: number;
  applyFilter: () => void;
  data: GeneralTaskQueryResponse;
  handleViewChange: () => void;
}

const InversionSolutionDiagnosticContainer: React.FC<InversionSolutionDiagnosticContainerProps> = ({
  sweepArgs,
  showList,
  onChange,
  ids,
  childrenListLength,
  applyFilter,
  data,
  handleViewChange,
}: InversionSolutionDiagnosticContainerProps) => {
  const classes = useStyles();
  const [showFilters, setShowFilters] = useState(false);
  const [viewOptions, setViewOptions] = useState<string[]>([options[0].finalPath]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [queryRef, loadQuery] = useQueryLoader<InversionSolutionDiagnosticContainerQuery>(
    inversionSolutionDiagnosticContainerQuery,
  );

  useEffect(() => {
    loadQuery({ id: ids });
  }, [ids]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown; name?: string | undefined }>) => {
    const newValue = (event.target.value as string[]) || [];
    setViewOptions(newValue);
  };

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

  return (
    <>
      <ControlsBar>
        <Button variant="contained" color="default" onClick={() => setShowFilters((v) => !v)}>
          <span>
            Filter&nbsp;({ids?.length}/{childrenListLength})
          </span>
        </Button>
        <Button color="default" variant="contained" onClick={handleViewChange}>
          {showList ? 'Show Report' : 'Show List'}
        </Button>
        <Button color="default" variant="contained" onClick={() => setOpenDrawer((v) => !v)}>
          Details
        </Button>
        <DiagnosticReportControls setViewOption={handleChange} />
      </ControlsBar>
      <div className={showFilters ? classes.filterContainer : classes.hidden}>
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
