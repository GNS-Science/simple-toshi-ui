import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';
import NewWindow from 'rc-new-window';

import buildUrl from 'build-url-ts';

const reportBaseUrl = 'http://nzshm22-static-reports.s3-website-ap-southeast-2.amazonaws.com/opensha/DATA';

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

const uri =
  'http://nzshm22-static-reports.s3-website-ap-southeast-2.amazonaws.com/opensha/DATA/SW52ZXJzaW9uU29sdXRpb246NzkxOC41R1FaWWI=/solution_report/index.html#slip-rates';

interface DiagnosticsReportWindowProps {
  url: string;
  windowTitle: string; //the text for hte browwer tab (nake it short!)
  title: string;
  info: string;
}

const DiagnosticsReportWindow: React.FC<DiagnosticsReportWindowProps> = ({
  url,
  windowTitle,
  title,
  info,
}: DiagnosticsReportWindowProps) => {
  const classes = useStyles();
  // const features = { menubar: false, location: false, height: 60, width: 100 };

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

const NewWindowControl: React.FC = () => {
  return (
    <>
      <DiagnosticsReportWindow
        url={uri}
        windowTitle={'short-0'}
        title={'Report Title 0'}
        info={'some specifics here'}
      />
      {/*      <DiagnosticsReportWindow
        url={uri}
        windowTitle={'short-1'}
        title={'Report Title 1'}
        info={'some 1 specifics here'}
      />*/}
    </>
  );
};

export default NewWindowControl;
