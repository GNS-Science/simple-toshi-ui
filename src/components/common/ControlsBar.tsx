import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  controlsContainer: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  control: {
    margin: 10,
  },
}));
interface ControlsBarProps {
  children: React.ReactNode;
}
const ControlsBar: React.FC<ControlsBarProps> = ({ children }: ControlsBarProps) => {
  const classes = useStyles();
  const childrenWithMargin = React.Children.map(children, (child) => {
    return <div className={classes.control}>{child}</div>;
  });
  return <div className={classes.controlsContainer}>{childrenWithMargin}</div>;
};

export default ControlsBar;
