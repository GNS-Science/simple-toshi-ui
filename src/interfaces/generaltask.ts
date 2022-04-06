import { EventResult, EventState } from '../components/generalTask/__generated__/GeneralTaskChildrenTabQuery.graphql';
import { TableType } from '../components/generalTask/__generated__/InversionSolutionDiagnosticContainerQuery.graphql';

export interface GeneralTaskParams {
  id: string;
  tabName: string;
  clipBoard: string;
}

export type GeneralTaskKeyValueListPairs = readonly ({
  readonly k: string | null;
  readonly v: readonly (string | null)[] | null;
} | null)[];

export interface ValidatedChildren {
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

export enum ViewTypeEnum {
  Report,
  Image,
}

export interface SolutionDiagnosticsOption {
  viewType: ViewTypeEnum;
  displayName: string;
  finalPath: string; // either a hash location, or a filepath/name# must be unique
  imgWdth: number | undefined;
  imgHght: number | undefined;
}

type Meta = Array<{
  readonly k: string | null;
  readonly v: string | null;
} | null>;

export enum UnifiedInversionSolutionType {
  SCALED_INVERSION_SOLUTION,
  INVERSION_SOLUTION,
}

export type ScaledSourceSolution = {
  id: string;
  meta: Meta;
};

//Common inversion solution for flipchart - accomadates both scaled and normal
export type UnifiedInversionSolution = {
  type: UnifiedInversionSolutionType;
  id: string;
  solution: {
    id: string;
    meta: Meta;
    hazardId: string | null;
    mfdTableId: string | null;
    source_solution: ScaledSourceSolution | null;
  };
};

export type ValidatedInversionSolution = {
  __typename: 'AutomationTask';
  id: string;
  inversion_solution: {
    id: string;
    mfd_table_id: string;
    meta: Meta;
    tables: IStables;
  };
};

export type IStables = ReadonlyArray<{
  readonly table_id: string | null;
  readonly table_type: TableType | null;
} | null> | null;

export interface ClipBoardObject {
  filter: FilteredArguments;
  showList: boolean;
  showFilter: boolean;
  generalViews: string[];
  namedFaultsView: string;
  namedFaultsLocations: string[];
  regionalViews: string[];
  reportTab: number;
  parentFaultViews: string[];
  parentFault: string;
}
