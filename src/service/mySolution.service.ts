import { GeneralTaskDetails, ReportItem } from '../interfaces/diagnosticReport';
import { IStables, ValidatedSubtask } from '../interfaces/generaltask';
import { ISFavouritesInstance } from '../interfaces/localStorage';
import { MetaArguments, SolutionItem } from '../interfaces/mySolutions';
import { MySolutionsQueryResponse } from '../pages/__generated__/MySolutionsQuery.graphql';
import { pluralCompare } from './generalTask.service';

export const getGeneralTaskDetails = (
  listItems: SolutionItem[],
  reportItems: ReportItem[],
  reportItemIndex: number,
): GeneralTaskDetails => {
  const currentTask = listItems.find((item) => item.id === reportItems[reportItemIndex].id);
  const currentTaskParent = currentTask?.parents?.edges[0]?.node?.parent;
  return {
    title: (currentTaskParent?.title as string) ?? '',
    id: (currentTaskParent?.id as string) ?? '',
    created: (currentTaskParent?.created as string) ?? '',
    description: (currentTaskParent?.description as string) ?? '',
    model_type: (currentTaskParent?.model_type as string) ?? '',
    notes: (currentTaskParent?.notes as string) ?? '',
    swept_arguments: (currentTaskParent?.swept_arguments as string[]) ?? [],
    argument_lists: currentTaskParent?.argument_lists ?? [],
  };
};

export const validateListItems = (data: MySolutionsQueryResponse): SolutionItem[] => {
  const automationTasks = data?.nodes?.result?.edges.map((e) => e?.node) ?? [];
  const listItems: SolutionItem[] = [];
  automationTasks.map((item) => {
    if (item && item !== null && item.__typename === 'AutomationTask' && item.inversion_solution !== null) {
      listItems.push(item);
    }
  });
  return listItems;
};

export const getReportItems = (listItems: SolutionItem[]): ValidatedSubtask[] => {
  const reportItems: ValidatedSubtask[] = [];
  listItems.map((task) => {
    const taskMeta = task.inversion_solution?.meta ?? [];
    const sweepArguments = (task?.parents?.edges[0]?.node?.parent?.swept_arguments as string[]) ?? [];
    const metaFiltered = filterMetaArguments(taskMeta, sweepArguments);
    const mfdTableId = (): string => {
      if (task.inversion_solution?.mfd_table_id) return task.inversion_solution?.mfd_table_id;
      const new_mfd_table = task.inversion_solution?.tables?.filter((ltr) => ltr?.table_type == 'MFD_CURVES')[0];
      if (new_mfd_table) return new_mfd_table.table_id || '';
      return '';
    };
    const validatedTask: ValidatedSubtask = {
      __typename: 'AutomationTask',
      id: task.id,
      inversion_solution: {
        id: task.inversion_solution?.id as string,
        mfd_table_id: mfdTableId(),
        meta: [...metaFiltered],
        tables: task.inversion_solution?.tables as IStables,
      },
    };
    reportItems.push(validatedTask);
  });
  return reportItems;
};

export const getMySolutionIdsArray = (ISFavourites: ISFavouritesInstance): string[] => {
  const ids: string[] = [];
  for (const inversionSolution in ISFavourites) {
    ids.push(ISFavourites[inversionSolution].producedBy);
  }
  return ids;
};

export const filterMetaArguments = (metaArguments: MetaArguments, sweepArguments: string[]): MetaArguments => {
  const filteredMetaArguments = metaArguments.filter((kv) => {
    return (
      kv !== null &&
      sweepArguments.some((argument) => argument.includes(kv.k as string) || pluralCompare(argument, kv.k as string))
    );
  });
  return filteredMetaArguments;
};
