import React from 'react';
import { useLazyLoadQuery } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';

import { InversionSolutionDiagnosticContainerQuery } from './__generated__/InversionSolutionDiagnosticContainerQuery.graphql';
import { SweepArguments } from '../../interfaces/generaltask';
import { validateSubtask } from '../../service/generalTask.service';
import DiagnosticReportCard from '../diagnosticReportView/DiagnosticReportCard';

interface InversionSolutionDiagnosticContainerProps {
  readonly sweepArgs?: SweepArguments;
  modelType: string;
  ids?: string[];
  generalViews: string[];
  setGeneralViews: (newViewOptions: string[]) => void;
  namedFaultsView: string;
  setNamedFaultsView: (view: string) => void;
  namedFaultsLocations: string[];
  setNamedFaultsLocations: (locations: string[]) => void;
  regionalViews: string[];
  setRegionalViews: (views: string[]) => void;
  reportTab: number;
  setReportTab: (tab: number) => void;
}

const InversionSolutionDiagnosticContainer: React.FC<InversionSolutionDiagnosticContainerProps> = ({
  sweepArgs,
  modelType,
  ids,
  generalViews,
  setGeneralViews,
  namedFaultsView,
  setNamedFaultsView,
  namedFaultsLocations,
  setNamedFaultsLocations,
  regionalViews,
  setRegionalViews,
  reportTab,
  setReportTab,
}: InversionSolutionDiagnosticContainerProps) => {
  const data = useLazyLoadQuery<InversionSolutionDiagnosticContainerQuery>(inversionSolutionDiagnosticContainerQuery, {
    id: ids,
  });
  const validatedSubtasks = validateSubtask(data, sweepArgs ?? []);

  return (
    <>
      <DiagnosticReportCard
        modelType={modelType}
        generalViews={generalViews}
        setGeneralViews={setGeneralViews}
        namedFaultsView={namedFaultsView}
        setNamedFaultsView={setNamedFaultsView}
        namedFaultsLocations={namedFaultsLocations}
        setNamedFaultsLocations={setNamedFaultsLocations}
        automationTasks={validatedSubtasks}
        regionalViews={regionalViews}
        setRegionalViews={setRegionalViews}
        reportTab={reportTab}
        setReportTab={setReportTab}
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
