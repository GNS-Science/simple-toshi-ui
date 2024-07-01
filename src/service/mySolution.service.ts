import { GeneralTaskDetails } from '../interfaces/diagnosticReport';
import { UnifiedInversionSolution } from '../interfaces/generaltask';
import { ISFavouritesInstance } from '../interfaces/localStorage';
import { SolutionItem } from '../interfaces/mySolutions';
import { MySolutionsQueryResponse } from '../pages/__generated__/MySolutionsQuery.graphql';

export const getGeneralTaskDetails = (
  listItems: SolutionItem[],
  reportItems: UnifiedInversionSolution[],
  reportItemIndex: number,
): GeneralTaskDetails => {
  const currentTask = listItems.find((item) => item.id === reportItems[reportItemIndex].id);
  const currentTaskParent = currentTask?.parents?.edges[0]?.node?.parent;
  return {
    title: (currentTaskParent?.title as string) ?? '',
    id: (currentTaskParent?.id as string) ?? '',
    created: (currentTaskParent?.created as string) ?? '',
    description: (currentTaskParent?.description as string) ?? '',
    model_type: currentTaskParent?.model_type,
    notes: (currentTaskParent?.notes as string) ?? '',
    swept_arguments: (currentTaskParent?.swept_arguments as string[]) ?? [],
    argument_lists: currentTaskParent?.argument_lists ?? [],
  };
};

export const validateListItems = (data: MySolutionsQueryResponse): SolutionItem[] => {
  const automationTasks = data?.nodes?.result?.edges.map((e) => e?.node) ?? [];
  const listItems: SolutionItem[] = [];
  automationTasks.map((item) => {
    if (item && item.__typename === 'AutomationTask') {
      listItems.push(item);
    }
  });
  return listItems;
};

export const getMySolutionIdsArray = (ISFavourites: ISFavouritesInstance): string[] => {
  const ids: string[] = [];
  for (const inversionSolution in ISFavourites) {
    ids.push(ISFavourites[inversionSolution].producedBy);
  }
  return ids;
};
