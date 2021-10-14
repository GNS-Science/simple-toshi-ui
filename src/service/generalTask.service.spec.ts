import { isRegExp } from 'util/types';
import { FilteredArgument, FilteredArguments, GeneralTaskKeyValueListPairs } from '../interfaces/generaltask';
import * as generalTaskService from './generalTask.service';

describe('sweepList function', () => {
  it('returns filtered list if argList contain k in sweepList', () => {
    const argLists: GeneralTaskKeyValueListPairs = [
      {
        k: 'mockK',
        v: ['mockV'],
      },
      {
        k: 'mockK1',
        v: ['mockV1'],
      },
    ];
    const sweeps = ['mockK'];
    const expectedResult = [
      {
        k: 'mockK',
        v: ['mockV'],
      },
    ];
    const result = generalTaskService.sweepsList(argLists, sweeps);
    expect(result).toEqual(expectedResult);
  });
  it('returns empty array if argList is emptyr', () => {
    const argList: GeneralTaskKeyValueListPairs = [];
    const sweeps = ['mockK'];
    const result = generalTaskService.sweepsList(argList, sweeps);
    expect(result).toEqual([]);
  });
});

describe('updateFilteredArguments function', () => {
  it('replaces value if key already exists', () => {
    const currentFilteredArguments: FilteredArguments = {
      data: [
        {
          k: 'mockK',
          v: ['mockKV', 'mockKV1'],
        },
        {
          k: 'mockK1',
          v: ['mockK1V', 'mockK1V1', 'mockK1V2'],
        },
      ],
    };
    const newValue: string[] = ['newKV', 'newKV1'];
    const name = 'mockK';
    const expected: FilteredArguments = {
      data: [
        {
          k: 'mockK',
          v: ['newKV', 'newKV1'],
        },
        {
          k: 'mockK1',
          v: ['mockK1V', 'mockK1V1', 'mockK1V2'],
        },
      ],
    };
    const result = generalTaskService.updateFilteredArguments(currentFilteredArguments, newValue, name);
    expect(result).toEqual(expected);
  });
  it('adds new object to the array if key does not exist yet', () => {
    const currentFilteredArguments: FilteredArguments = { data: [] };
    const newValue = ['mockK2V'];
    const name = 'mockK2';
    const expected = {
      data: [
        {
          k: 'mockK2',
          v: ['mockK2V'],
        },
      ],
    };
    const result = generalTaskService.updateFilteredArguments(currentFilteredArguments, newValue, name);
    expect(result).toEqual(expected);
  });
});

describe('For validateSubtask function', () => {
  it.todo('should return validatedSubtasks where none required variables are null');
  it.todo('Should return empty array if there are no valid subtasks');
});

describe('For validateChildTasks function', () => {
  it.todo('Should return all childTasks that are not undefined, and with a valid typename (not %other)');
  it.todo('Should return empty array if there are no valid childTasks');
});

describe('For getChildTaskIdArray function', () => {
  it.todo('Should return an array of childTasks ids');
});
