import { makeStyles } from '@material-ui/core';
import buildUrl from 'build-url-ts';
import React from 'react';
import { RegionalSolutionMfdOption } from '../../constants/regionalSolutionMfd';

const useStyles = makeStyles(() => ({
  image: {
    padding: '5px',
    maxHeight: '80vh',
    width: '25%',
    objectFit: 'contain',
    flexGrow: 3,
    flexShrink: 4,
  },
}));

interface RegionalMfdViewProps {
  id: string;
  viewOptions: RegionalSolutionMfdOption[];
}

const RegionalMfdView: React.FC<RegionalMfdViewProps> = ({ id, viewOptions }: RegionalMfdViewProps) => {
  const classes = useStyles();

  const getRegionalMfdUrl = (id: string, finalPath: string): string => {
    return buildUrl(process.env.REACT_APP_REPORTS_URL, {
      path: `/opensha/DATA/${id}/solution_report/resources/${finalPath}`,
    });
  };

  return (
    <>
      <p>Regional Mfd View</p>
      {viewOptions.map((option) => (
        <img key={option.path} className={classes.image} src={getRegionalMfdUrl(id, option.path)} alt={option.path} />
      ))}
    </>
  );
};

export default RegionalMfdView;
