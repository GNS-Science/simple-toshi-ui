import { GeneralTaskChildrenTabQueryResponse } from '../components/generalTask/__generated__/GeneralTaskChildrenTabQuery.graphql';
import { InversionSolutionDiagnosticContainerQueryResponse } from '../components/generalTask/__generated__/InversionSolutionDiagnosticContainerQuery.graphql';
import { GeneralTaskDetails } from '../interfaces/diagnosticReport';
import { ValidatedChildren, SweepArguments, ValidatedSubtask, ClipBoardObject } from '../interfaces/generaltask';
import { FilteredArguments, GeneralTaskKeyValueListPairs } from '../interfaces/generaltask';
import { GeneralTaskQueryResponse } from '../pages/__generated__/GeneralTaskQuery.graphql';

export const maxLength = parseInt(process.env.REACT_APP_REPORTS_LIMIT ?? '24');
export const sweepsList = (
  arg_lists: GeneralTaskKeyValueListPairs,
  sweeps: readonly (string | null)[],
): GeneralTaskKeyValueListPairs => {
  if (arg_lists) return arg_lists.filter((el) => sweeps.includes(el ? el.k : ''));
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

export const validateChildTasks = (data: GeneralTaskChildrenTabQueryResponse): ValidatedChildren => {
  const childTasks = data?.node?.children?.edges?.map((e) => e?.node?.child);
  const validatedChildTasks: ValidatedChildren = { data: [] };

  childTasks?.map((task) => {
    if (task && task.__typename !== '%other') {
      validatedChildTasks.data?.push(task);
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
    model_type: data?.node?.model_type ?? '',
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
