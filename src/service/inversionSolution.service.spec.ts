import { InversionSolutionHazardTabQueryResponse } from '../components/inversionSolution/__generated__/InversionSolutionHazardTabQuery.graphql';
import { XY } from '../interfaces/common';
import * as inversionSolutionsService from './inversionSolution.service';

describe('filterData Function', () => {
  const data: InversionSolutionHazardTabQueryResponse = {
    node: {
      rows: [
        [
          '50',
          'INCLUDE',
          '0.0',
          'ASK_2014',
          'Wellington',
          '-43.52565',
          '172.639847',
          '0.019949999999999996',
          '0.030350533448971206',
        ],
        [
          '50',
          'EXCLUDE',
          '10.0',
          'ASK_2014',
          'Christchurch',
          '-43.52565',
          '172.639847',
          '0.019949999999999996',
          '0.030350533448971206',
        ],
        [
          '50',
          'EXCLUDE',
          '10.0',
          'ASK_2014',
          'Christchurch',
          '-43.52565',
          '172.639847',
          '0.019949999999999996',
          '0.030350533448971206',
        ],
      ],
    },
  };

  const expected: XY[] = [
    {
      x: 0.019949999999999996,
      y: 0.030350533448971206,
    },
  ];

  it('returns filtered xy', () => {
    const result = inversionSolutionsService.filterData(data, 'Wellington', '0.0', '50', 'ASK_2014', 'INCLUDE');
    expect(result).toEqual(expected);
  });

  it('returns emptry array of no row items present', () => {
    const data: InversionSolutionHazardTabQueryResponse = {
      node: {
        rows: null,
      },
    };
    const result = inversionSolutionsService.filterData(data, 'mock', 'mock', 'mocks', 'mock', 'mock');
    expect(result).toEqual([]);
  });

  it('returns empty array if no item matches', () => {
    const result = inversionSolutionsService.filterData(data, 'Auckland', '0.2', '10', 'mock', 'EXCLUDE');
    expect(result).toEqual([]);
  });
});
