import { GeneralTaskChildrenTabQueryResponse } from '../components/generalTask/__generated__/GeneralTaskChildrenTabQuery.graphql';
import { InversionSolutionDiagnosticContainerQueryResponse } from '../components/generalTask/__generated__/InversionSolutionDiagnosticContainerQuery.graphql';
import { GeneralTaskDetails } from '../interfaces/diagnosticReport';
import { ValidatedChildren, ValidatedSubtask, ClipBoardObject } from '../interfaces/generaltask';
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

export const validateSubtask = (data: InversionSolutionDiagnosticContainerQueryResponse): ValidatedSubtask[] => {
  const subtasks = data?.nodes?.result?.edges.map((subtask) => subtask?.node);
  const validatedSubtasks: ValidatedSubtask[] = [];

  subtasks?.map((subtask) => {
    if (
      subtask &&
      subtask.__typename === 'AutomationTask' &&
      subtask.inversion_solution &&
      subtask.inversion_solution.meta
    ) {
      const mfdTableId = (): string => {
        if (subtask.inversion_solution?.mfd_table_id) return subtask.inversion_solution?.mfd_table_id;
        const new_mfd_table = subtask.inversion_solution?.tables?.filter((ltr) => ltr?.table_type == 'MFD_CURVES')[0];
        if (new_mfd_table) return new_mfd_table.table_id || '';
        return '';
      };
      const newSubtask: ValidatedSubtask = {
        __typename: 'AutomationTask',
        id: subtask.id,

        inversion_solution: {
          id: subtask.inversion_solution.id,
          meta: [],
          tables: subtask.inversion_solution.tables,
          mfd_table_id: mfdTableId(),
        },
      };
      subtask.inversion_solution.meta.map((kv) => {
        kv !== null &&
          // sweepArgs?.some((argument) => {
          //   return argument?.k?.includes(kv.k as string) || pluralCompare(argument?.k as string, kv.k as string);
          // }) &&
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

export const determineClipBoard = (search: string): boolean => {
  const clipBoardString = new URLSearchParams(search).get('clipBoard') ?? '';
  return clipBoardString.length > 0;
};
