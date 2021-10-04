import { GeneralTaskDetails, ReportItems } from '../interfaces/diagnosticReport';
import { SolutionItem } from '../interfaces/mySolutions';

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
