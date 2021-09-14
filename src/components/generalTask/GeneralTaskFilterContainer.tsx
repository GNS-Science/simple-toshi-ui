import { graphql } from 'babel-plugin-relay/macro';
import React, { useEffect, useState } from 'react';
import GeneralTaskFilter from './GeneralTaskFilter';
import { GeneralTaskFilterContainerQuery } from './__generated__/GeneralTaskFilterContainerQuery.graphql';
import { useQueryLoader } from 'react-relay';
import { FilteredChildren, SweepArguments } from '../../interfaces/generaltask';
import DiagnosticReportControls from './DiagnosticReportControls';
import DiagnosticReportWindowContainer from './DiagnosticReportWindowContainer';

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
  const [open, setOpen] = useState(false);
  const [finalPath, setFinalPath] = useState<string>('');

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

  const handleChange = (event: React.ChangeEvent<{ value: unknown; name?: string | undefined }>) => {
    console.log(event.target);
    const newValue = (event.target.value as string) || '';
    console.log(newValue);
    setFinalPath(newValue);
  };

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {sweepArgs?.map((argument) => (
          <GeneralTaskFilter key={`${argument?.k}-filter`} argument={argument} onChange={onChange} />
        ))}
      </div>
      <DiagnosticReportControls isOpen={open} setViewOption={handleChange} setOpen={setOpen} />
      {open && queryRef && <DiagnosticReportWindowContainer queryRef={queryRef} finalPath={finalPath} />}
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
