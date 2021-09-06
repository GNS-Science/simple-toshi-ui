import React, { Suspense } from 'react';
import { createMockEnvironment, MockPayloadGenerator, RelayMockEnvironment } from 'relay-test-utils';
import { InversionSolution, inversionSolutionQuery } from '../components/InversionSolution';
import ReactRouter from 'react-router';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import { cleanup, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { inversionSolutionDetailTabQuery } from '../components/InversionSolutionDetailTab';
import { inversionSolutionMfdTabQuery } from '../components/InversionSolutionMfdTab';

const mockMfdResolver = {
  InversionMfdSolution: () => ({
    mfd_table: {
      name: 'testTable',
      column_types: ['testTypes'],
      column_headers: ['testHeaders'],
      rows: [['testRow1'], ['testRow2'], ['testRow3']],
    },
    meta: [
      {
        k: 'testK',
        v: 'testV',
      },
    ],
  }),
};
const mockDetailResolver = {
  InversionDetailSolution: () => ({
    id: '1234',
    produced_by_id: 'QXV0b21hdGlvblRhc2s6OTk2Q1NoOVg=',
    file_name: 'testFile.zip',
    file_size: '1000 Bytes',
    file_url: 'testing.test',
    md5_digest: 'md5Test',
    meta: {
      k: 'testMetaKey',
      v: 'testMetaValue',
    },
    metrics: {
      k: 'testMetricsKey',
      v: 'testMetricsValue',
    },
  }),
};

const setup = (environment: RelayMockEnvironment) => {
  return render(
    <RelayEnvironmentProvider environment={environment}>
      <Suspense fallback="Loading...">
        <BrowserRouter>
          <InversionSolution />
        </BrowserRouter>
      </Suspense>
    </RelayEnvironmentProvider>,
  );
};

describe('InversionSolution component', () => {
  afterEach(() => {
    cleanup();
  });
  it('calls graphql query with url param', () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: '1234' });
    const environment = createMockEnvironment();

    setup(environment);

    const variables = environment.mock.getMostRecentOperation().request.variables;
    expect(variables).toStrictEqual({ id: '1234' });
  });

  it('displays an InversionSolution detail using mock graphql payload with correct download link', async () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: '1234' });
    const environment = createMockEnvironment();
    environment.mock.queueOperationResolver((operation) => {
      return MockPayloadGenerator.generate(operation, {
        Response() {
          return mockDetailResolver;
        },
      });
    });
    environment.mock.queuePendingOperation(inversionSolutionQuery, {});
    const { findByText } = setup(environment);

    expect(await findByText('Detail')).toBeInTheDocument();
    expect(await findByText('MFD plot')).toBeInTheDocument();
  });

  // , async () => {
  // jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: '1234', tab: 'InversionSolutionDetailTab' });
  // const environment = createMockEnvironment();
  // environment.mock.queueOperationResolver((operation) =>
  //   MockPayloadGenerator.generate(operation, mockDetailResolver),
  // );
  // environment.mock.queuePendingOperation(inversionSolutionDetailTabQuery, { id: '1234' });

  // const { findByText } = setup(environment);
});

it.todo('displays an InversionSolutionMfdTab using mock graphql payload with table and correct data');

// , async () => {
// jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: '1234', tab: 'InversionSolutionMfdTab' });
// const environment = createMockEnvironment();
// environment.mock.queueOperationResolver((operation) => MockPayloadGenerator.generate(operation, mockMfdResolver));
// environment.mock.queuePendingOperation(inversionSolutionMfdTabQuery, { id: '1234' });

// const { findByText } = setup(environment);
// expect(await findByText('testMetaKey')).toBeVisible();
// });
// });
