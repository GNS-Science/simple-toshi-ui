import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Accordion, AccordionDetails, AccordionSummary, Divider, Drawer, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { GeneralTaskDetails } from '../../interfaces/diagnosticReport';
import KeyValueListTable from '../common/KeyValueListTable';
import { sweepsList } from '../../service/generalTask.service';

const useStyles = makeStyles(() => ({
  drawer: {
    width: '25vw',
    padding: 10,
  },
  drawerPaper: {
    width: '25vw',
    padding: 10,
  },
  detailsContainer: {
    paddingTop: 20,
  },
  argumentsContainer: {
    paddingTop: 20,
  },
}));

interface GeneralTaskDetailDrawerProps {
  openDrawer: boolean;
  generalTaskDetails: GeneralTaskDetails;
}
const GeneralTaskDetailDrawer: React.FC<GeneralTaskDetailDrawerProps> = ({
  openDrawer,
  generalTaskDetails,
}: GeneralTaskDetailDrawerProps) => {
  const classes = useStyles();
  const sweepArguments = sweepsList(generalTaskDetails.argument_lists ?? [], generalTaskDetails.swept_arguments);

  return (
    <Drawer anchor={'right'} variant="persistent" classes={{ paper: classes.drawerPaper }} open={openDrawer}>
      <Toolbar />{' '}
      <Typography variant="h5" gutterBottom>
        General Task: {generalTaskDetails.title}
      </Typography>
      <Divider />
      <div className={classes.detailsContainer}>
        <Typography>
          <strong>Id:</strong> {generalTaskDetails.id}
        </Typography>
        <Typography>
          <strong>Model type:</strong> {generalTaskDetails.model_type}
        </Typography>
        <Typography>
          <strong>Created: </strong> {generalTaskDetails.created}
        </Typography>
        {generalTaskDetails.description && (
          <>
            <Typography>
              <strong>Description:</strong>
            </Typography>
            <ReactMarkdown>{generalTaskDetails.description ?? ''}</ReactMarkdown>
          </>
        )}
        {generalTaskDetails.notes && (
          <span>
            <Typography>
              <strong>Notes:</strong>
            </Typography>
            <ReactMarkdown>{generalTaskDetails.notes}</ReactMarkdown>
          </span>
        )}
        <div className={classes.argumentsContainer}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>
                <strong>Swept Arguments</strong>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {generalTaskDetails?.argument_lists && <KeyValueListTable header={null} data={sweepArguments} />}
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>
                <strong>All Arguments</strong>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {generalTaskDetails.argument_lists && (
                <KeyValueListTable header={null} data={generalTaskDetails.argument_lists} />
              )}
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </Drawer>
  );
};

export default GeneralTaskDetailDrawer;
