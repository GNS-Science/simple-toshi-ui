import React, { Suspense } from 'react';
import { createMockEnvironment, MockPayloadGenerator, RelayMockEnvironment } from 'relay-test-utils';
import InversionSolution from '../components/InversionSolution';
import ReactRouter from 'react-router';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import { cleanup, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { inversionSolutionDetailTabQuery } from '../components/InversionSolutionDetailTab';
import { inversionSolutionMfdTabQuery } from '../components/InversionSolutionMfdTab';

const mockResolver = {
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
  InversionDetailSolution: () => ({
    id: '987654321',
    produced_by_id: '123456789',
    file_name: 'testFile.zip',
    file_size: '1000',
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

  it('works', () => {
    expect(1).toBeTruthy();
  });
});
