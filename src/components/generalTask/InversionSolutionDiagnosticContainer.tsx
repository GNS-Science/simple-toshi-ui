import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useQueryLoader } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';
import { Button, Drawer, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import SweepArgumentFilter from './SweepArgumentFilter';
import { InversionSolutionDiagnosticContainerQuery } from './__generated__/InversionSolutionDiagnosticContainerQuery.graphql';
import { SweepArguments } from '../../interfaces/generaltask';
import DiagnosticReportContainer from '../diagnosticReportView/DiagnosticReportContainer';
import DiagnosticReportControls from '../diagnosticReportView/DiagnosticReportControls';
import { diagnosticReportViewOptions as options } from '../../constants/diagnosticReport';
import GeneralTaskDetailDrawer from '../diagnosticReportView/GeneralTaskDetailDrawer';

const useStyles = makeStyles(() => ({
  filterContainer: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    paddingLeft: 10,
  },
  controlsContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  hidden: {
    display: 'none',
  },
  button: {
    margin: 10,
  },
}));

interface InversionSolutionDiagnosticContainerProps {
  readonly sweepArgs?: SweepArguments;
  setShowList: Dispatch<SetStateAction<boolean>>;
  onChange: (event: React.ChangeEvent<{ value: unknown; name?: string | undefined }>) => void;
  ids?: string[];
  childrenListLength: number;
  applyFilter: () => void;
}

const InversionSolutionDiagnosticContainer: React.FC<InversionSolutionDiagnosticContainerProps> = ({
  sweepArgs,
  setShowList,
  onChange,
  ids,
  childrenListLength,
  applyFilter,
}: InversionSolutionDiagnosticContainerProps) => {
  const classes = useStyles();
  const [showFilters, setShowFilters] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [viewOptions, setViewOptions] = useState<string[]>([options[0].finalPath]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [queryRef, loadQuery] = useQueryLoader<InversionSolutionDiagnosticContainerQuery>(
    inversionSolutionDiagnosticContainerQuery,
  );

  useEffect(() => {
    loadQuery({ id: ids });
  }, [ids]);

  const handleViewChange = () => {
    setShowList((v) => !v);
    setShowReport((v) => !v);
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown; name?: string | undefined }>) => {
    const newValue = (event.target.value as string[]) || [];
    setViewOptions(newValue);
  };

  const handleDrawerOpen = () => {
    setOpenDrawer((v) => !v);
  };
  return (
    <>
      <div className={classes.controlsContainer}>
        {' '}
        <Button
          className={classes.button}
          variant="contained"
          color="default"
          onClick={() => setShowFilters((v) => !v)}
        >
          <span>
            Filter&nbsp;({ids?.length}/{childrenListLength})
          </span>
        </Button>
        <Button color="default" variant="contained" onClick={handleViewChange}>
          {showReport ? 'Show List' : 'Show Report'}
        </Button>
        <DiagnosticReportControls setViewOption={handleChange} />
        <Button color="default" variant="contained" onClick={handleDrawerOpen}>
          Details
        </Button>
      </div>
      <div className={showFilters ? classes.filterContainer : classes.hidden}>
        {sweepArgs?.map((argument) => (
          <SweepArgumentFilter key={`${argument?.k}-filter`} argument={argument} onChange={onChange} />
        ))}
        <Button color="primary" variant="contained" onClick={applyFilter}>
          Apply
        </Button>
      </div>
      {queryRef && showReport && (
        <DiagnosticReportContainer sweepArgs={sweepArgs} viewOptions={viewOptions} queryRef={queryRef} />
      )}
      <GeneralTaskDetailDrawer openDrawer={openDrawer} />
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
