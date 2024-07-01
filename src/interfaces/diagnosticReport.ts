import { ModelType, TaskSubType, EventResult } from '../pages/__generated__/GeneralTaskQuery.graphql';

export interface GeneralTaskDetails {
  readonly id?: string | undefined;
  readonly title?: string | null | undefined;
  readonly description?: string | null | undefined;
  readonly notes?: string | null | undefined;
  readonly created?: unknown | null | undefined;
  readonly updated?: unknown | null | undefined;
  readonly agent_name?: string | null | undefined;
  readonly model_type?: ModelType | null | undefined;
  readonly subtask_type?: TaskSubType | null | undefined;
  readonly subtask_count?: number | null | undefined;
  readonly subtask_result?: EventResult | null | undefined;
  readonly argument_lists?:
    | ReadonlyArray<{
        readonly k: string | null;
        readonly v: ReadonlyArray<string | null> | null;
      } | null>
    | null
    | undefined;
  readonly swept_arguments?: ReadonlyArray<string | null> | null | undefined;
  readonly children?:
    | {
        readonly total_count: number | null;
      }
    | null
    | undefined;
}
