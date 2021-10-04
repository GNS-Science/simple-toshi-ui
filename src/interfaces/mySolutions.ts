import { ModelType } from '../pages/__generated__/MySolutionsQuery.graphql';

export interface SolutionItem {
  readonly __typename: 'AutomationTask';
  readonly id: string;
  readonly parents: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly parent: {
          readonly id: string;
          readonly created: unknown | null;
          readonly title: string | null;
          readonly description: string | null;
          readonly model_type: ModelType | null;
          readonly swept_arguments: ReadonlyArray<string | null> | null;
          readonly notes: string | null;
          readonly argument_lists: ReadonlyArray<{
            readonly k: string | null;
            readonly v: ReadonlyArray<string | null> | null;
          } | null> | null;
        };
      } | null;
    } | null>;
  } | null;
  readonly inversion_solution: {
    readonly id: string;
    readonly meta: ReadonlyArray<{
      readonly k: string | null;
      readonly v: string | null;
    } | null> | null;
  } | null;
}
