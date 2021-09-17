import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useQueryLoader } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import GeneralTaskFilter from './GeneralTaskFilter';
import DiagnosticReportControls from './DiagnosticReportControls';
import DiagnosticReportWindowContainer from './DiagnosticReportWindowContainer';
import { GeneralTaskFilterContainerQuery } from './__generated__/GeneralTaskFilterContainerQuery.graphql';
import { FilteredChildren, SweepArguments } from '../../interfaces/generaltask';
import { diagnosticReportViewOptions as options } from '../../constants/diagnosticReport';

const useStyles = makeStyles(() => ({
  filterContainer: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    paddingLeft: 10,
  },
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
  const [finalPath, setFinalPath] = useState<string>(options[0].finalPath);

  const maxLength = process.env.REACT_APP_REPORTS_LIMIT ?? 24;

  useEffect(() => {
    const filteredChildrenData = filteredChildren?.data ?? [];
    if (filteredChildrenData.length <= maxLength) {
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
        <Button onClick={() => setShowFilters((v) => !v)}>
          <span>
            Filter({filteredChildren?.data?.length}/{childrenListLength})
          </span>
        </Button>
        <DiagnosticReportControls isOpen={open} setViewOption={handleChange} setOpen={handleOpen} />
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
