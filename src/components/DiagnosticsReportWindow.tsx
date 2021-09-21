import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';
import NewWindow from 'rc-new-window';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(0),
  },
  cardContent: {
    paddingTop: 0,
  },
  media: {
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
  const classes = useStyles();
  //const features = { center: false, menubar: false, location: false, height: 60, width: 100 };

  return (
    <NewWindow title={windowTitle} name={windowTitle}>
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
    </NewWindow>
  );
};

export default DiagnosticsReportWindow;
