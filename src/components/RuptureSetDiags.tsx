import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';

import buildUrl from 'build-url-ts';

const reportBaseUrl = 'http://nzshm22-static-reports.s3-website-ap-southeast-2.amazonaws.com/opensha/DATA';
//http://nzshm22-rupset-diags-poc.s3-website-ap-southeast-2.amazonaws.com';

const useStyles = makeStyles({
  root: {
    maxWidth: 1000,
  },
  media: {
    height: 600,
  },
});

interface RuptureSetDiagsProps {
  fileId: string;
}

const RuptureSetDiags: React.FC<RuptureSetDiagsProps> = ({ fileId }: RuptureSetDiagsProps) => {
  const classes = useStyles();

  const hash = 'subsection-count';

  const reportUrl = buildUrl(reportBaseUrl, {
    path: `/${fileId}/DiagnosticsReport/index.html`,
    hash: hash,
  });

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          Rupture Set Diagnostics Report {`${fileId}`}
        </Typography>
      </CardContent>
      <CardMedia className={classes.media} src={reportUrl} title="DiagnosticsReport" component="iframe" />
      {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions> */}
    </Card>
  );
};

export default RuptureSetDiags;
