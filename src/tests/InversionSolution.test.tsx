import React, { Suspense } from 'react';
import { createMockEnvironment, MockPayloadGenerator, RelayMockEnvironment } from 'relay-test-utils';
import InversionSolution from '../components/InversionSolution';
import ReactRouter from 'react-router';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import { cleanup, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

const mockResolver = {
  InversionSolution: () => ({
    id: '1234',
    file_name: 'mock name',
    file_size: 12,
    file_url: 'mock file url',
    md5_digest: 3,
    mfd_table_id: 'mockMfdTableId',
    hazard_table_id: 'mock hazard table id',
    produced_by_id: 'QXV0b21hdGlvblRhc2s6OTk2Q1NoOVg=',
    created: '2021-05-19T07:04:42.283510+00:00',
    meta: [
      {
        k: 'testK',
        v: 'testV',
      },
    ],
    metrics: [
      {
        k: 'testK',
        v: 'testV',
      },
    ],
  }),
};
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
      return MockPayloadGenerator.generate(operation, mockResolver);
    });
    const { findByText } = setup(environment);
    expect(await findByText('MFD plot')).toBeInTheDocument();
    expect(await findByText('Detail')).toBeInTheDocument();
    expect(await findByText('mock name')).toBeInTheDocument();
    expect(await findByText('12 Bytes')).toBeInTheDocument();
    expect(await findByText(3)).toBeInTheDocument();
    expect(await findByText('Download')).toHaveAttribute('href', 'mock file url');
    expect(await findByText('Meta')).toBeInTheDocument();
    expect(await findByText('Metrics')).toBeInTheDocument();
    expect(await findByText('AutomationTask:996CSh9X')).toBeInTheDocument();
    expect(await findByText('AutomationTask:996CSh9X')).toHaveAttribute(
      'href',
      '/AutomationTask/QXV0b21hdGlvblRhc2s6OTk2Q1NoOVg=',
    );
  });

  it.todo('displays an InversionSolutionMfdTab using mock graphql payload with table and correct data');
});
