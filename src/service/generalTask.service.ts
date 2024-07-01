import { GeneralTaskChildrenTabQueryResponse } from '../components/generalTask/__generated__/GeneralTaskChildrenTabQuery.graphql';
import { InversionSolutionDiagnosticContainerQueryResponse } from '../components/generalTask/__generated__/InversionSolutionDiagnosticContainerQuery.graphql';
import { GeneralTaskDetails } from '../interfaces/diagnosticReport';
import {
  ValidatedChildren,
  ClipBoardObject,
  UnifiedInversionSolution,
  UnifiedInversionSolutionType,
} from '../interfaces/generaltask';
import { FilteredArguments, GeneralTaskKeyValueListPairs } from '../interfaces/generaltask';
import { GeneralTaskQueryResponse } from '../pages/__generated__/GeneralTaskQuery.graphql';
import { MySolutionsQueryResponse } from '../pages/__generated__/MySolutionsQuery.graphql';

export const maxLength = parseInt(process.env.REACT_APP_REPORTS_LIMIT ?? '24');
export const sweepsList = (
  arg_lists: GeneralTaskKeyValueListPairs,
  sweeps: readonly (string | null)[] | null | undefined,
): GeneralTaskKeyValueListPairs => {
  if (sweeps && arg_lists) return arg_lists.filter((el) => sweeps.includes(el ? el.k : ''));
  return [];
};

export const updateFilteredArguments = (
  currentFilteredArguments: FilteredArguments,
  newValue: string[],
  name: string,
): FilteredArguments => {
  const filteredArguments = [...currentFilteredArguments.data];
  const itemIndex = filteredArguments.findIndex((item) => item.k === name);

  if (itemIndex !== -1) {
    filteredArguments[itemIndex].v = newValue;
    filteredArguments[itemIndex].v.length === 0 && filteredArguments.splice(itemIndex, 1);
  } else {
    filteredArguments.push({
      k: name,
      v: newValue,
    });
  }

  return {
    data: filteredArguments,
  };
};

export const validateUnifiedInversionSolutions = (
  data: InversionSolutionDiagnosticContainerQueryResponse | MySolutionsQueryResponse,
): UnifiedInversionSolution[] => {
  const subtasks = data?.nodes?.result?.edges.map((subtask) => subtask?.node);
  const unifiedInversionSolutions: UnifiedInversionSolution[] = [];
  subtasks?.map((subtask) => {
    if (subtask && subtask.__typename === 'AutomationTask') {
      if (subtask.inversion_solution) {
        const hazardTable = subtask.inversion_solution.tables?.find((table) => table?.table_type === 'HAZARD_SITES');
        const hazardId = hazardTable ? hazardTable?.table_id : '';

        const mfdTableId = (): string => {
          if (subtask.inversion_solution?.mfd_table_id) return subtask.inversion_solution?.mfd_table_id;
          const new_mfd_table = subtask.inversion_solution?.tables?.filter((ltr) => ltr?.table_type == 'MFD_CURVES')[0];
          if (new_mfd_table) return new_mfd_table.table_id || '';
          return '';
        };

        const newUnifiedInversionSolution: UnifiedInversionSolution = {
          type: UnifiedInversionSolutionType.INVERSION_SOLUTION,
          id: subtask.id || '',
          solution: {
            id: subtask.inversion_solution.id,
            meta: [],
            hazardId,
            mfdTableId: mfdTableId(),
            source_solution: null,
          },
        };
        subtask.inversion_solution.meta &&
          subtask.inversion_solution.meta.map((kv) => {
            kv !== null && newUnifiedInversionSolution.solution.meta.push(kv);
          });
        unifiedInversionSolutions.push(newUnifiedInversionSolution);
      } else if (
        (subtask && subtask.task_type === 'SCALE_SOLUTION') ||
        (subtask && subtask.task_type === 'TIME_DEPENDENT_SOLUTION')
      ) {
        const predecessorsFile = subtask.files?.edges.filter((file) => file?.node?.file?.predecessors);

        const sourceSolution =
          predecessorsFile &&
          predecessorsFile[0]?.node?.file?.predecessors?.filter(
            (predecessor) => predecessor && predecessor.__typename === 'InversionSolution',
          )[0];

        const scaledOrTimeDependentSolution = subtask?.files?.edges?.filter(
          (file) =>
            file?.node?.file?.__typename &&
            ['ScaledInversionSolution', 'TimeDependentInversionSolution'].includes(file?.node?.file?.__typename),
        )[0]?.node?.file;

        const newUnifiedInversionSolution: UnifiedInversionSolution = {
          type:
            subtask.task_type === 'TIME_DEPENDENT_SOLUTION'
              ? UnifiedInversionSolutionType.TIME_DEPENDENT_SOLUTION
              : UnifiedInversionSolutionType.SCALED_INVERSION_SOLUTION,
          id: subtask.id || '',
          solution: {
            id: scaledOrTimeDependentSolution?.id || '',
            meta: [],
            hazardId: null,
            mfdTableId: null,
            source_solution: {
              id: (sourceSolution && sourceSolution.pre_id) || '',
              meta: [],
            },
          },
        };
        scaledOrTimeDependentSolution?.meta?.map((kv) => {
          kv !== null && newUnifiedInversionSolution.solution.meta.push(kv);
        });
        sourceSolution?.node?.is_meta?.map((kv) => {
          kv !== null &&
            newUnifiedInversionSolution.solution.source_solution &&
            newUnifiedInversionSolution.solution.source_solution.meta.push(kv);
        });
        unifiedInversionSolutions.push(newUnifiedInversionSolution);
      }
    }
  });
  return unifiedInversionSolutions;
};

export const validateChildTasks = (data: GeneralTaskChildrenTabQueryResponse): ValidatedChildren => {
  const childTasks = data?.node?.children?.edges?.map((e) => e?.node?.child);
  const validatedChildTasks: ValidatedChildren = { data: [] };
  childTasks?.map((task) => {
    if (
      task &&
      task.__typename !== '%other' &&
      task.id &&
      task.duration &&
      task.state &&
      task.result &&
      task.arguments
    ) {
      validatedChildTasks.data?.push({
        __typename: task.__typename,
        id: task.id,
        created: task.created,
        duration: task.duration,
        state: task.state,
        result: task.result,
        arguments: task.arguments,
      });
    }
  });

  return validatedChildTasks;
};

export const getChildTaskIdArray = (filteredChildren: ValidatedChildren): string[] => {
  const idArray: string[] = [];
  if (filteredChildren.data && filteredChildren.data.length <= maxLength) {
    filteredChildren.data?.map((task) => {
      idArray.push(task.id);
    });
    return idArray;
  } else {
    return [];
  }
};

export const applyChildTaskFilter = (
  childTasks: ValidatedChildren,
  filteredArguments: FilteredArguments,
): ValidatedChildren => {
  const filtered = childTasks.data?.filter((child) => {
    return filteredArguments.data?.every((sweepArgument) => {
      return child?.arguments?.some((argument) => {
        return (
          (sweepArgument.k.includes(argument?.k as string) || pluralCompare(sweepArgument.k, argument?.k as string)) &&
          sweepArgument.v.includes(argument?.v as string)
        );
      });
    });
  });
  return { data: filtered };
};

export const getGeneralTaskDetailsFromQueryResponse = (data: GeneralTaskQueryResponse): GeneralTaskDetails => {
  return {
    title: data?.node?.title ?? '',
    id: data?.node?.id ?? '',
    created: (data?.node?.created as string) ?? '',
    model_type: data?.node?.model_type,
    description: data?.node?.description ?? '',
    notes: data?.node?.notes ?? '',
    swept_arguments: (data?.node?.swept_arguments as string[]) ?? [],
    argument_lists: data?.node?.argument_lists ?? [],
  };
};

export const getClipBoardObject = async (search: string): Promise<ClipBoardObject> => {
  const clipBoard = new URLSearchParams(search).get('clipBoard') ?? '';
  const clipBoardDecoded = atob(clipBoard);
  const clipBoardObject = JSON.parse(clipBoardDecoded);
  return clipBoardObject;
};

export const pluralCompare = (sweep: string, argName: string): boolean => {
  const pluralArgName = argName.replace('value', 'values');
  return pluralArgName === sweep;
};

export const determineClipBoard = (search: string): boolean => {
  const clipBoardString = new URLSearchParams(search).get('clipBoard') ?? '';
  return clipBoardString.length > 0;
};
