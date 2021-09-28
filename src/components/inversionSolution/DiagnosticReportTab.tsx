import { makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(() => ({
  iframe: {
    width: '100%',
    height: '100vh',
  },
}));

interface DiagnosticReportTabProps {
  id: string;
}

const DiagnosticReportTab: React.FC<DiagnosticReportTabProps> = ({ id }: DiagnosticReportTabProps) => {
  const classes = useStyles();
  const baseUrl = process.env.REACT_APP_REPORTS_URL;
  return (
    <>
      <iframe className={classes.iframe} src={`${baseUrl}/opensha/DATA/${id}/solution_report/`} />
    </>
  );
};

export default DiagnosticReportTab;
