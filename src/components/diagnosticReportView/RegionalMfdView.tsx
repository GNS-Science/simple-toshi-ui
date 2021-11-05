import { makeStyles } from '@material-ui/core';
import buildUrl from 'build-url-ts';
import React, { useEffect, useState } from 'react';
import { RegionalSolutionMfdOption, regionalSolutionMfdOptions } from '../../constants/regionalSolutionMfd';
import MultiSelect from '../common/MultiSelect';

const useStyles = makeStyles(() => ({
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
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
  regionalViews: string[];
  setRegionalViews: (views: string[]) => void;
}

const RegionalMfdView: React.FC<RegionalMfdViewProps> = ({
  id,
  regionalViews,
  setRegionalViews,
}: RegionalMfdViewProps) => {
  const classes = useStyles();

  const [regionalViewSelections, setRegionalViewSelections] = useState<RegionalSolutionMfdOption[]>([
    regionalSolutionMfdOptions[0],
  ]);

  useEffect(() => {
    const filtered = regionalSolutionMfdOptions.filter((option) => {
      return regionalViews.includes(option.displayName);
    });
    setRegionalViewSelections(filtered);
  }, [regionalViews]);

  const getRegionalMfdUrl = (id: string, finalPath: string): string => {
    return buildUrl(process.env.REACT_APP_REPORTS_URL, {
      path: `/opensha/DATA/${id}/solution_report/resources/${finalPath}`,
    });
  };

  const regionalSolutionMfdDisplayNames: string[] = [];

  regionalSolutionMfdOptions.map((option) => {
    regionalSolutionMfdDisplayNames.push(option.displayName);
  });

  return (
    <>
      <MultiSelect
        name="Regional Solution MFD"
        selected={regionalViews}
        options={regionalSolutionMfdDisplayNames}
        setOptions={setRegionalViews}
      />
      <div className={classes.imageContainer}>
        {regionalViewSelections.map((option) => (
          <img key={option.path} className={classes.image} src={getRegionalMfdUrl(id, option.path)} alt={option.path} />
        ))}
      </div>
    </>
  );
};

export default RegionalMfdView;
