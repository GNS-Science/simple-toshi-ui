import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';

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
    height: 600,
    padding: theme.spacing(0),
  },
}));

interface RuptureSetDiagsProps {
  fileId: string;
  metaAsString: string;
}

const RuptureSetDiags: React.FC<RuptureSetDiagsProps> = ({ fileId, metaAsString }: RuptureSetDiagsProps) => {
  const classes = useStyles();

  const hash = 'subsection-count';

  const reportUrl = buildUrl(reportBaseUrl, {
    path: `/${fileId}/DiagnosticsReport/index.html`,
    hash: hash,
  });

  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          Rupture Set Diagnostics Report {`${fileId}`}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {metaAsString}
        </Typography>
      </CardContent>
      <CardMedia className={classes.media} src={reportUrl} title="DiagnosticsReport" component="iframe" />
    </Card>
  );
};

export default RuptureSetDiags;
