import { Button, Typography } from '@material-ui/core';
import { graphql } from 'babel-plugin-relay/macro';
import React, { useContext, useState } from 'react';
import { useLazyLoadQuery } from 'react-relay';
import DiagnosticReportControls from '../components/diagnosticReportView/DiagnosticReportControls';
import MySolutionsList from '../components/mySolutions/MySolutionsList';
import LocalStorageContext from '../contexts/localStorage';
import { SolutionItem } from '../interfaces/mySolutions';
import { MySolutionsQuery } from './__generated__/MySolutionsQuery.graphql';
import { diagnosticReportViewOptions as options } from '../constants/diagnosticReport';
import { ValidatedSubtask } from '../interfaces/diagnosticReport';
import DiagnosticReportCard from '../components/diagnosticReportView/DiagnosticReportCard';
import ControlsBar from '../components/common/ControlsBar';
import GeneralTaskDetailDrawer from '../components/diagnosticReportView/GeneralTaskDetailDrawer';

const MySolutions: React.FC = () => {
  const { ISFavourites } = useContext(LocalStorageContext);
  const [showList, setShowList] = useState(true);
  const [viewOptions, setViewOptions] = useState<string[]>([options[0].finalPath]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const id: string[] = [];

  for (const inversionSolution in ISFavourites) {
    id.push(ISFavourites[inversionSolution].producedBy);
  }

  const data = useLazyLoadQuery<MySolutionsQuery>(mySolutionsQuery, { id });
  const automationTasks = data?.nodes?.result?.edges.map((e) => e?.node) ?? [];
  const validATs: SolutionItem[] = [];

  const reportItems: ValidatedSubtask[] = [];

  automationTasks.map((item) => {
    if (item && item !== null && item.__typename === 'AutomationTask' && item.inversion_solution !== null) {
      validATs.push(item);
    }
  });
  const handleChange = (event: React.ChangeEvent<{ value: unknown; name?: string | undefined }>) => {
    const newValue = (event.target.value as string[]) || [];
    setViewOptions(newValue);
  };

  validATs.map((task) => {
    const newMeta = task.inversion_solution?.meta ?? [];
    const validatedTask: ValidatedSubtask = {
      __typename: 'AutomationTask',
      id: task.id,
      inversion_solution: {
        id: task.inversion_solution?.id as string,
        meta: [...newMeta],
      },
    };
    reportItems.push(validatedTask);
  });

  return (
    <>
      <Typography variant="h5" gutterBottom>
        My Solutions
      </Typography>
      <ControlsBar>
        <Button variant="contained" color="default" onClick={() => setShowList((v) => !v)}>
          Show Report
        </Button>
        <Button color="default" variant="contained" onClick={() => setOpenDrawer((v) => !v)}>
          Details
        </Button>
        <DiagnosticReportControls setViewOption={handleChange} />
      </ControlsBar>
      {showList ? (
        <MySolutionsList solutionsList={validATs} />
      ) : (
        <DiagnosticReportCard automationTasks={reportItems} viewOptions={viewOptions} />
      )}
      <GeneralTaskDetailDrawer openDrawer={openDrawer} />
    </>
  );
};

export default MySolutions;

export const mySolutionsQuery = graphql`
  query MySolutionsQuery($id: [ID!]) {
    nodes(id_in: $id) {
      result {
        edges {
          node {
            __typename
            ... on AutomationTask {
              id
              parents {
                edges {
                  node {
                    parent {
                      ... on GeneralTask {
                        id
                        created
                        title
                        description #hover
                        model_type
                        swept_arguments
                        notes #hover
                      }
                    }
                  }
                }
              }
              inversion_solution {
                id
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
