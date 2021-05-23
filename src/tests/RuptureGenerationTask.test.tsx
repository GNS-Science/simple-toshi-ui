import { Suspense } from 'react';
import TestRenderer from 'react-test-renderer';
import { createMockEnvironment, MockPayloadGenerator } from 'relay-test-utils';
import RuptureGenerationTask from '../components/RuptureGenerationTask';
import ReactRouter from 'react-router';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import { render } from '@testing-library/react';

const mockResolver = {
  RuptureGenerationTask: () => ({
    id: '1234',
    duration: 60,
    created: '2021-05-19T07:04:42.283510+00:00',
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
  }),
};

describe('RuptureGenerationTask component', () => {
  it('displays a RuptureGenerationTask using mock graphql payload', () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: '1234' });
    const environment = createMockEnvironment();
    environment.mock.queueOperationResolver((operation) => MockPayloadGenerator.generate(operation, mockResolver));

    const renderer = TestRenderer.create(
      <RelayEnvironmentProvider environment={environment}>
        <Suspense fallback="Loading...">
          <RuptureGenerationTask />
        </Suspense>
      </RelayEnvironmentProvider>,
    );

    expect(renderer).toMatchSnapshot();
  });

  it('calls graphql query with url param', () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: '1234' });
    const environment = createMockEnvironment();
    render(
      <RelayEnvironmentProvider environment={environment}>
        <Suspense fallback="Loading...">
          <RuptureGenerationTask />
        </Suspense>
      </RelayEnvironmentProvider>,
    );
    const variables = environment.mock.getMostRecentOperation().request.variables;
    expect(variables).toStrictEqual({ id: '1234' });
  });
});
