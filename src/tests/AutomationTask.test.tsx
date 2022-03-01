import React, { Suspense } from 'react';
import { createMockEnvironment, MockPayloadGenerator, RelayMockEnvironment } from 'relay-test-utils';
import AutomationTask from '../components/AutomationTask';
import ReactRouter from 'react-router';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import { cleanup, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

const mockResolver = {
  AutomationTask: () => ({
    id: '1234',
    duration: 60,
    created: '2021-05-19T07:04:42.283510+00:00',
    files: {
      edges: [
        {
          node: {
            role: 'WRITE',
            file: {
              id: 'file-id',
              file_name: 'test.log',
              file_url: '//test.log',
            },
          },
        },
      ],
    },
    arguments: [
      {
        k: 'testArgument',
        v: 'testArgumentValue',
      },
    ],
    metrics: [
      {
        k: 'testMetric',
        v: 'testMetricValue',
      },
    ],
    environment: [
      {
        k: 'testEnvironment',
        v: 'testEnvironmentValue',
      },
    ],
    result: 'SUCCESS',
    state: 'DONE',
    task_type: 'INVERSION',
    model_type: 'string',
  }),
};

const setup = (environment: RelayMockEnvironment) => {
  return render(
    <RelayEnvironmentProvider environment={environment}>
      <Suspense fallback="Loading...">
        <BrowserRouter>
          <AutomationTask />
        </BrowserRouter>
      </Suspense>
    </RelayEnvironmentProvider>,
  );
};

describe('AutomationTask component', () => {
  afterEach(() => {
    cleanup();
  });

  // it('displays a Automation task using mock graphql payload', async () => {
  //   jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: '1234' });
  //   const environment = createMockEnvironment();
  //   environment.mock.queueOperationResolver((operation) => MockPayloadGenerator.generate(operation, mockResolver));

  //   const { findByText } = setup(environment);
  //   expect(await findByText('Created')).toBeVisible();
  //   expect(await findByText('File')).toBeVisible();
  //   expect(await findByText('[more]')).toHaveAttribute('href', '/FileDetail/file-id');
  //   expect(await findByText('Arguments')).toBeVisible();
  //   expect(await findByText('Environment')).toBeVisible();
  //   expect(await findByText('Metrics')).toBeVisible();
  //   expect(await findByText('INVERSION')).toBeVisible();
  //   expect(await findByText('string')).toBeVisible();
  // });

  it('displays not found when no matching id', async () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: '1234' });
    const environment = createMockEnvironment();
    environment.mock.queueOperationResolver((operation) =>
      MockPayloadGenerator.generate(operation, {
        AutomationTask() {
          return null;
        },
      }),
    );

    const { findByText } = setup(environment);
    expect(await findByText('Automation Task: Id Not Found')).toBeVisible();
  });

  it('calls graphql query with url param', () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: '1234' });
    const environment = createMockEnvironment();

    setup(environment);

    const variables = environment.mock.getMostRecentOperation().request.variables;
    expect(variables).toStrictEqual({ id: '1234' });
  });
});
