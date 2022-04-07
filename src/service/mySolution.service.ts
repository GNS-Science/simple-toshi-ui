import { GeneralTaskDetails } from '../interfaces/diagnosticReport';
import { UnifiedInversionSolution, UnifiedInversionSolutionType } from '../interfaces/generaltask';
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

export const getReportItems = (data: MySolutionsQueryResponse): UnifiedInversionSolution[] => {
  const subtasks = data?.nodes?.result?.edges.map((subtask) => subtask?.node);
  const unifiedInversionSolutions: UnifiedInversionSolution[] = [];

  subtasks?.map((subtask) => {
    if (subtask && subtask.__typename === 'AutomationTask') {
      const scaledFile = subtask.files?.edges.filter((file) => file?.node?.file?.source_solution);
      const scaledIS = scaledFile && scaledFile[0]?.node?.file;

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
          id: subtask.id,
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
      } else if (scaledIS && scaledIS.source_solution) {
        const newUnifiedInversionSolution: UnifiedInversionSolution = {
          type: UnifiedInversionSolutionType.SCALED_INVERSION_SOLUTION,
          id: subtask.id,
          solution: {
            id: scaledIS.id as string,
            meta: [],
            hazardId: null,
            mfdTableId: null,
            source_solution: {
              id: scaledIS.source_solution.id,
              meta: [],
            },
          },
        };
        scaledIS?.meta?.map((kv) => {
          kv !== null && newUnifiedInversionSolution.solution.meta.push(kv);
        });
        scaledIS?.source_solution?.meta?.map((kv) => {
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

export const getMySolutionIdsArray = (ISFavourites: ISFavouritesInstance): string[] => {
  const ids: string[] = [];
  for (const inversionSolution in ISFavourites) {
    ids.push(ISFavourites[inversionSolution].producedBy);
  }
  return ids;
};
