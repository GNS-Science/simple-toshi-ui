export type ReportItems = {
  __typename: 'AutomationTask';
  id: string;
  inversion_solution: {
    id: string;
    meta: ValidatedSubtaskMeta;
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
}
