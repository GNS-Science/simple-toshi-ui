import { graphql } from 'babel-plugin-relay/macro';
import React, { useEffect } from 'react';
import GeneralTaskFilter from './GeneralTaskFilter';
import { SweepArguments, FilteredChildren } from './GeneralTaskChildrenTab';
import { GeneralTaskFilterContainerQuery } from './__generated__/GeneralTaskFilterContainerQuery.graphql';
import { useQueryLoader } from 'react-relay';
import DemoWindowControl from './DemoWindowControl';

interface GeneralTaskFilterContainerProps {
  readonly sweepArgs?: SweepArguments;
  onChange: (event: React.ChangeEvent<{ value: unknown; name?: string | undefined }>) => void;
  filteredChildren?: FilteredChildren;
}

const GeneralTaskFilterContainer: React.FC<GeneralTaskFilterContainerProps> = ({
  sweepArgs,
  onChange,
  filteredChildren,
}: GeneralTaskFilterContainerProps) => {
  const [queryRef, loadQuery] = useQueryLoader<GeneralTaskFilterContainerQuery>(generalTaskFilterContainerQuery);

  useEffect(() => {
    const filteredChildrenData = filteredChildren?.data ?? [];
    if (filteredChildrenData.length <= 8) {
      const filteredChildrenIds: string[] = [];
      filteredChildrenData.map((child) => {
        (child?.__typename === 'AutomationTask' || child?.__typename === 'RuptureGenerationTask') &&
          child.id !== undefined &&
          filteredChildrenIds.push(child?.id);
      });
      loadQuery({ id: filteredChildrenIds });
    }
  }, [filteredChildren]);

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {sweepArgs?.map((argument) => (
          <GeneralTaskFilter key={`${argument?.k}-filter`} argument={argument} onChange={onChange} />
        ))}
      </div>
      {queryRef && <DemoWindowControl queryRef={queryRef} />}
    </>
  );
};

export default GeneralTaskFilterContainer;

export const generalTaskFilterContainerQuery = graphql`
  query GeneralTaskFilterContainerQuery($id: [ID!]) {
    nodes(id_in: $id) {
      result {
        edges {
          node {
            __typename
            ... on AutomationTask {
              created
              task_type
              inversion_solution {
                id
                file_name
                meta {
                  k
                  v
                }
              }
            }
          }
        }
      }
    }
  }
`;
