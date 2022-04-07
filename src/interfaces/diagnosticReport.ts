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
