import { IStables } from './generaltask';

export type ReportItem = {
  __typename: 'AutomationTask';
  id: string;
  inversion_solution: {
    id: string;
    mfd_table_id: string;
    meta: ValidatedSubtaskMeta;
    tables?: IStables;
  };
};

export type ValidatedSubtaskMeta = Array<{
  readonly k: string | null;
  readonly v: string | null;
} | null>;

export interface GeneralTaskDetails {
  title: string;
  id: string;
  created: string;
  description: string;
  model_type: string;
  swept_arguments: string[];
  notes: string;
  argument_lists: ReadonlyArray<{
    readonly k: string | null;
    readonly v: ReadonlyArray<string | null> | null;
  } | null> | null;
}
