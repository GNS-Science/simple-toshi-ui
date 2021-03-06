import { styled } from '@mui/material/styles';
import buildUrl from 'build-url-ts';
import React, { useEffect, useState } from 'react';
import { RegionalSolutionMfdOption, regionalSolutionMfdOptions } from '../../constants/regionalSolutionMfd';
import { SolutionMfdOption, solutionMfdOptions } from '../../constants/solutionMfd';
import MultiSelect from '../common/MultiSelect';

const PREFIX = 'RegionalMfdView';

const classes = {
  imageContainer: `${PREFIX}-imageContainer`,
  image: `${PREFIX}-image`,
};

const Root = styled('div')(() => ({
  [`& .${classes.imageContainer}`]: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },

  [`& .${classes.image}`]: {
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
  regional: boolean;
  regionalViews: string[];
  setRegionalViews: (views: string[]) => void;
  nonRegionalViews: string[];
  setNonRegionalViews: (views: string[]) => void;
}

const RegionalMfdView: React.FC<RegionalMfdViewProps> = ({
  id,
  regional,
  regionalViews,
  setRegionalViews,
  nonRegionalViews,
  setNonRegionalViews,
}: RegionalMfdViewProps) => {
  const [regionalViewSelections, setRegionalViewSelections] = useState<RegionalSolutionMfdOption[]>([
    regionalSolutionMfdOptions[0],
  ]);
  const [nonRegionalViewSelections, setNonRegionalViewSelections] = useState<SolutionMfdOption[]>([
    solutionMfdOptions[0],
  ]);

  useEffect(() => {
    const filtered = regionalSolutionMfdOptions.filter((option) => {
      return regionalViews.includes(option.displayName);
    });
    setRegionalViewSelections(filtered);
  }, [regionalViews]);

  useEffect(() => {
    const filtered = solutionMfdOptions.filter((option) => {
      return nonRegionalViews.includes(option.displayName);
    });
    setNonRegionalViewSelections(filtered);
  }, [nonRegionalViews]);

  const getRegionalMfdUrl = (id: string, finalPath: string): string => {
    return buildUrl(process.env.REACT_APP_REPORTS_URL, {
      path: `/opensha/DATA/${id}/solution_report/resources/${finalPath}`,
    });
  };

  const regionalSolutionMfdDisplayNames: string[] = [];
  const solutionMfdDisplayNames: string[] = [];

  regionalSolutionMfdOptions.map((option) => {
    regionalSolutionMfdDisplayNames.push(option.displayName);
  });

  solutionMfdOptions.map((option) => {
    solutionMfdDisplayNames.push(option.displayName);
  });

  if (regional) {
    return (
      <Root>
        <MultiSelect
          name="Regional Solution MFD"
          selected={regionalViews}
          options={regionalSolutionMfdDisplayNames}
          setOptions={setRegionalViews}
        />
        <div className={classes.imageContainer}>
          {regionalViewSelections.map((option) => (
            <img
              key={option.path}
              className={classes.image}
              src={getRegionalMfdUrl(id, option.path)}
              alt={option.path}
            />
          ))}
        </div>
      </Root>
    );
  } else
    return (
      <Root>
        <MultiSelect
          name="Solution MFD"
          selected={nonRegionalViews}
          options={solutionMfdDisplayNames}
          setOptions={setNonRegionalViews}
        />
        <div className={classes.imageContainer}>
          {nonRegionalViewSelections.map((option) => (
            <img
              key={option.path}
              className={classes.image}
              src={getRegionalMfdUrl(id, option.path)}
              alt={option.path}
            />
          ))}
        </div>
      </Root>
    );
};

export default RegionalMfdView;
