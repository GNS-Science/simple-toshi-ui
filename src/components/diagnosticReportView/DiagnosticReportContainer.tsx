import React from 'react';

import DiagnosticReportCard from './DiagnosticReportCard';
import { SweepArguments } from '../../interfaces/generaltask';
import { PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { InversionSolutionDiagnosticContainerQuery } from '../generalTask/__generated__/InversionSolutionDiagnosticContainerQuery.graphql';
import { validateSubtask } from '../../service/generalTask.service';
import { inversionSolutionDiagnosticContainerQuery } from '../generalTask/InversionSolutionDiagnosticContainer';

interface DiagnosticReportViewProps {
  sweepArgs?: SweepArguments;
  viewOptions: string[];
  queryRef: PreloadedQuery<InversionSolutionDiagnosticContainerQuery, Record<string, unknown>>;
}

const DiagnosticReportView: React.FC<DiagnosticReportViewProps> = ({
  sweepArgs,
  viewOptions,
  queryRef,
}: DiagnosticReportViewProps) => {
  const data = usePreloadedQuery<InversionSolutionDiagnosticContainerQuery>(
    inversionSolutionDiagnosticContainerQuery,
    queryRef,
  );
  const validatedSubtasks = validateSubtask(data, sweepArgs ?? []);
  return <DiagnosticReportCard viewOptions={viewOptions} automationTasks={validatedSubtasks} />;
};

export default DiagnosticReportView;
