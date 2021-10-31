import React, { useContext, useEffect, useState } from 'react';
import { useLazyLoadQuery } from 'react-relay';
import { Button, ButtonGroup, Tooltip, Typography } from '@material-ui/core';
import { graphql } from 'babel-plugin-relay/macro';

import DiagnosticReportControls from '../components/diagnosticReportView/DiagnosticReportControls';
import GeneralTaskDetailDrawer from '../components/diagnosticReportView/GeneralTaskDetailDrawer';
import DiagnosticReportCard from '../components/diagnosticReportView/DiagnosticReportCard';
import MySolutionsList from '../components/mySolutions/MySolutionsList';
import ControlsBar from '../components/common/ControlsBar';
import LocalStorageContext from '../contexts/localStorage';
import { GeneralTaskDetails } from '../interfaces/diagnosticReport';
import { MySolutionsQuery } from './__generated__/MySolutionsQuery.graphql';
import {
  getGeneralTaskDetails,
  getMySolutionIdsArray,
  getReportItems,
  validateListItems,
} from '../service/mySolution.service';
import CommonModal from '../components/common/Modal/CommonModal';

const MySolutions: React.FC = () => {
  const {
    ISFavourites,
    setISFavourites,
    localStorageGeneralViews,
    setLocalStorageGeneralViews,
    localStorageNamedFaultsView,
    setLocalStorageNamedFaultsView,
    localStorageNamedFaultsLocations,
    setLocalStorageNamedFaultsLocations,
  } = useContext(LocalStorageContext);

  const [showList, setShowList] = useState(true);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openSaveModal, setOpenSaveModal] = useState(false);
  const [openLoadModal, setOpenLoadModal] = useState(false);
  const [currentImage, setCurrentImage] = useState<number>(0);

  const id = getMySolutionIdsArray(ISFavourites);
  const data = useLazyLoadQuery<MySolutionsQuery>(mySolutionsQuery, { id });
  const listItems = validateListItems(data);
  const reportItems = getReportItems(listItems);

  const [currentGeneralTask, setCurrentGeneralTask] = useState<GeneralTaskDetails>(
    getGeneralTaskDetails(listItems, reportItems, 0),
  );

  const handleChangeCurrentImage = (index: number) => {
    setCurrentImage(index);
  };

  useEffect(() => {
    setCurrentGeneralTask(getGeneralTaskDetails(listItems, reportItems, currentImage));
  }, [currentImage]);

  const hotkeyHandler = (event: KeyboardEvent) => {
    if (event.key === 's' || event.key === 'S') setShowList((v) => !v);
    if (event.key === 'd' || event.key === 'D') setOpenDrawer((v) => !v);
  };

  useEffect(() => {
    window.addEventListener('keypress', hotkeyHandler);
  }, []);

  const handleImport = (value: string) => {
    const ISFavObj = JSON.parse(value);
    setISFavourites(ISFavObj);
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>
        My Solutions
      </Typography>
      <ControlsBar>
        <ButtonGroup variant="contained">
          <Button variant="contained" onClick={() => setOpenSaveModal(true)}>
            Save
          </Button>
          <Button variant="contained" onClick={() => setOpenLoadModal(true)}>
            Load
          </Button>
        </ButtonGroup>
        <Tooltip title="use (s/S) to toggle between views">
          <Button variant="contained" onClick={() => setShowList((v) => !v)}>
            {showList ? 'Show Report' : 'Show Report'}
          </Button>
        </Tooltip>
        {!showList && (
          <Tooltip title="use (d/D) to open/close details">
            <Button variant="contained" onClick={() => setOpenDrawer((v) => !v)}>
              Details
            </Button>
          </Tooltip>
        )}
      </ControlsBar>
      <CommonModal
        input={false}
        openModal={openSaveModal}
        title="EXPORT JSON"
        text={JSON.stringify(ISFavourites)}
        handleClose={() => setOpenSaveModal(false)}
      />
      <CommonModal
        input={true}
        openModal={openLoadModal}
        title="IMPORT JSON"
        handleClose={() => setOpenLoadModal(false)}
        handleImport={handleImport}
      />
      {showList ? (
        <MySolutionsList solutionsList={listItems} />
      ) : (
        <DiagnosticReportCard
          changeCurrentImage={handleChangeCurrentImage}
          automationTasks={reportItems}
          generalViews={localStorageGeneralViews}
          setGeneralViews={setLocalStorageGeneralViews}
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
