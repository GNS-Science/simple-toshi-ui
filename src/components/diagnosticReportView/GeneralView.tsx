import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import buildUrl from 'build-url-ts';
import { diagnosticReportViewOptions } from '../../constants/diagnosticReport';
import { SolutionDiagnosticsOption } from '../../interfaces/generaltask';
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

interface GeneralViewProps {
  id: string;
  generalViews: string[];
  setGeneralViews: (selection: string[]) => void;
}

const GeneralView: React.FC<GeneralViewProps> = ({ id, generalViews, setGeneralViews }: GeneralViewProps) => {
  const classes = useStyles();
  const [generalViewSelections, setGeneralViewSelections] = useState<SolutionDiagnosticsOption[]>([
    diagnosticReportViewOptions[0],
  ]);

  useEffect(() => {
    const filtered = diagnosticReportViewOptions.filter((option) => {
      return generalViews.includes(option.displayName);
    });
    setGeneralViewSelections(filtered);
  }, [generalViews]);

  const reportUrl = (path: string, id: string) => {
    return buildUrl(process.env.REACT_APP_REPORTS_URL, {
      path: `/opensha/DATA/${id}/solution_report/resources/${path}`,
    });
  };

  const generalViewDisplayNames: string[] = [];

  diagnosticReportViewOptions.map((option) => {
    generalViewDisplayNames.push(option.displayName);
  });

  return (
    <>
      <MultiSelect
        name="Reports"
        selected={generalViews}
        options={generalViewDisplayNames}
        setOptions={setGeneralViews}
      />
      <div className={classes.imageContainer}>
        {generalViewSelections.map((option) => (
          <img
            key={option.finalPath}
            className={classes.image}
            src={reportUrl(option.finalPath, id)}
            alt={option.finalPath}
          />
        ))}
      </div>
    </>
  );
};

export default GeneralView;