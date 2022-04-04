import { GeneralTaskChildrenTabQueryResponse } from '../components/generalTask/__generated__/GeneralTaskChildrenTabQuery.graphql';
import { ValidatedChildren, FilteredArguments, GeneralTaskKeyValueListPairs } from '../interfaces/generaltask';
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

// describe('For validateSubtask function', () => {
//   it('should return validatedSubtasks where none required variables are null', () => {
//     const data: InversionSolutionDiagnosticContainerQueryResponse = {
//       nodes: {
//         result: {
//           edges: [
//             {
//               node: {
//                 __typename: 'AutomationTask',
//                 created: 'mockCreated',
//                 task_type: 'HAZARD',
//                 id: '1234',
//                 inversion_solution: {
//                   id: '2345',
//                   file_name: 'mock file name',
//                   meta: [
//                     {
//                       k: 'mockK',
//                       v: 'mockV',
//                     },
//                     {
//                       k: 'mockK1',
//                       v: 'mockV1',
//                     },
//                   ],
//                 },
//               },
//             },
//             {
//               node: {
//                 __typename: 'AutomationTask',
//                 created: 'mockCreated',
//                 task_type: 'HAZARD',
//                 id: '2222',
//                 inversion_solution: {
//                   id: '3333',
//                   file_name: 'mock file name',
//                   meta: [
//                     {
//                       k: 'mockK',
//                       v: 'mockV',
//                     },
//                     {
//                       k: 'mockK1',
//                       v: 'mockV1',
//                     },
//                   ],
//                 },
//               },
//             },
//           ],
//         },
//       },
//     };
//     const sweepArgs: SweepArguments = [
//       {
//         k: 'mockK',
//         v: ['mockV'],
//       },
//       {
//         k: 'mockK1',
//         v: ['mockV1'],
//       },
//     ];
//     const expected: ValidatedSubtask[] = [
//       {
//         __typename: 'AutomationTask',
//         id: '1234',
//         inversion_solution: {
//           id: '2345',
//           meta: [
//             {
//               k: 'mockK',
//               v: 'mockV',
//             },
//             {
//               k: 'mockK1',
//               v: 'mockV1',
//             },
//           ],
//         },
//       },
//       {
//         __typename: 'AutomationTask',
//         id: '2222',
//         inversion_solution: {
//           id: '3333',
//           meta: [
//             {
//               k: 'mockK',
//               v: 'mockV',
//             },
//             {
//               k: 'mockK1',
//               v: 'mockV1',
//             },
//           ],
//         },
//       },
//     ];
//     const result = generalTaskService.validateSubtask(data, sweepArgs);
//     expect(result).toEqual(expected);
//   });
// });

describe('For validateChildTasks function', () => {
  it('Should return all childTasks that are not undefined, and with a valid typename (not %other)', () => {
    const data: GeneralTaskChildrenTabQueryResponse = {
      node: {
        id: '1111',
        children: {
          edges: [
            {
              node: {
                child: {
                  __typename: 'AutomationTask',
                  id: '1234',
                  created: '1234',
                  duration: 1,
                  state: 'DONE',
                  result: 'SUCCESS',
                  arguments: [
                    {
                      k: 'mockK',
                      v: 'mockV',
                    },
                    {
                      k: 'mockK1',
                      v: 'mockV1',
                    },
                  ],
                },
              },
            },
            {
              node: {
                child: {
                  __typename: 'AutomationTask',
                  id: '1111',
                  created: '1234',
                  duration: 2,
                  state: 'DONE',
                  result: 'SUCCESS',
                  arguments: [
                    {
                      k: 'mockK',
                      v: 'mockV',
                    },
                    {
                      k: 'mockK1',
                      v: 'mockV1',
                    },
                  ],
                },
              },
            },
          ],
        },
      },
    };
    const expected: ValidatedChildren = {
      data: [
        {
          __typename: 'AutomationTask',
          id: '1234',
          created: '1234',
          duration: 1,
          state: 'DONE',
          result: 'SUCCESS',
          arguments: [
            {
              k: 'mockK',
              v: 'mockV',
            },
            {
              k: 'mockK1',
              v: 'mockV1',
            },
          ],
        },
        {
          __typename: 'AutomationTask',
          id: '1111',
          created: '1234',
          duration: 2,
          state: 'DONE',
          result: 'SUCCESS',
          arguments: [
            {
              k: 'mockK',
              v: 'mockV',
            },
            {
              k: 'mockK1',
              v: 'mockV1',
            },
          ],
        },
      ],
    };
    const result = generalTaskService.validateChildTasks(data);
    expect(result).toEqual(expected);
  });
});

describe('For getChildTaskIdArray function', () => {
  it('Should return an array of childTasks ids', () => {
    const childTasks: ValidatedChildren = {
      data: [
        {
          __typename: 'AutomationTask',
          id: '1111',
          created: '1234',
          duration: 1234,
          state: 'DONE',
          result: 'SUCCESS',
          arguments: [
            {
              k: 'mockK',
              v: 'mockV',
            },
            {
              k: 'mockK1',
              v: 'mockV',
            },
          ],
        },
      ],
    };
    const result = generalTaskService.getChildTaskIdArray(childTasks);
    expect(result).toEqual(['1111']);
  });
});

test('For applyChildTaskFilterFunction', () => {
  const childTasks: ValidatedChildren = {
    data: [
      {
        __typename: 'AutomationTask',
        id: '1234',
        created: 'mock name',
        duration: 123,
        state: 'DONE',
        result: 'SUCCESS',
        arguments: [
          {
            k: 'mdf_d_value_mock',
            v: 'mockV',
          },
        ],
      },
    ],
  };

  const filteredArguments: FilteredArguments = {
    data: [
      {
        k: 'mdf_d_values_mock',
        v: ['mockV', 'mockV1'],
      },
    ],
  };
  const expected = {
    data: [
      {
        __typename: 'AutomationTask',
        id: '1234',
        created: 'mock name',
        duration: 123,
        state: 'DONE',
        result: 'SUCCESS',
        arguments: [
          {
            k: 'mdf_d_value_mock',
            v: 'mockV',
          },
        ],
      },
    ],
  };
  const result = generalTaskService.applyChildTaskFilter(childTasks, filteredArguments);
  expect(result).toEqual(expected);
});
