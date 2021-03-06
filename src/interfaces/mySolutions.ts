import { TableType } from '../components/generalTask/__generated__/InversionSolutionDiagnosticContainerQuery.graphql';
import { ModelType, TaskSubType } from '../pages/__generated__/MySolutionsQuery.graphql';

export interface SolutionItem {
  readonly __typename: 'AutomationTask';
  readonly id: string;
  readonly task_type: TaskSubType | null;
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
        } | null;
      } | null;
    } | null>;
  } | null;
  readonly files: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly file: {
          readonly id?: string | undefined;
          readonly meta?:
            | ReadonlyArray<{
                readonly k: string | null;
                readonly v: string | null;
              } | null>
            | null
            | undefined;
          readonly source_solution?:
            | {
                readonly id: string;
                readonly meta: ReadonlyArray<{
                  readonly k: string | null;
                  readonly v: string | null;
                } | null> | null;
              }
            | null
            | undefined;
        } | null;
      } | null;
    } | null>;
  } | null;
  readonly inversion_solution: {
    readonly id: string;
    readonly mfd_table_id: string | null;
    readonly meta: ReadonlyArray<{
      readonly k: string | null;
      readonly v: string | null;
    } | null> | null;
    readonly tables: ReadonlyArray<{
      readonly table_id: string | null;
      readonly table_type: TableType | null;
    } | null> | null;
  } | null;
}

export type MetaArguments = Array<{
  readonly k: string | null;
  readonly v: string | null;
}>;
