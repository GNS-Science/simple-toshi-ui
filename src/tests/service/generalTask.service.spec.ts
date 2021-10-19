import * as generalTaskService from '../../service/generalTask.service';
import { ValidatedChildren, FilteredArguments } from '../../interfaces/generaltask';

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
