import makeStyles from '@material-ui/styles/makeStyles';
import { styled } from '@mui/material/styles';
import React from 'react';

const PREFIX = 'DiagnosticReportTab';

const classes = {
  iframe: `${PREFIX}-iframe`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(() => ({
  [`& .${classes.iframe}`]: {
    width: '100%',
    height: '100vh',
  },
}));

interface DiagnosticReportTabProps {
  id: string;
}

const DiagnosticReportTab: React.FC<DiagnosticReportTabProps> = ({ id }: DiagnosticReportTabProps) => {
  const baseUrl = process.env.REACT_APP_REPORTS_URL;
  return (
    <Root>
      <iframe className={classes.iframe} src={`${baseUrl}/opensha/DATA/${id}/solution_report/`} />
    </Root>
  );
};

export default DiagnosticReportTab;
