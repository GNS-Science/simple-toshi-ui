import React, { Suspense } from 'react';
import { createMockEnvironment, MockPayloadGenerator, RelayMockEnvironment } from 'relay-test-utils';
import GeneralTask from '../components/GeneralTask';
import ReactRouter from 'react-router';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import { cleanup, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

const mockResolver = {
  GeneralTask: () => ({
    created: '2021-05-19T07:04:42.283510+00:00',
    updated: '2021-05-19T07:04:42.283510+00:00',
    children: {
      total_count: 1,
      edges: [
        {
          node: {
            child: {
              __typename: 'RuptureGenerationTask',
              id: 'RGT-id',
              created: '2021-05-19T07:04:42.283510+00:00',
              duration: 1000,
              state: 'DONE',
              result: 'SUCCESS',
            },
          },
        },
      ],
    },
  }),
};

const setup = (environment: RelayMockEnvironment) => {
  return render(
    <RelayEnvironmentProvider environment={environment}>
      <Suspense fallback="Loading...">
        <BrowserRouter>
          <GeneralTask />
        </BrowserRouter>
      </Suspense>
    </RelayEnvironmentProvider>,
  );
};

describe('GeneralTask component', () => {
  afterEach(() => {
    cleanup();
  });

  it.todo('displays a GeneralTask using mock graphql payload');
  // , async () => {
  //   jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: '1234' });
  //   const environment = createMockEnvironment();
  //   environment.mock.queueOperationResolver((operation) => MockPayloadGenerator.generate(operation, mockResolver));

  //   const { findByText } = setup(environment);
  //   expect(await findByText('[more]')).toHaveAttribute('href', '/RuptureGenerationTask/RGT-id');
  // });

  it('displays not found when no matching id', async () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: '1234' });
    const environment = createMockEnvironment();
    environment.mock.queueOperationResolver((operation) =>
      MockPayloadGenerator.generate(operation, {
        GeneralTask() {
          return null;
        },
      }),
    );

    const { findByText } = setup(environment);
    expect(await findByText('General Task: Id Not Found')).toBeVisible();
  });

  it('calls graphql query with url param', () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: '1234' });
    const environment = createMockEnvironment();

    setup(environment);

    const variables = environment.mock.getMostRecentOperation().request.variables;
    expect(variables).toStrictEqual({ id: '1234' });
  });
});
