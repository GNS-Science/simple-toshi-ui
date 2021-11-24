import React from 'react';
import { styled } from '@mui/material/styles';
import ReactMarkdown from 'react-markdown';
import { Accordion, AccordionDetails, AccordionSummary, Divider, Drawer, Toolbar, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { GeneralTaskDetails } from '../../interfaces/diagnosticReport';
import KeyValueListTable from '../common/KeyValueListTable';
import { sweepsList } from '../../service/generalTask.service';

const PREFIX = 'GeneralTaskDetailDrawer';

const classes = {
  drawer: `${PREFIX}-drawer`,
  drawerPaper: `${PREFIX}-drawerPaper`,
  detailsContainer: `${PREFIX}-detailsContainer`,
  argumentsContainer: `${PREFIX}-argumentsContainer`,
};

const StyledDrawer = styled(Drawer)(() => ({
  [`& .${classes.drawer}`]: {
    width: '25vw',
    padding: 10,
  },

  [`& .${classes.drawerPaper}`]: {
    width: '25vw',
    padding: 10,
  },

  [`& .${classes.detailsContainer}`]: {
    paddingTop: 20,
  },

  [`& .${classes.argumentsContainer}`]: {
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
  const sweepArguments = sweepsList(generalTaskDetails.argument_lists ?? [], generalTaskDetails.swept_arguments);

  return (
    <StyledDrawer anchor={'right'} variant="persistent" classes={{ paper: classes.drawerPaper }} open={openDrawer}>
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
    </StyledDrawer>
  );
};

export default GeneralTaskDetailDrawer;
