import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import MiniGeneralTask from '../../components/mini/MiniGeneralTask';
import { BrowserRouter } from 'react-router-dom';
import { format } from 'date-fns';

const mockGeneralTask = {
  edges: {
    node: {
      id: 'R2VuZXJhbFRhc2s6OTkwWjdqOVE=',
      __typename: 'GeneralTask',
      description: 'mock description',
      notes: 'mock notes',
      title: 'mock title',
      created: '2021-08-29T01:01:58.947293+00:00',
      model_type: 'SUBDUCTION',
      subtask_type: 'INVERSION',
      subtask_count: 32,
      subtask_result: 'SUCCESS',
      children: {
        total_count: 22,
      },
    },
  },
};

test('displays things', () => {
  render(
    <BrowserRouter>
      <MiniGeneralTask
        id={mockGeneralTask.edges.node.id}
        title={mockGeneralTask.edges.node.title}
        description={mockGeneralTask.edges.node.description}
        created={mockGeneralTask.edges.node.created}
        total_count={mockGeneralTask.edges.node.children.total_count}
        model_type={mockGeneralTask.edges.node.model_type}
        subtask_type={mockGeneralTask.edges.node.subtask_type}
        subtask_result={mockGeneralTask.edges.node.subtask_result}
        notes={mockGeneralTask.edges.node.notes}
        subtask_count={mockGeneralTask.edges.node.subtask_count}
      />
      ,
    </BrowserRouter>,
  );
  expect(screen.getByText(mockGeneralTask.edges.node.title)).toBeInTheDocument();
  expect(screen.getByText(mockGeneralTask.edges.node.description)).toBeInTheDocument();
  expect(screen.getByText(mockGeneralTask.edges.node.notes)).toBeInTheDocument();
  expect(screen.getByText(format(new Date(mockGeneralTask.edges.node.created), 'PPPppp'))).toBeInTheDocument();
  expect(screen.getByText(mockGeneralTask.edges.node.model_type)).toBeInTheDocument();
  expect(screen.getByText(mockGeneralTask.edges.node.subtask_type)).toBeInTheDocument();
  expect(screen.getByText(mockGeneralTask.edges.node.subtask_result)).toBeInTheDocument();
  expect(screen.getByText(mockGeneralTask.edges.node.subtask_count)).toBeInTheDocument();
  expect(screen.getByText(mockGeneralTask.edges.node.children.total_count)).toBeInTheDocument();
});
