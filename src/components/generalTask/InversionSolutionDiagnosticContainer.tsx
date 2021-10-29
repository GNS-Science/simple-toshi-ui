import React, { useEffect, useState } from 'react';
import { useQueryLoader } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';
import { makeStyles } from '@material-ui/styles';

import { InversionSolutionDiagnosticContainerQuery } from './__generated__/InversionSolutionDiagnosticContainerQuery.graphql';
import { SweepArguments } from '../../interfaces/generaltask';
import DiagnosticReportContainer from '../diagnosticReportView/DiagnosticReportContainer';
import DiagnosticReportControls from '../diagnosticReportView/DiagnosticReportControls';
import MultiSelect from '../common/MultiSelect';
import { mfdPlotOptions, NamedFaultsOption, namedFaultsOptions, PlotOption } from '../../constants/nameFaultsMfds';
import SelectControl from '../common/SelectControl';

const useStyles = makeStyles(() => ({
  controlsContainer: {
    display: 'flex',
    alignItems: 'center',
  },
}));

interface InversionSolutionDiagnosticContainerProps {
  readonly sweepArgs?: SweepArguments;
  ids?: string[];
  viewOptions: string[];
  setViewOptions: (newViewOptions: string[]) => void;
}

const InversionSolutionDiagnosticContainer: React.FC<InversionSolutionDiagnosticContainerProps> = ({
  sweepArgs,
  ids,
  viewOptions,
  setViewOptions,
}: InversionSolutionDiagnosticContainerProps) => {
  const classes = useStyles();
  const [queryRef, loadQuery] = useQueryLoader<InversionSolutionDiagnosticContainerQuery>(
    inversionSolutionDiagnosticContainerQuery,
  );
  const [namedFaultsSelection, setNamedFaultsSelection] = useState<NamedFaultsOption[]>([namedFaultsOptions[0]]);
  const [mfdPlotSelection, setMfdPlotSelection] = useState<PlotOption>(mfdPlotOptions[0]);

  useEffect(() => {
    loadQuery({ id: ids });
  }, [ids]);

  const faultOptions: string[] = [];

  namedFaultsOptions.map((option) => {
    faultOptions.push(option.displayName);
  });

  const mfdPlot: string[] = [];

  mfdPlotOptions.map((option) => {
    mfdPlot.push(option.displayName);
  });

  const handleNamedFaultsSelect = (selection: string[]) => {
    const filtered = namedFaultsOptions.filter((option) => {
      const result = selection.includes(option.displayName);
      return result;
    });
    setNamedFaultsSelection(filtered);
  };

  const handleMfdPlotSelect = (select: string) => {
    mfdPlotOptions.map((option) => {
      if (select === option.displayName) {
        setMfdPlotSelection(option);
      }
    });
  };

  return (
    <>
      <div className={classes.controlsContainer}>
        <DiagnosticReportControls viewOptions={viewOptions} setViewOption={setViewOptions} />
        <MultiSelect name="Named Faults" options={faultOptions} setOptions={handleNamedFaultsSelect} />
        <SelectControl name="Mfd Plot Views" options={mfdPlot} setOptions={handleMfdPlotSelect} />
      </div>

      {queryRef && (
        <DiagnosticReportContainer
          namedFaults={namedFaultsSelection}
          plotType={mfdPlotSelection}
          sweepArgs={sweepArgs}
          viewOptions={viewOptions}
          queryRef={queryRef}
        />
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
