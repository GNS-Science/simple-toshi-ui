import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useQueryLoader } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import SweepArgumentFilter from './SweepArgumentFilter';
import DiagnosticReportControls from './DiagnosticReportControls';
import DiagnosticReportsCard from './DiagnosticReportsCard';
import { InversionSolutionDiagnosticContainerQuery } from './__generated__/InversionSolutionDiagnosticContainerQuery.graphql';
import { FilteredChildren, SweepArguments } from '../../interfaces/generaltask';
import { diagnosticReportViewOptions as options } from '../../constants/diagnosticReport';

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
  filteredChildren?: FilteredChildren;
  childrenListLength: number;
}

const InversionSolutionDiagnosticContainer: React.FC<InversionSolutionDiagnosticContainerProps> = ({
  sweepArgs,
  setShowList,
  onChange,
  filteredChildren,
  childrenListLength,
}: InversionSolutionDiagnosticContainerProps) => {
  const classes = useStyles();
  const [queryRef, loadQuery] = useQueryLoader<InversionSolutionDiagnosticContainerQuery>(
    inversionSolutionDiagnosticContainerQuery,
  );
  const [showFilters, setShowFilters] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [finalPath, setFinalPath] = useState<string[]>([options[0].finalPath]);

  const maxLength = process.env.REACT_APP_REPORTS_LIMIT ?? 24;

  useEffect(() => {
    const filteredChildrenData = filteredChildren?.data ?? [];
    if (filteredChildrenData.length <= maxLength) {
      const filteredChildrenIds: string[] = [];
      filteredChildrenData.map((child) => {
        (child?.__typename === 'AutomationTask' || child?.__typename === 'RuptureGenerationTask') &&
          child.id !== undefined &&
          filteredChildrenIds.push(child?.id);
      });
      loadQuery({ id: filteredChildrenIds });
    }
  }, [filteredChildren]);

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
            Filter&nbsp;({filteredChildren?.data?.length}/{childrenListLength})
          </span>
        </Button>
        <DiagnosticReportControls isOpen={showReport} setViewOption={setFinalPath} setOpen={handleViewChange} />
      </div>
      <div className={showFilters ? classes.filterContainer : classes.hidden}>
        {sweepArgs?.map((argument) => (
          <SweepArgumentFilter key={`${argument?.k}-filter`} argument={argument} onChange={onChange} />
        ))}
      </div>
      {showReport && queryRef && (
        <DiagnosticReportsCard sweepArgs={sweepArgs} queryRef={queryRef} finalPath={finalPath} />
      )}
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
