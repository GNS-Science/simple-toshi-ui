import React from 'react';
import { Drawer, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  drawer: {
    width: '20vw',
  },
  drawerPaper: {
    width: '20vw',
  },
}));

interface GeneralTaskDetailDrawerProps {
  openDrawer: boolean;
}
const GeneralTaskDetailDrawer: React.FC<GeneralTaskDetailDrawerProps> = ({
  openDrawer,
}: GeneralTaskDetailDrawerProps) => {
  const classes = useStyles();
  return (
    <Drawer anchor={'right'} variant="persistent" classes={{ paper: classes.drawerPaper }} open={openDrawer}>
      <Toolbar />
      <p>GeneralTask Details</p>
    </Drawer>
  );
};

export default GeneralTaskDetailDrawer;
