import React, { Suspense } from 'react';
import { createMockEnvironment, MockPayloadGenerator, RelayMockEnvironment } from 'relay-test-utils';
import GeneralTask from '../../pages/GeneralTask';
import ReactRouter from 'react-router';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

const mockGeneralTaskQueryResolver = {
  GeneralTask() {
    return {
      id: '1234',
      title: 'mock title',
      description: '',
      notes: null,
      created: '2021-09-14T00:19:24.130022+00:00',
      updated: '2021-09-14T00:19:24.130022+00:00',
      agent_name: 'mock name',
      model_type: 'mock model type',
      subtask_type: 'INVERSION',
      subtask_count: 1,
      subtask_result: null,
      argument_lists: [
        {
          k: 'mock_k_1',
          v: ['0'],
        },
        {
          k: 'mock_k_2',
          v: ['1', '2'],
        },
      ],
    };
  },
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

jest.mock('../utils', () => ({
  formatDate: jest.fn(() => 'mock date'),
  renderArrayAsString: jest.fn(() => 'mock data string'),
}));

jest.mock('../components/generalTask/GeneralTaskChildrenTab', () => {
  return function MockGeneralTaskChildrenTab() {
    return <div>children tab component</div>;
  };
});

describe('GeneralTask component', () => {
  afterEach(() => {
    cleanup();
  });

  it('displays GeneralTask Detail tab with tabs using mock graphql payload', async () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: '1234 ' });
    const environment = createMockEnvironment();

    environment.mock.queueOperationResolver((operation) =>
      MockPayloadGenerator.generate(operation, mockGeneralTaskQueryResolver),
    );

    const { queryByText, findByText } = setup(environment);
    expect(await findByText('Details')).toBeInTheDocument();
    expect(await findByText('Child Tasks')).toBeInTheDocument();
    expect(await findByText('Model type:')).toBeInTheDocument();
    expect(await findByText('Subtask type:')).toBeInTheDocument();
    expect(await findByText('Subtask result:')).toBeInTheDocument();
    const notes = queryByText('Notes:');
    expect(notes).not.toBeInTheDocument();
    expect(await findByText('mock_k_1')).toBeInTheDocument();
  });

  it('displays mock Child tasks tab when clicked', async () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: '1234 ' });
    const environment = createMockEnvironment();

    environment.mock.queueOperationResolver((operation) =>
      MockPayloadGenerator.generate(operation, mockGeneralTaskQueryResolver),
    );

    const { getByText, findByText } = setup(environment);
    fireEvent.click(getByText('Child Tasks'));

    expect(await findByText('children tab component')).toBeInTheDocument();
  });

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

// const mockResolver = {
//   GeneralTask: () => ({
//     created: '2021-05-19T07:04:42.283510+00:00',
//     updated: '2021-05-19T07:04:42.283510+00:00',
//     children: {
//       total_count: 1,
//       edges: [
//         {
//           node: {
//             child: {
//               __typename: 'RuptureGenerationTask',
//               id: 'RGT-id',
//               created: '2021-05-19T07:04:42.283510+00:00',
//               duration: 1000,
//               state: 'DONE',
//               result: 'SUCCESS',
//             },
//           },
//         },
//       ],
//     },
//   }),
// };

// const setup = (environment: RelayMockEnvironment) => {
//   return render(
//     <RelayEnvironmentProvider environment={environment}>
//       <Suspense fallback="Loading...">
//         <BrowserRouter>
//           <GeneralTask />
//         </BrowserRouter>
//       </Suspense>
//     </RelayEnvironmentProvider>,
//   );
// };

// describe('GeneralTask component', () => {
//   afterEach(() => {
//     cleanup();
//   });

//   it.todo('displays a GeneralTask using mock graphql payload');
//   // , async () => {
//   //   jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: '1234' });
//   //   const environment = createMockEnvironment();
//   //   environment.mock.queueOperationResolver((operation) => MockPayloadGenerator.generate(operation, mockResolver));

//   //   const { findByText } = setup(environment);
//   //   expect(await findByText('[more]')).toHaveAttribute('href', '/RuptureGenerationTask/RGT-id');
//   // });

//   it('displays not found when no matching id', async () => {
//     jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: '1234' });
//     const environment = createMockEnvironment();
//     environment.mock.queueOperationResolver((operation) =>
//       MockPayloadGenerator.generate(operation, {
//         GeneralTask() {
//           return null;
//         },
//       }),
//     );

//     const { findByText } = setup(environment);
//     expect(await findByText('General Task: Id Not Found')).toBeVisible();
//   });

//   it('calls graphql query with url param', () => {
//     jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: '1234' });
//     const environment = createMockEnvironment();

//     setup(environment);

//     const variables = environment.mock.getMostRecentOperation().request.variables;
//     expect(variables).toStrictEqual({ id: '1234' });
//   });
// });
