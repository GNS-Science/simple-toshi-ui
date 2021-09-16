import { graphql } from 'babel-plugin-relay/macro';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import GeneralTaskFilter from './GeneralTaskFilter';
import { GeneralTaskFilterContainerQuery } from './__generated__/GeneralTaskFilterContainerQuery.graphql';
import { useQueryLoader } from 'react-relay';
import { FilteredChildren, SweepArguments } from '../../interfaces/generaltask';
import DiagnosticReportControls from './DiagnosticReportControls';
import DiagnosticReportWindowContainer from './DiagnosticReportWindowContainer';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  filterContainer: { display: 'flex', flexWrap: 'wrap' },
  controlsContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  hidden: {
    display: 'none',
  },
}));
interface GeneralTaskFilterContainerProps {
  readonly sweepArgs?: SweepArguments;
  setShowList: Dispatch<SetStateAction<boolean>>;
  onChange: (event: React.ChangeEvent<{ value: unknown; name?: string | undefined }>) => void;
  filteredChildren?: FilteredChildren;
  childrenListLength: number;
}

const GeneralTaskFilterContainer: React.FC<GeneralTaskFilterContainerProps> = ({
  sweepArgs,
  setShowList,
  onChange,
  filteredChildren,
  childrenListLength,
}: GeneralTaskFilterContainerProps) => {
  const classes = useStyles();
  const [queryRef, loadQuery] = useQueryLoader<GeneralTaskFilterContainerQuery>(generalTaskFilterContainerQuery);
  const [showFilters, setShowFilters] = useState(false);
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
    const newValue = (event.target.value as string) || '';
    setFinalPath(newValue);
  };

  const handleOpen = () => {
    setShowList((v) => !v);
    setOpen((v) => !v);
  };

  return (
    <>
      <div className={classes.controlsContainer}>
        <DiagnosticReportControls
          isOpen={open}
          setShowFilters={setShowFilters}
          setViewOption={handleChange}
          setOpen={handleOpen}
        />
        <Button onClick={() => setShowFilters((v) => !v)}>
          <span>
            Filter({filteredChildren?.data?.length}/{childrenListLength})
          </span>
        </Button>
      </div>
      <div className={showFilters ? classes.filterContainer : classes.hidden}>
        {sweepArgs?.map((argument) => (
          <GeneralTaskFilter key={`${argument?.k}-filter`} argument={argument} onChange={onChange} />
        ))}
      </div>
      {open && queryRef && (
        <DiagnosticReportWindowContainer sweepArgs={sweepArgs} queryRef={queryRef} finalPath={finalPath} />
      )}
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
