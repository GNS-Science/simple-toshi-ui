import { GeneralTaskDetails, ReportItems } from '../interfaces/diagnosticReport';
import { LocalStorageInstance } from '../interfaces/localStorage';
import { SolutionItem } from '../interfaces/mySolutions';
import { MySolutionsQueryResponse } from '../pages/__generated__/MySolutionsQuery.graphql';

export const getGeneralTaskDetails = (
  listItems: SolutionItem[],
  reportItems: ReportItems[],
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

export const getReportItems = (listItems: SolutionItem[]): ReportItems[] => {
  const reportItems: ReportItems[] = [];
  listItems.map((task) => {
    const newMeta = task.inversion_solution?.meta ?? [];
    const validatedTask: ReportItems = {
      __typename: 'AutomationTask',
      id: task.id,
      inversion_solution: {
        id: task.inversion_solution?.id as string,
        meta: [...newMeta],
      },
    };
    reportItems.push(validatedTask);
  });
  return reportItems;
};

export const getMySolutionIdsArray = (ISFavourites: LocalStorageInstance): string[] => {
  const ids: string[] = [];
  for (const inversionSolution in ISFavourites) {
    ids.push(ISFavourites[inversionSolution].producedBy);
  }
  return ids;
};
