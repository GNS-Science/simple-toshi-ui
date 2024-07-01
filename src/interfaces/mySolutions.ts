import { TableType } from '../components/generalTask/__generated__/InversionSolutionDiagnosticContainerQuery.graphql';
import { ModelType, TaskSubType } from '../pages/__generated__/MySolutionsQuery.graphql';

export interface SolutionItem {
  readonly __typename: string;
  readonly __isNode?: string | undefined;
  readonly id?: string | undefined;
  readonly task_type?: TaskSubType | null | undefined;
  readonly parents?:
    | {
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
      }
    | null
    | undefined;
  readonly files?:
    | {
        readonly edges: ReadonlyArray<{
          readonly node: {
            readonly file: {
              readonly __typename: string;
              readonly __isNode?: string | undefined;
              readonly node_id?: string | undefined;
              readonly id?: string | undefined;
              readonly meta?:
                | ReadonlyArray<{
                    readonly k: string | null;
                    readonly v: string | null;
                  } | null>
                | null
                | undefined;
              readonly predecessors?:
                | ReadonlyArray<{
                    readonly __typename: string;
                    readonly pre_id: string | null;
                    readonly relationship: string | null;
                    readonly depth: number | null;
                    readonly node: {
                      readonly file_meta?:
                        | ReadonlyArray<{
                            readonly k: string | null;
                            readonly v: string | null;
                          } | null>
                        | null
                        | undefined;
                      readonly is_meta?:
                        | ReadonlyArray<{
                            readonly k: string | null;
                            readonly v: string | null;
                          } | null>
                        | null
                        | undefined;
                      readonly td_meta?:
                        | ReadonlyArray<{
                            readonly k: string | null;
                            readonly v: string | null;
                          } | null>
                        | null
                        | undefined;
                    } | null;
                  } | null>
                | null
                | undefined;
            } | null;
          } | null;
        } | null>;
      }
    | null
    | undefined;
  readonly inversion_solution?:
    | {
        readonly id?: string | undefined;
        readonly file_name?: string | null | undefined;
        readonly meta?:
          | ReadonlyArray<{
              readonly k: string | null;
              readonly v: string | null;
            } | null>
          | null
          | undefined;
        readonly mfd_table_id?: string | null | undefined;
        readonly tables?:
          | ReadonlyArray<{
              readonly table_id: string | null;
              readonly table_type: TableType | null;
            } | null>
          | null
          | undefined;
      }
    | null
    | undefined;
}

export type MetaArguments = Array<{
  readonly k: string | null | undefined;
  readonly v: string | null | undefined;
}>;
