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
import { GeneralTaskDetails } from '../interfaces/diagnosticReport';
import { MySolutionsQuery } from './__generated__/MySolutionsQuery.graphql';
import { diagnosticReportViewOptions as options } from '../constants/diagnosticReport';
import {
  getGeneralTaskDetails,
  getMySolutionIdsArray,
  getReportItems,
  validateListItems,
} from '../service/mySolution.service';

const MySolutions: React.FC = () => {
  const [showList, setShowList] = useState(true);
  const [viewOptions, setViewOptions] = useState<string[]>([options[0].finalPath]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [currentImage, setCurrentImage] = useState<number>(0);

  const { ISFavourites } = useContext(LocalStorageContext);
  const id = getMySolutionIdsArray(ISFavourites);
  const data = useLazyLoadQuery<MySolutionsQuery>(mySolutionsQuery, { id });
  const listItems = validateListItems(data);
  const reportItems = getReportItems(listItems);

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

  const hotkeyHandler = (event: KeyboardEvent) => {
    if (event.key === 't') setShowList((v) => !v);
    if (event.key === 'd') setOpenDrawer((v) => !v);
  };

  useEffect(() => {
    window.addEventListener('keypress', hotkeyHandler);
  }, []);

  return (
    <>
      <Typography variant="h5" gutterBottom>
        My Solutions
      </Typography>
      <ControlsBar>
        <Button variant="contained" color="default" onClick={() => setShowList((v) => !v)}>
          {showList ? 'Show Report' : 'Show Report'}
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
