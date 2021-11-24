import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Typography } from '@mui/material';
import NewWindow from 'rc-new-window';

const PREFIX = 'DiagnosticsReportWindow';

const classes = {
  root: `${PREFIX}-root`,
  cardContent: `${PREFIX}-cardContent`,
  media: `${PREFIX}-media`,
};

const StyledNewWindow = styled(NewWindow)(({ theme }) => ({
  [`& .${classes.root}`]: {
    padding: theme.spacing(0),
  },

  [`& .${classes.cardContent}`]: {
    paddingTop: 0,
  },

  [`& .${classes.media}`]: {
    height: '90%',
    padding: theme.spacing(0),
  },
}));

interface DiagnosticsReportWindowProps {
  url: string; // the report URL
  windowTitle: string; //the text for the browser tab (make it short!)
  title: string; // the full report title
  info: string; // the metadata, what's unique in this report (typically the swept value settings)
}

const DiagnosticsReportWindow: React.FC<DiagnosticsReportWindowProps> = ({
  url,
  windowTitle,
  title,
  info,
}: DiagnosticsReportWindowProps) => {
  //const features = { center: false, menubar: false, location: false, height: 60, width: 100 };

  return (
    <StyledNewWindow title={windowTitle} name={windowTitle}>
      <Card className={classes.root}>
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h5">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {info}
          </Typography>
        </CardContent>
        <CardMedia className={classes.media} src={url} title="DiagnosticsReport" component="iframe" />
      </Card>
    </StyledNewWindow>
  );
};

export default DiagnosticsReportWindow;
