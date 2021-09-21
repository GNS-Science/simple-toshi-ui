import React, { Suspense } from 'react';
import { createMockEnvironment, MockPayloadGenerator, RelayMockEnvironment } from 'relay-test-utils';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import { cleanup, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Search, { searchQuery } from '../components/Search';
import userEvent from '@testing-library/user-event';

const setup = (environment: RelayMockEnvironment) => {
  return render(
    <RelayEnvironmentProvider environment={environment}>
      <Suspense fallback="Loading...">
        <BrowserRouter>
          <Search />
        </BrowserRouter>
      </Suspense>
    </RelayEnvironmentProvider>,
  );
};

describe('Search component', () => {
  afterEach(() => {
    cleanup();
  });

  it('displays a MiniFile', async () => {
    const environment = createMockEnvironment();

    const mockResolver = {
      Search: () => ({
        search_result: {
          edges: [
            {
              node: {
                __typename: 'File',
                id: 'file-id',
                file_size: 1000,
              },
            },
          ],
        },
      }),
    };

    environment.mock.queueOperationResolver((operation) => MockPayloadGenerator.generate(operation, mockResolver));
    environment.mock.queuePendingOperation(searchQuery, { search: 'test' });

    const { findByText, findByDisplayValue } = setup(environment);
    const searchInput = await findByDisplayValue('');
    const searchButton = await findByText('Search');
    userEvent.type(searchInput, 'test');
    userEvent.click(searchButton);
    expect(await findByText('File'));
    expect(await findByText('[more]')).toHaveAttribute('href', '/FileDetail/file-id');
  });

  it('displays a MiniAutomationTask', async () => {
    const environment = createMockEnvironment();

    const mockResolver = {
      Search: () => ({
        search_result: {
          edges: [
            {
              node: {
                __typename: 'AutomationTask',
                id: 'automationTask-id',
                duration: 60,
                created: '2021-06-10T10:36:05.560362+00:00',
              },
            },
          ],
        },
      }),
    };

    environment.mock.queueOperationResolver((operation) => MockPayloadGenerator.generate(operation, mockResolver));
    environment.mock.queuePendingOperation(searchQuery, { search: 'test' });

    const { findByText, findByDisplayValue } = setup(environment);
    const searchInput = await findByDisplayValue('');
    const searchButton = await findByText('Search');
    userEvent.type(searchInput, 'test');
    userEvent.click(searchButton);
    expect(await findByText('Automation Task'));
    expect(await findByText('[more]')).toHaveAttribute('href', '/AutomationTask/automationTask-id');
  });

  it('displays a MiniRuptureGenerationTask', async () => {
    const environment = createMockEnvironment();

    const mockResolver = {
      Search: () => ({
        search_result: {
          edges: [
            {
              node: {
                __typename: 'RuptureGenerationTask',
                id: 'ruptureGenerationTask-id',
                duration: 60,
                created: '2021-06-10T10:36:05.560362+00:00',
              },
            },
          ],
        },
      }),
    };

    environment.mock.queueOperationResolver((operation) => MockPayloadGenerator.generate(operation, mockResolver));
    environment.mock.queuePendingOperation(searchQuery, { search: 'test' });

    const { findByText, findByDisplayValue } = setup(environment);
    const searchInput = await findByDisplayValue('');
    const searchButton = await findByText('Search');
    userEvent.type(searchInput, 'test');
    userEvent.click(searchButton);
    expect(await findByText('Rupture Generation Task'));
    expect(await findByText('[more]')).toHaveAttribute('href', '/RuptureGenerationTask/ruptureGenerationTask-id');
  });

  it('displays a MiniGeneralTask', async () => {
    const environment = createMockEnvironment();

    const mockResolver = {
      Search: () => ({
        search_result: {
          edges: [
            {
              node: {
                __typename: 'GeneralTask',
                id: 'GeneralTask-id',
                created: '2021-06-10T10:36:05.560362+00:00',
              },
            },
          ],
        },
      }),
    };

    environment.mock.queueOperationResolver((operation) => MockPayloadGenerator.generate(operation, mockResolver));
    environment.mock.queuePendingOperation(searchQuery, { search: 'test' });

    const { findByText, findByDisplayValue } = setup(environment);
    const searchInput = await findByDisplayValue('');
    const searchButton = await findByText('Search');
    userEvent.type(searchInput, 'test');
    userEvent.click(searchButton);
    expect(await findByText('Type: General Task'));
    expect(await findByText('Description:'));
    expect(await findByText('Notes:'));
    expect(await findByText('Created:'));
    expect(await findByText('Model Type:'));
    expect(await findByText('Subtask Type:'));
    expect(await findByText('Count:'));
  });
});
