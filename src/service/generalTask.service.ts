import { FilteredArguments, GeneralTaskKeyValueListPairs } from '../interfaces/generaltask';

export const sweepsList = (
  arg_lists: GeneralTaskKeyValueListPairs,
  sweeps: readonly (string | null)[],
): GeneralTaskKeyValueListPairs => {
  if (arg_lists) return arg_lists.filter((el) => sweeps.includes(el ? el.k : ''));
  return [];
};

export const updateFilteredArguments = (
  currentFilteredArguments: FilteredArguments,
  newValue: string[],
  name: string,
): FilteredArguments => {
  const filteredArguments = [...currentFilteredArguments.data];
  const itemIndex = filteredArguments.findIndex((item) => item.k === name);

  if (itemIndex !== -1) {
    filteredArguments[itemIndex].v = newValue;
    filteredArguments[itemIndex].v.length === 0 && filteredArguments.splice(itemIndex, 1);
  } else {
    filteredArguments.push({
      k: name,
      v: newValue,
    });
  }

  return {
    data: filteredArguments,
  };
};
