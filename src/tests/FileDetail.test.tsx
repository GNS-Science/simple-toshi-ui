import React, { Suspense } from 'react';
import { createMockEnvironment, MockPayloadGenerator, RelayMockEnvironment } from 'relay-test-utils';
import FileDetail from '../components/FileDetail';
import ReactRouter from 'react-router';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import { cleanup, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

const mockResolver = {
  File: () => ({
    id: '1234',
    file_name: 'testFile.zip',
    file_size: 1000,
    file_url: 'test_url',
    md5_digest: 'test_md5',
    relations: {
      edges: [
        {
          node: {
            role: 'WRITE',
            thing: {
              id: 'task-id',
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
          <FileDetail />
        </BrowserRouter>
      </Suspense>
    </RelayEnvironmentProvider>,
  );
};

describe('FileDetail component', () => {
  afterEach(() => {
    cleanup();
  });

  it('displays a FileDetail using mock graphql payload with correct download link', async () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: '1234' });
    const environment = createMockEnvironment();
    environment.mock.queueOperationResolver((operation) => MockPayloadGenerator.generate(operation, mockResolver));

    const { findByText } = setup(environment);
    expect(await findByText('Download')).toHaveAttribute('href', 'test_url');
    expect(await findByText('task-id')).toHaveAttribute('href', '/RuptureGenerationTask/task-id');
    expect(await findByText('testFile.zip')).toBeVisible();
    expect(await findByText('1000 Bytes')).toBeVisible();
    expect(await findByText('test_md5')).toBeVisible();
  });

  it('displays not found when no matching id', async () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: '1234' });
    const environment = createMockEnvironment();
    environment.mock.queueOperationResolver((operation) =>
      MockPayloadGenerator.generate(operation, {
        File() {
          return null;
        },
      }),
    );

    const { findByText } = setup(environment);
    expect(await findByText('File ID Not Found')).toBeVisible();
  });

  it('calls graphql query with url param', () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: '1234' });
    const environment = createMockEnvironment();

    setup(environment);

    const variables = environment.mock.getMostRecentOperation().request.variables;
    expect(variables).toStrictEqual({ id: '1234' });
  });
});
