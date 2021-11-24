import { Box } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import React from 'react';

const PREFIX = 'TabPanel';

const classes = {
  tabPanel: `${PREFIX}-tabPanel`,
};

const Root = styled('div')(({ theme }) => ({
  [`&.${classes.tabPanel}`]: {
    width: '80%',
    padding: theme.spacing(0),
  },
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  tab: number;
}

const TabPanel: React.FC<TabPanelProps> = (props: TabPanelProps) => {
  const { children, tab, index } = props;
  return (
    <Root
      className={classes.tabPanel}
      role="tabpanel"
      hidden={tab !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
    >
      {tab === index && <Box p={3}>{children}</Box>}
    </Root>
  );
};

export default TabPanel;
