import { makeStyles } from '@material-ui/core';
import buildUrl from 'build-url-ts';
import React from 'react';
import DiagnosticReportControls from './DiagnosticReportControls';

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

  const reportUrl = (path: string, id: string) => {
    return buildUrl(process.env.REACT_APP_REPORTS_URL, {
      path: `/opensha/DATA/${id}/solution_report/resources/${path}`,
    });
  };

  return (
    <>
      <DiagnosticReportControls viewOptions={generalViews} setViewOption={setGeneralViews} />
      <div className={classes.imageContainer}>
        {generalViews.map((path) => (
          <img key={path} className={classes.image} src={reportUrl(path, id)} alt={path} />
        ))}
      </div>
    </>
  );
};

export default GeneralView;
