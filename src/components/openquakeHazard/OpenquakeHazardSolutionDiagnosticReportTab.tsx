import { styled } from '@mui/material/styles';
import React from 'react';

const PREFIX = 'OpenquakeHazardSolutionDiagnosticReportTab';

const classes = {
  iframe: `${PREFIX}-iframe`,
};

const Root = styled('div')(() => ({
  [`& .${classes.iframe}`]: {
    width: '100%',
    height: '100vh',
  },
}));

interface OpenquakeHazardSolutionDiagnosticReportTabProps {
  id: string;
}

const OpenquakeHazardSolutionDiagnosticReportTab: React.FC<OpenquakeHazardSolutionDiagnosticReportTabProps> = ({
  id,
}: OpenquakeHazardSolutionDiagnosticReportTabProps) => {
  const baseUrl = process.env.REACT_APP_REPORTS_URL;
  return (
    <Root>
      <iframe className={classes.iframe} src={`${baseUrl}/openquake/DATA/${id}/hazard_report/index.html`} />
    </Root>
  );
};

export default OpenquakeHazardSolutionDiagnosticReportTab;
