import React, { Suspense } from 'react';
import ReactRouter from 'react-router';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { createMockEnvironment, MockPayloadGenerator, RelayMockEnvironment } from 'relay-test-utils';

import GeneralTaskChildrenTab, { generalTaskChildrenTabQuery } from '../components/generalTask/GeneralTaskChildrenTab';
import { BrowserRouter } from 'react-router-dom';

const mockResolver = {
  GeneralTask() {
    return {
      id: '1234',
    };
  },
  AutomationTask() {
    return {
      ___typename: 'AutomationTask',
      id: '5678',
      created: '2021-09-14T00:19:24.130022+00:00',
      duration: '123',
      state: 'DONE',
      result: 'SUCCESS',
      arguments: [
        {
          k: 'mock AT k_1',
          v: '0',
        },
        {
          k: 'mock_AT_k_2',
          v: '1',
        },
      ],
    };
  },
  RuptureGeneration() {
    return {
      ___typename: 'RuptureGenerationTask',
      id: '2345',
      created: '2021-09-14T00:19:24.130022+00:00',
      duration: '123',
      state: 'STARTED',
      result: 'SUCCESS',
      arguments: [
        {
          k: 'mock AT k_1',
          v: '0',
        },
        {
          k: 'mock_AT_k_2',
          v: '1',
        },
      ],
    };
  },
};

const mockSweepArgs = [
  {
    k: 'mock_k1',
    v: ['0'],
  },
  {
    k: 'mock_k2',
    v: ['1'],
  },
];

const setup = (environment: RelayMockEnvironment) => {
  return render(
    <RelayEnvironmentProvider environment={environment}>
      <BrowserRouter>
        <Suspense fallback={'Loading'}>
          <GeneralTaskChildrenTab id="1234" sweepArgs={mockSweepArgs} />
        </Suspense>
      </BrowserRouter>
    </RelayEnvironmentProvider>,
  );
};

describe('GeneralTaskChildComponent', () => {
  afterEach(() => {
    cleanup();
  });

  it('dislays child tab with Child task table using mock graphql payload', async () => {
    const environment = createMockEnvironment();

    environment.mock.queueOperationResolver((operation) => MockPayloadGenerator.generate(operation, mockResolver));
    environment.mock.queuePendingOperation(generalTaskChildrenTabQuery, { id: '1234' });

    const { getByRole, findByText } = setup(environment);

    expect(await findByText('Created')).toBeInTheDocument();
    expect(await findByText('Duration')).toBeInTheDocument();
    expect(await findByText('Result')).toBeInTheDocument();
    expect(await findByText('Status')).toBeInTheDocument();
    const filterButton = getByRole('filterButton');
    expect(filterButton).toHaveTextContent('Filter');
  });

  it('displays not found when there is no data', async () => {
    const environment = createMockEnvironment();

    environment.mock.queueOperationResolver((operation) =>
      MockPayloadGenerator.generate(operation, {
        GeneralTask() {
          return null;
        },
        AutomationTask() {
          return null;
        },
      }),
    );
    environment.mock.queuePendingOperation(generalTaskChildrenTabQuery, { id: '1234' });

    const { findByText } = setup(environment);

    expect(await findByText('General Task: Id Not Found')).toBeInTheDocument();
  });
});
