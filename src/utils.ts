import { format } from 'date-fns';

export const formatDate = (date: string): string => {
  return date ? format(new Date(date), 'PPPppp') : '';
};

export const renderArrayAsString = (vals: readonly (string | null)[] | null | undefined): string | null => {
  if (vals === null || vals === undefined) return '';
  if (vals.length === 1) {
    return vals[0];
  } else {
    const val_list = vals.reduce((x, accum) => accum + ', ' + x, '');
    return val_list ? val_list.slice(0, -2) : '';
  }
};

export const toProperCase = (str: string): string => {
  const lowerCase = str.toLowerCase();
  const properCase = lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1);
  return properCase;
};
