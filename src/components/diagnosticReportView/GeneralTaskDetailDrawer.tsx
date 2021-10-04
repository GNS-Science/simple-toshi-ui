import React from 'react';
import { Divider, Drawer, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { GeneralTaskDetails } from '../../interfaces/diagnosticReport';
import ReactMarkdown from 'react-markdown';

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
      </div>
    </Drawer>
  );
};

export default GeneralTaskDetailDrawer;
