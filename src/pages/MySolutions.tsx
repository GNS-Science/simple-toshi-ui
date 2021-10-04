import React, { useContext, useEffect, useState } from 'react';
import { useLazyLoadQuery } from 'react-relay';
import { Button, Typography } from '@material-ui/core';
import { graphql } from 'babel-plugin-relay/macro';
import DiagnosticReportControls from '../components/diagnosticReportView/DiagnosticReportControls';
import GeneralTaskDetailDrawer from '../components/diagnosticReportView/GeneralTaskDetailDrawer';
import DiagnosticReportCard from '../components/diagnosticReportView/DiagnosticReportCard';
import MySolutionsList from '../components/mySolutions/MySolutionsList';
import ControlsBar from '../components/common/ControlsBar';
import LocalStorageContext from '../contexts/localStorage';
import { SolutionItem } from '../interfaces/mySolutions';
import { GeneralTaskDetails, ReportItems } from '../interfaces/diagnosticReport';
import { MySolutionsQuery } from './__generated__/MySolutionsQuery.graphql';
import { diagnosticReportViewOptions as options } from '../constants/diagnosticReport';
import { getGeneralTaskDetails } from '../service/mySolution.service';

const MySolutions: React.FC = () => {
  const { ISFavourites } = useContext(LocalStorageContext);
  const [showList, setShowList] = useState(true);
  const [viewOptions, setViewOptions] = useState<string[]>([options[0].finalPath]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [currentImage, setCurrentImage] = useState<number>(0);

  const id: string[] = [];
  for (const inversionSolution in ISFavourites) {
    id.push(ISFavourites[inversionSolution].producedBy);
  }

  const data = useLazyLoadQuery<MySolutionsQuery>(mySolutionsQuery, { id });
  const automationTasks = data?.nodes?.result?.edges.map((e) => e?.node) ?? [];
  const listItems: SolutionItem[] = [];
  const reportItems: ReportItems[] = [];

  automationTasks.map((item) => {
    if (item && item !== null && item.__typename === 'AutomationTask' && item.inversion_solution !== null) {
      listItems.push(item);
    }
  });

  listItems.map((task) => {
    const newMeta = task.inversion_solution?.meta ?? [];
    const validatedTask: ReportItems = {
      __typename: 'AutomationTask',
      id: task.id,
      inversion_solution: {
        id: task.inversion_solution?.id as string,
        meta: [...newMeta],
      },
    };
    reportItems.push(validatedTask);
  });

  const [currentGeneralTask, setCurrentGeneralTask] = useState<GeneralTaskDetails>(
    getGeneralTaskDetails(listItems, reportItems, 0),
  );
  const handleChange = (event: React.ChangeEvent<{ value: unknown; name?: string | undefined }>) => {
    const newValue = (event.target.value as string[]) || [];
    setViewOptions(newValue);
  };

  const handleChangeCurrentImage = (index: number) => {
    setCurrentImage(index);
  };

  useEffect(() => {
    setCurrentGeneralTask(getGeneralTaskDetails(listItems, reportItems, currentImage));
  }, [currentImage]);

  return (
    <>
      <Typography variant="h5" gutterBottom>
        My Solutions
      </Typography>
      <ControlsBar>
        <Button variant="contained" color="default" onClick={() => setShowList((v) => !v)}>
          Show Report
        </Button>
        {!showList && (
          <Button color="default" variant="contained" onClick={() => setOpenDrawer((v) => !v)}>
            Details
          </Button>
        )}
        {!showList && <DiagnosticReportControls setViewOption={handleChange} />}
      </ControlsBar>
      {showList ? (
        <MySolutionsList solutionsList={listItems} />
      ) : (
        <DiagnosticReportCard
          changeCurrentImage={handleChangeCurrentImage}
          automationTasks={reportItems}
          viewOptions={viewOptions}
        />
      )}
      {!showList && <GeneralTaskDetailDrawer generalTaskDetails={currentGeneralTask} openDrawer={openDrawer} />}
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
                        argument_lists {
                          k
                          v
                        }
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
