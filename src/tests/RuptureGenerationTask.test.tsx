import { Suspense } from 'react';
import TestRenderer from 'react-test-renderer';
import { createMockEnvironment, MockPayloadGenerator, RelayMockEnvironment } from 'relay-test-utils';
import RuptureGenerationTask from '../components/RuptureGenerationTask';
import ReactRouter from 'react-router';
import { RelayEnvironmentProvider } from 'react-relay/hooks';

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

const setup = (environment: RelayMockEnvironment) => {
  return TestRenderer.create(
    <RelayEnvironmentProvider environment={environment}>
      <Suspense fallback="Loading...">
        <RuptureGenerationTask />
      </Suspense>
    </RelayEnvironmentProvider>,
  );
};

describe('RuptureGenerationTask component', () => {
  it('displays a RuptureGenerationTask using mock graphql payload', () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: '1234' });
    const environment = createMockEnvironment();
    environment.mock.queueOperationResolver((operation) => MockPayloadGenerator.generate(operation, mockResolver));

    const renderer = setup(environment);

    expect(renderer).toMatchSnapshot();
    renderer.unmount();
  });

  it('displays not found when no matching id', () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: '1234' });
    const environment = createMockEnvironment();
    environment.mock.queueOperationResolver((operation) =>
      MockPayloadGenerator.generate(operation, {
        RuptureGenerationTask() {
          return null;
        },
      }),
    );

    const renderer = setup(environment);

    expect(renderer).toMatchSnapshot();
    renderer.unmount();
  });

  it('calls graphql query with url param', () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: '1234' });
    const environment = createMockEnvironment();

    const renderer = setup(environment);

    const variables = environment.mock.getMostRecentOperation().request.variables;
    expect(variables).toStrictEqual({ id: '1234' });
    renderer.unmount();
  });
});
