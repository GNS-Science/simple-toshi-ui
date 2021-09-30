export type ValidatedSubtask = {
  __typename: 'AutomationTask';
  id: string;
  inversion_solution: {
    id: string;
    meta: Array<{
      readonly k: string | null;
      readonly v: string | null;
    } | null>;
  };
};
