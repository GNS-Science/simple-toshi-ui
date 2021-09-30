import React, { Dispatch, SetStateAction, useState } from 'react';
import { useLazyLoadQuery } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import SweepArgumentFilter from './SweepArgumentFilter';
import { InversionSolutionDiagnosticContainerQuery } from './__generated__/InversionSolutionDiagnosticContainerQuery.graphql';
import { SweepArguments } from '../../interfaces/generaltask';
import DiagnosticReportContainer from '../diagnosticReportView/DiagnosticReportContainer';
import { ValidatedSubtask } from '../../interfaces/diagnosticReport';
import { validateSubtask } from '../../service/generalTask.service';

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
}

const InversionSolutionDiagnosticContainer: React.FC<InversionSolutionDiagnosticContainerProps> = ({
  sweepArgs,
  setShowList,
  onChange,
  ids,
  childrenListLength,
}: InversionSolutionDiagnosticContainerProps) => {
  const classes = useStyles();
  const [showFilters, setShowFilters] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const data = useLazyLoadQuery<InversionSolutionDiagnosticContainerQuery>(inversionSolutionDiagnosticContainerQuery, {
    id: ids,
  });

  const validatedSubtasks: ValidatedSubtask[] = validateSubtask(data, sweepArgs ?? []);

  const handleViewChange = () => {
    setShowList((v) => !v);
    setShowReport((v) => !v);
  };

  return (
    <>
      <div className={classes.controlsContainer}>
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
      </div>
      <div className={showFilters ? classes.filterContainer : classes.hidden}>
        {sweepArgs?.map((argument) => (
          <SweepArgumentFilter key={`${argument?.k}-filter`} argument={argument} onChange={onChange} />
        ))}
      </div>
      {showReport && <DiagnosticReportContainer automationTasks={validatedSubtasks} />}
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
