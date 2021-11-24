import React from 'react';
import { styled } from '@mui/material/styles';
const PREFIX = 'ControlsBar';

const classes = {
  controlsContainer: `${PREFIX}-controlsContainer`,
  control: `${PREFIX}-control`,
};

const Root = styled('div')(() => ({
  [`& .${classes.controlsContainer}`]: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },

  [`&.${classes.control}`]: {
    margin: 10,
  },
}));

interface ControlsBarProps {
  children: React.ReactNode;
}
const ControlsBar: React.FC<ControlsBarProps> = ({ children }: ControlsBarProps) => {
  const childrenWithMargin = React.Children.map(children, (child) => {
    return <Root className={classes.control}>{child}</Root>;
  });
  return <div className={classes.controlsContainer}>{childrenWithMargin}</div>;
};

export default ControlsBar;
