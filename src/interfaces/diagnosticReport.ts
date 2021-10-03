export type ValidatedSubtask = {
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
