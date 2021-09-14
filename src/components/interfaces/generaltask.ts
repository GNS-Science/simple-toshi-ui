import { EventResult, EventState } from '../generalTask/__generated__/GeneralTaskChildrenTabQuery.graphql';

export type GeneralTaskKeyValueListPairs = readonly ({
  readonly k: string | null;
  readonly v: readonly (string | null)[] | null;
} | null)[];

export interface FilteredChildren {
  data?:
    | (
        | {
            readonly __typename: 'RuptureGenerationTask';
            readonly id: string;
            readonly created: unknown | null;
            readonly duration: number | null;
            readonly state: EventState | null;
            readonly result: EventResult | null;
            readonly arguments: ReadonlyArray<{
              readonly k: string | null;
              readonly v: string | null;
            } | null> | null;
          }
        | {
            readonly __typename: 'AutomationTask';
            readonly id: string;
            readonly created: unknown | null;
            readonly duration: number | null;
            readonly state: EventState | null;
            readonly result: EventResult | null;
            readonly arguments: ReadonlyArray<{
              readonly k: string | null;
              readonly v: string | null;
            } | null> | null;
          }
        | {
            readonly __typename: '%other';
          }
        | undefined
      )[];
}

export type SweepArgument = {
  readonly k: string | null;
  readonly v: readonly (string | null)[] | null;
} | null;

export type SweepArguments = readonly (SweepArgument | null)[];

export interface FilteredArgument {
  k: string;
  v: string[];
}

export interface FilteredArguments {
  data: {
    k: string;
    v: string[];
  }[];
}
