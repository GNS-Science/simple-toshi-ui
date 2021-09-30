import { InversionSolutionDiagnosticContainerQueryResponse } from '../components/generalTask/__generated__/InversionSolutionDiagnosticContainerQuery.graphql';
import { SweepArguments, ValidatedSubtask } from '../interfaces/generaltask';

export const validateSubtask = (
  data: InversionSolutionDiagnosticContainerQueryResponse,
  sweepArgs: SweepArguments,
): ValidatedSubtask[] => {
  const subtasks = data?.nodes?.result?.edges.map((subtask) => subtask?.node);
  const validatedSubtasks: ValidatedSubtask[] = [];

  subtasks?.map((subtask) => {
    if (
      subtask &&
      subtask !== null &&
      subtask.__typename === 'AutomationTask' &&
      subtask.inversion_solution !== null &&
      subtask.inversion_solution.meta !== null
    ) {
      const newSubtask: ValidatedSubtask = {
        __typename: 'AutomationTask',
        id: subtask.id,

        inversion_solution: {
          id: subtask.inversion_solution.id,
          meta: [],
        },
      };
      subtask.inversion_solution.meta.map((kv) => {
        kv !== null &&
          sweepArgs?.some((argument) => argument?.k?.includes(kv.k as string)) &&
          newSubtask.inversion_solution.meta.push(kv);
      });
      validatedSubtasks.push(newSubtask);
    }
  });
  return validatedSubtasks;
};
