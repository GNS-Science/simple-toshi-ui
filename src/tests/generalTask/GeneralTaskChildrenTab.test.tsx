import React, { Suspense } from 'react';
import { createMockEnvironment, MockPayloadGenerator, RelayMockEnvironment } from 'relay-test-utils';
import ReactRouter from 'react-router';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import GeneralTaskChildrenTab from '../../components/generalTask/GeneralTaskChildrenTab';
import { GeneralTaskQueryResponse } from '../../pages/__generated__/GeneralTaskQuery.graphql';
import { SweepArguments } from '../../interfaces/generaltask';

const mockResolver = {
  AutomationTask() {
    return {
      __typename: 'AutomationTask',
      id: '1111',
      created: '2021-09-14T00:19:24.130022+00:00',
      duration: 'mock duration',
      state: 'DONE',
      result: 'SUCCESS',
      arguments: {
        k: 'mock k',
        v: 'mock v',
      },
    };
  },
  RuptureGenerationTask() {
    return {
      __typename: 'RuptureGenerationTask',
      id: '2222',
      created: '2021-09-14T00:19:24.130022+00:00',
      duration: 'mock duration',
      state: 'DONE',
      result: 'SUCCESS',
      arguments: {
        k: 'mock k2',
        v: 'mock v2',
      },
    };
  },
};
const mockSweepArgs: SweepArguments = [
  {
    k: 'mockK',
    v: ['mockV'],
  },
];

const mockGeneralTaskData: GeneralTaskQueryResponse = {
  node: {
    id: '1234',
    title: 'mockTitle',
    created: 'mockCreated',
  },
};

const setup = (environment: RelayMockEnvironment) => {
  return render(
    <RelayEnvironmentProvider environment={environment}>
      <Suspense fallback="Loading...">
        <BrowserRouter>
          <GeneralTaskChildrenTab id={'1234'} sweepArgs={mockSweepArgs} generalTaskData={mockGeneralTaskData} />
        </BrowserRouter>
      </Suspense>
    </RelayEnvironmentProvider>,
  );
};

describe('GeneralTask Children Tab component', () => {
  afterEach(() => {
    cleanup();
  });
});
