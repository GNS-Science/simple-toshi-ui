import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { useLazyLoadQuery } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';

import { InversionSolutionDiagnosticContainerQuery } from './__generated__/InversionSolutionDiagnosticContainerQuery.graphql';
import { SweepArguments, ValidatedSubtask } from '../../interfaces/generaltask';
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
  parentFaultViews: string[];
  setParentFaultViews: (views: string[]) => void;
  parentFault: string;
  setParentFault: (fault: string) => void;
  disableHotkey: boolean;
  setDisableHotkey: Dispatch<SetStateAction<boolean>>;
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
  parentFaultViews,
  setParentFaultViews,
  parentFault,
  setParentFault,
  disableHotkey,
  setDisableHotkey,
}: InversionSolutionDiagnosticContainerProps) => {
  const [automationTasks, setAutomationTasks] = useState<ValidatedSubtask[]>([]);
  const data = useLazyLoadQuery<InversionSolutionDiagnosticContainerQuery>(inversionSolutionDiagnosticContainerQuery, {
    id: ids,
  });

  useEffect(() => {
    const validatedSubtasks = validateSubtask(data);
    setAutomationTasks(validatedSubtasks);
  }, [data]);

  return (
    <>
      <DiagnosticReportCard
        sweepArgs={sweepArgs}
        modelType={modelType}
        generalViews={generalViews}
        setGeneralViews={setGeneralViews}
        namedFaultsView={namedFaultsView}
        setNamedFaultsView={setNamedFaultsView}
        namedFaultsLocations={namedFaultsLocations}
        setNamedFaultsLocations={setNamedFaultsLocations}
        automationTasks={automationTasks}
        regionalViews={regionalViews}
        setRegionalViews={setRegionalViews}
        reportTab={reportTab}
        setReportTab={setReportTab}
        parentFaultViews={parentFaultViews}
        setParentFaultViews={setParentFaultViews}
        parentFault={parentFault}
        setParentFault={setParentFault}
        disableHotkey={disableHotkey}
        setDisableHotkey={setDisableHotkey}
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
                mfd_table_id
                meta {
                  k
                  v
                }
                tables {
                  table_id
                  table_type
                }
              }
            }
          }
        }
      }
    }
  }
`;
